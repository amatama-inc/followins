"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldCheck, KeyRound, Code, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export default function PrivacySection() {
  const { t } = useLanguage();
  // By default open the first item (index 0)
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;

    const interval = setInterval(() => {
      setOpenIndex((prev) => (prev + 1) % 3); // cycles 0, 1, 2
    }, 6000); // 6 seconds interval

    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView]);

  const toggleOpen = (index: number) => {
    setIsAutoPlaying(false); // Stop autoplay when user manually interacts
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const points = [
    {
      icon: <Code className="w-6 h-6 md:w-7 md:h-7" />,
      title: t('priv1Title'),
      desc: t('priv1Desc')
    },
    {
      icon: <KeyRound className="w-6 h-6 md:w-7 md:h-7" />,
      title: t('priv2Title'),
      desc: t('priv2Desc')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />,
      title: t('priv3Title'),
      desc: t('priv3Desc')
    }
  ];

  const terminalContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const terminalItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section ref={sectionRef} className="w-full py-8 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-[150px]">
        <div className="flex flex-col lg:flex-row items-stretch bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm relative">

          <div className="w-full lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-zinc-200 relative z-10">

            <h2 className="text-fluid-h2 font-black mb-6 tracking-tight text-zinc-900 leading-tight">
              {t('privacyTitle')}
            </h2>
            <p className="text-fluid-subtitle text-zinc-600 font-light mb-12 leading-relaxed">
              {t('privacyDesc')}
            </p>
            
            <div className="space-y-4">
              {points.map((point, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index} 
                    className="flex flex-col border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 rounded-2xl transition-colors overflow-hidden"
                  >
                    <button 
                      onClick={() => toggleOpen(index)}
                      className="w-full flex gap-4 md:gap-6 items-center p-4 md:p-5 text-left focus:outline-none"
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-700 ease-in-out ${isOpen ? 'bg-zinc-900 border-transparent text-white shadow-md scale-105' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                        {point.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-fluid-h4 font-bold transition-colors duration-700 ${isOpen ? 'text-zinc-900' : 'text-zinc-700'}`}>
                          {point.title as string}
                        </h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out shrink-0 ${isOpen ? 'rotate-180 bg-zinc-100 text-zinc-900' : 'bg-white border border-zinc-200 text-zinc-400'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                        >
                          <div className="px-4 md:px-5 pb-4 md:pb-5 pt-1 pl-[76px] md:pl-[96px]">
                            <motion.p 
                              initial={{ y: -15, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -15, opacity: 0 }}
                              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                              className="text-zinc-600 font-light text-sm md:text-base leading-relaxed"
                            >
                              {point.desc as string}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center bg-zinc-900 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="w-full max-w-lg bg-zinc-950 rounded-xl shadow-2xl overflow-hidden font-mono border border-zinc-800 relative z-10">
              
              <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 relative z-20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="mx-auto text-zinc-500 text-xs font-semibold tracking-wider font-sans select-none">
                  engine.sh
                </div>
              </div>

              <div className="p-6 md:p-8 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-950/0 to-transparent pointer-events-none"></div>
                <motion.div 
                  variants={terminalContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ margin: "-100px" }}
                  className="text-sm md:text-base text-zinc-300 font-medium leading-loose space-y-2 relative z-10"
                >
                  <motion.div variants={terminalItem} className="flex items-center gap-2"><span className="text-emerald-500">{`>`}</span> Initializing extraction...</motion.div>
                  <motion.div variants={terminalItem} className="flex items-center gap-2 text-zinc-400"><span className="text-emerald-500">{`>`}</span> Reading followers.json [LOCAL]</motion.div>
                  <motion.div variants={terminalItem} className="flex items-center gap-2 text-zinc-400"><span className="text-emerald-500">{`>`}</span> Reading following.json [LOCAL]</motion.div>
                  <motion.div variants={terminalItem} className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 mt-2 mb-2"><span className="text-emerald-500">{`>`}</span> Network isolated.</motion.div>
                  <motion.div variants={terminalItem} className="flex items-center gap-2 mt-2"><span className="text-emerald-500">{`>`}</span> Cross-referencing sets...</motion.div>
                  <motion.div variants={terminalItem} className="flex items-center gap-2 text-zinc-100 border-b border-zinc-800 pb-1 inline-flex"><span className="text-emerald-500">{`>`}</span> Found 142 Unfollowers.</motion.div>
                  <motion.div variants={terminalItem} className="flex items-center gap-2 mt-4"><span className="text-emerald-500">{`>`}</span> Rendering UI.</motion.div>
                  <motion.div variants={terminalItem} className="flex items-center gap-2 text-zinc-400"><span className="text-emerald-500">{`>`}</span> Preparing PDF export engine [OFFLINE]...</motion.div>
                  <motion.div variants={terminalItem} className="mt-10 border-t border-dashed border-zinc-800 pt-6 opacity-70 text-xs md:text-sm space-y-1 text-zinc-500">
                    <div>{`// ALL OPERATIONS PERFORMED IN-BROWSER`}</div>
                    <div>{`// DATA IS DESTROYED UPON EXIT`}</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
