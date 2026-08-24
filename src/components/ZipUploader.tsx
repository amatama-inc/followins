"use client";

import { useState, useCallback, useEffect } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { useLanguage } from '@/i18n/LanguageContext';
import { Turnstile } from '@marsidev/react-turnstile';
import { verifyTurnstileToken } from '@/app/actions/verifyTurnstile';

interface ZipUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function ZipUploader({ onFileSelect }: ZipUploaderProps) {
  const { t, language } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isVerifyingTurnstile, setIsVerifyingTurnstile] = useState(false);

  const checkLimit = async (): Promise<boolean> => {
    try {
      setIsChecking(true);
      const fp = await fpPromise.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      
      // Obfuscate the storage key so it's not obvious
      const storageKey = btoa(`f_limit_${visitorId}`);
      const stored = localStorage.getItem(storageKey);
      
      const currentMonth = new Date().getMonth();
      let data = { count: 0, month: currentMonth };
      
      if (stored) {
        try {
          // simple XOR decryption just to hide it from casual inspection
          const decoded = atob(stored);
          let unxored = "";
          for(let i=0; i<decoded.length; i++) unxored += String.fromCharCode(decoded.charCodeAt(i) ^ 42);
          const parsed = JSON.parse(unxored);
          
          if (parsed.month === currentMonth) {
            data = parsed;
          }
        } catch(e) {}
      }
      
      if (data.count >= 20) {
        setIsChecking(false);
        alert(
          language === 'en'
            ? "You have reached the limit of 20 uploads per month for this device."
            : "Anda telah mencapai batas maksimal 20 kali upload per bulan untuk perangkat ini."
        );
        return false;
      }
      
      data.count += 1;
      // Re-encode
      const jsonStr = JSON.stringify(data);
      let xored = "";
      for(let i=0; i<jsonStr.length; i++) xored += String.fromCharCode(jsonStr.charCodeAt(i) ^ 42);
      localStorage.setItem(storageKey, btoa(xored));
      
      setIsChecking(false);
      return true;
    } catch(e) {
      console.error(e);
      setIsChecking(false);
      return true; // Fail open if fingerprint fails
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!turnstileToken) {
      alert(language === 'en' ? "Please complete the CAPTCHA first." : "Harap selesaikan CAPTCHA terlebih dahulu.");
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert(language === 'en' ? "File is too large. Maximum size is 100MB." : "Ukuran file terlalu besar. Maksimal 100MB.");
        return;
      }
      if (file.name.endsWith('.zip')) {
        setIsVerifyingTurnstile(true);
        const turnstileResult = await verifyTurnstileToken(turnstileToken);
        setIsVerifyingTurnstile(false);
        
        if (!turnstileResult.success) {
          alert(language === 'en' ? "CAPTCHA verification failed. Please refresh the page." : "Verifikasi CAPTCHA gagal. Silakan muat ulang halaman.");
          return;
        }

        const allowed = await checkLimit();
        if (allowed) {
          onFileSelect(file);
        }
      } else {
        alert(t('uploadError'));
      }
    }
  }, [onFileSelect, turnstileToken, language, t]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert(language === 'en' ? "Please complete the CAPTCHA first." : "Harap selesaikan CAPTCHA terlebih dahulu.");
      e.target.value = '';
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert(language === 'en' ? "File is too large. Maximum size is 100MB." : "Ukuran file terlalu besar. Maksimal 100MB.");
        e.target.value = '';
        return;
      }
      if (file.name.endsWith('.zip')) {
        setIsVerifyingTurnstile(true);
        const turnstileResult = await verifyTurnstileToken(turnstileToken);
        setIsVerifyingTurnstile(false);

        if (!turnstileResult.success) {
          alert(language === 'en' ? "CAPTCHA verification failed. Please refresh the page." : "Verifikasi CAPTCHA gagal. Silakan muat ulang halaman.");
          e.target.value = '';
          return;
        }

        const allowed = await checkLimit();
        if (allowed) {
          onFileSelect(file);
        }
        // Reset input so the same file can be selected again
        e.target.value = '';
      } else {
        alert(t('uploadError'));
      }
    }
  };

  return (
    <div className={`relative w-full max-w-xl mx-auto rounded-xl border text-center transition-all duration-300 overflow-hidden font-mono bg-zinc-950 shadow-2xl ${isDragging ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-zinc-800 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]'}`}>
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
        <div className="mx-auto text-emerald-500/80 text-xs font-semibold tracking-wider font-sans select-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          uploader.sh
        </div>
      </div>

      <div
        className="p-6 md:p-8 relative"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-zinc-950/0 to-transparent pointer-events-none"></div>

        <input
          type="file"
          accept=".zip"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center gap-6 relative z-20 pointer-events-none">
          <div className={`p-4 rounded-xl transition-all duration-300 border ${isDragging ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 scale-110' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500/80'}`}>
            {isChecking ? (
              <Loader2 size={32} strokeWidth={1.5} className="animate-spin text-emerald-500" />
            ) : (
              <UploadCloud size={32} strokeWidth={1.5} />
            )}
          </div>
          <div>
            <p className="text-fluid-widget-title font-bold text-zinc-200 tracking-tight mb-3 leading-snug">
              {isChecking || isVerifyingTurnstile ? (language === 'en' ? 'Checking security limits...' : 'Mengecek keamanan...') : (
                <>
                  <span className="md:hidden">{language === 'en' ? 'Tap to select your Instagram .zip file' : 'Ketuk untuk pilih file .zip Instagram'}</span>
                  <span className="hidden md:inline">{t('uploadPrompt')}</span>
                </>
              )}
            </p>
            <p className="text-zinc-500 font-light max-w-md mx-auto leading-relaxed text-fluid-sm">
              {isChecking || isVerifyingTurnstile ? '' : t('uploadDesc')}
            </p>
          </div>
          
          {/* Turnstile Widget - Harus pointer-events-auto agar bisa diklik jika ada interaksi */}
          <div className={`mt-2 flex justify-center pointer-events-auto ${turnstileToken ? 'hidden' : ''}`} onClick={(e) => e.stopPropagation()}>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={(token) => setTurnstileToken(token)}
              options={{ theme: 'dark' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
