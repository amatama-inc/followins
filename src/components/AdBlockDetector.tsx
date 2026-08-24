"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdBlockDetector() {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // 1. Buat elemen "Umpan" (Bait) dengan class name yang biasanya selalu diincar AdBlocker
    const bait = document.createElement('div');
    bait.className = 'ad-banner adsbox doubleclick ad-placement sponsor';
    bait.style.height = '1px';
    bait.style.width = '1px';
    bait.style.position = 'absolute';
    bait.style.left = '-10000px';
    bait.style.top = '-10000px';
    document.body.appendChild(bait);

    // 2. Periksa apakah umpan tersebut disembunyikan oleh AdBlock setelah 500ms
    const timer = setTimeout(() => {
      const isBlocked = 
        bait.offsetHeight === 0 || 
        bait.clientHeight === 0 || 
        window.getComputedStyle(bait).display === 'none';
      
      if (isBlocked) {
        setIsAdBlockEnabled(true);
      }
      bait.remove();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(bait)) bait.remove();
    };
  }, []);

  if (!isAdBlockEnabled || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
        >
          {/* Aksen Estetis */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"></div>

          <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-4">
            {language === 'id' ? 'AdBlocker Terdeteksi' : 'AdBlocker Detected'}
          </h2>
          
          <p className="text-zinc-400 mb-6 leading-relaxed">
            {language === 'id' 
              ? 'Followins adalah aplikasi 100% gratis. Kami sangat bergantung pada iklan untuk membayar biaya server, menjaga agar aplikasi tetap cepat, dan melindungi privasi Anda. Mohon matikan AdBlocker Anda, atau pertimbangkan untuk berdonasi kopi ☕ untuk mendukung kami.' 
              : 'Followins is a 100% free application. We rely heavily on ads to pay for server costs, keep the app fast, and protect your privacy. Please disable your AdBlocker, or consider buying us a coffee ☕ to support us.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => setIsDismissed(true)}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
            >
              {language === 'id' ? 'Saya Mengerti (Tutup)' : 'I Understand (Close)'}
            </button>
            
            <a 
              href="https://trakteer.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsDismissed(true)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>☕</span>
              {language === 'id' ? 'Trakteer Kopi' : 'Buy me a Coffee'}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
