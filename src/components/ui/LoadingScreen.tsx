"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '@/i18n/LanguageContext';
import DummyAd from '../shared/DummyAd';

interface LoadingScreenProps {
  isReady?: boolean;
  onContinue?: () => void;
}

export default function LoadingScreen({ isReady = false, onContinue }: LoadingScreenProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    t('loadingMsg0'),
    t('loadingMsg1'),
    t('loadingMsg2'),
    t('loadingMsg3'),
    t('loadingMsg4'),
    t('loadingMsg5'),
    t('loadingMsg6'),
    t('loadingMsg7'),
    t('loadingMsg8'),
    t('loadingMsg9'),
    t('loadingMsg10'),
    t('loadingMsg11'),
    t('loadingMsg12'),
    t('loadingMsg13'),
    t('loadingMsg14'),
    t('loadingMsg15'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6 lg:gap-10 items-center xl:items-start justify-center">
      
      {/* Kiri: Kolom Iklan Vertikal (Desktop) - Dikurangi jadi 2 unit agar tidak lag */}
      <div className="hidden xl:flex flex-col gap-6 w-[300px] shrink-0 sticky top-24">
        <DummyAd variant="sidebar" className="!mt-0 h-[500px]" />
        <DummyAd variant="interstitial" className="!mt-0" />
      </div>

      {/* Tengah: Area Terminal Loading */}
      <div className="flex-1 w-full max-w-2xl flex flex-col gap-6">
        
        {/* Iklan Atas Terminal (1 Banner Saja) */}
        <div className="w-full flex justify-center mb-2">
          <DummyAd variant="in-feed" className="!my-0 max-w-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full bg-zinc-950 rounded-xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base border border-zinc-200/20"
        >
          <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="mx-auto text-zinc-400 text-xs font-semibold tracking-wider font-sans">
              {t('terminalTitle')} - Terminal
            </div>
          </div>
          <div className="p-6 h-72 overflow-hidden flex flex-col justify-end bg-zinc-950/90 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/0 to-transparent pointer-events-none"></div>
            
            {messages.slice(0, currentIndex + 1).map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-400 mb-3 flex items-start gap-3 leading-tight z-10"
              >
                <span className="text-zinc-500 mt-0.5 select-none">$</span> 
                <span>{msg}</span>
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2.5 h-5 bg-emerald-400 mt-1 ml-6 z-10"
            ></motion.div>
          </div>
        </motion.div>

        {/* Action Area (Outside Terminal) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <button
            onClick={onContinue}
            disabled={!isReady}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-sans font-medium transition-all ${
              isReady 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg cursor-pointer' 
                : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
            }`}
          >
            {t('continueBtn')}
          </button>
        </motion.div>
        
        {/* Kumpulan Iklan Bawah Terminal (Dioptimalkan agar tidak membunuh CPU HP) */}
        <div className="w-full flex flex-col gap-4 mt-2 items-center pb-8">
           <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
             <DummyAd variant="interstitial" className="!mt-0" />
             <DummyAd variant="interstitial" className="!mt-0" />
           </div>
           <DummyAd variant="in-feed" className="!my-0 max-w-full" />
        </div>

      </div>

      {/* Kanan: Kolom Iklan Vertikal (Desktop) - Dikurangi jadi 2 unit */}
      <div className="hidden xl:flex flex-col gap-6 w-[300px] shrink-0 sticky top-24">
        <DummyAd variant="sidebar" className="!mt-0 h-[500px]" />
        <DummyAd variant="interstitial" className="!mt-0" />
      </div>

    </div>
  );
}
