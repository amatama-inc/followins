"use client";

import { X, ShieldCheck, QrCode, Check, Star, Zap, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (tier: 'premium' | 'premium+') => void;
}

export default function PaywallModal({ isOpen, onClose, onSuccess }: PaywallModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'premium' | 'premium+'>('premium');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-50 rounded-3xl shadow-2xl border border-zinc-200 animate-in fade-in zoom-in duration-200 hide-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 z-10 bg-white/80 backdrop-blur-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-full transition shadow-sm border border-zinc-200"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-10 flex flex-col items-center">
          
          <div className="text-center mb-8 md:mb-10">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5">
              <Lock className="w-8 h-8 text-zinc-900" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight mb-3">Buka Semua Data Instagram-mu</h2>
            <p className="text-sm md:text-base text-zinc-600 max-w-sm mx-auto font-light">Pilih paket di bawah untuk membuka semua akun yang disembunyikan dan dapatkan akses penuh.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            
            {/* Tier 1: Premium */}
            <div 
              onClick={() => setSelectedTier('premium')}
              className={`relative flex flex-col bg-white rounded-2xl md:rounded-3xl border-2 transition-all cursor-pointer overflow-hidden ${
                selectedTier === 'premium' 
                ? 'border-zinc-900 shadow-xl scale-[1.02] md:scale-105 z-10' 
                : 'border-zinc-200 hover:border-zinc-300 opacity-90'
              }`}
            >
              <div className="p-6 md:p-8 flex-1">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Premium</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-zinc-900">Rp 25k</span>
                  <span className="text-sm font-medium text-zinc-500">/ akun</span>
                </div>
                
                <p className="text-sm text-zinc-600 mb-6">Bayar sekali. Cocok untuk penggunaan pribadi pada 1 akun.</p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Buka Semua Akun yang Disembunyikan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Ekspor Laporan ke PDF</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    </span>
                    <span className="text-sm text-zinc-500">Masih Terdapat Iklan</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <span className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                    </span>
                    <span className="text-sm text-zinc-500">Terkunci di 1 Username & 1 Perangkat</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 md:p-8 pt-0 mt-auto">
                {selectedTier === 'premium' ? (
                  <button 
                    onClick={() => onSuccess('premium')}
                    className="w-full py-4 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <QrCode size={18} />
                    Simulasikan Bayar Rp 25k
                  </button>
                ) : (
                  <button className="w-full py-3 bg-zinc-100 text-zinc-700 font-medium rounded-xl hover:bg-zinc-200 transition-colors">Pilih Premium</button>
                )}
              </div>
            </div>

            {/* Tier 2: Premium+ */}
            <div 
              onClick={() => setSelectedTier('premium+')}
              className={`relative flex flex-col bg-white rounded-2xl md:rounded-3xl border-2 transition-all cursor-pointer overflow-hidden ${
                selectedTier === 'premium+' 
                ? 'border-teal-600 shadow-2xl shadow-teal-500/20 scale-[1.02] md:scale-105 z-10' 
                : 'border-zinc-200 hover:border-teal-300 opacity-90'
              }`}
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-teal-600"></div>
              
              <div className="absolute top-5 right-5 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-teal-100">
                <Star size={12} className="fill-teal-600" /> PALING UNTUNG
              </div>

              <div className="p-6 md:p-8 flex-1">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
                  Premium<span className="text-teal-600">+</span> <span className="text-lg font-medium text-zinc-400 ml-1">(Pro)</span>
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-zinc-900">Rp 50k</span>
                  <span className="text-sm font-medium text-zinc-500">/ tahun</span>
                </div>
                
                <p className="text-sm text-zinc-600 mb-6">Lisensi universal. Solusi hemat untuk kreator atau multi-akun.</p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700 font-medium">Buka Semua Akun yang Disembunyikan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-900 font-bold">Bebas Pakai di Banyak Akun & Perangkat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-teal-600 shrink-0 mt-0.5 fill-teal-600" />
                    <span className="text-sm text-zinc-900 font-bold">100% Bersih Tanpa Iklan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700 font-medium">Ekspor Laporan PDF Premium</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 md:p-8 pt-0 mt-auto">
                {selectedTier === 'premium+' ? (
                  <button 
                    onClick={() => onSuccess('premium+')}
                    className="w-full py-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all shadow-md shadow-teal-600/30 flex items-center justify-center gap-2"
                  >
                    <QrCode size={18} />
                    Simulasikan Bayar Rp 50k
                  </button>
                ) : (
                  <button className="w-full py-3 bg-teal-50 text-teal-700 font-medium rounded-xl hover:bg-teal-100 transition-colors">Pilih Premium+</button>
                )}
              </div>
            </div>

          </div>

          <p className="text-[11px] text-zinc-400 mt-8 text-center max-w-lg">
            *Fitur ini murni simulasi (Tahap 4). Sistem tidak akan memproses pembayaran nyata. Pembayaran sebenarnya akan menggunakan QRIS dinamis di versi final.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

