"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldAlert, BarChart3, Zap, FileText, Filter, History } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function Features() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { margin: "0px" });
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const features = [
    {
      icon: <ShieldAlert className="w-10 h-10" />,
      title: t('feat1Title'),
      desc: t('feat1Desc'),
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: t('feat2Title'),
      desc: t('feat2Desc'),
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: t('feat3Title'),
      desc: t('feat3Desc'),
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: t('feat4Title'),
      desc: t('feat4Desc'),
    },
    {
      icon: <Filter className="w-10 h-10" />,
      title: t('feat5Title'),
      desc: t('feat5Desc'),
    },
    {
      icon: <History className="w-10 h-10" />,
      title: t('feat6Title'),
      desc: t('feat6Desc'),
    }
  ];

  const duplicatedFeatures = [...features, ...features];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    
    // Pixels to move per millisecond (adjust speed here)
    const speed = 0.05;

    const scroll = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isPaused && !isDragging && isInView) {
        container.scrollLeft += speed * deltaTime;
        
        // The exact half of the scrollable width since we duplicated the array exactly once
        const halfWidth = container.scrollWidth / 2;
        
        // Snap back to create infinite illusion
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging, isInView]);

  return (
    <section id="features" className="w-full max-w-7xl mx-auto py-8 md:py-20 px-6 md:px-12 relative z-10">
      <div className="mb-8 md:mb-12 text-left">
        <h2 className="text-fluid-h2 font-black text-zinc-900 mb-6 tracking-tight leading-tight">{t('featuresTitle')}</h2>
        <p className="text-fluid-subtitle text-zinc-600 font-light leading-relaxed">{t('featuresDesc')}</p>
      </div>

      {/* Marquee Container with fade edges */}
      <div 
        className="relative -mx-6 px-6 md:-mx-12 md:px-12 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div 
          ref={scrollRef}
          className={`flex flex-row overflow-x-auto gap-6 py-4 [&::-webkit-scrollbar]:hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={(e) => {
            setIsDragging(true);
            if (!scrollRef.current) return;
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
          }}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (!isDragging || !scrollRef.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            scrollRef.current.scrollLeft = scrollLeft - walk;
          }}
        >
          {duplicatedFeatures.map((feat, idx) => (
            <div 
              key={idx} 
              className="w-[280px] sm:w-[320px] md:w-[380px] group relative flex flex-col items-start gap-0 p-6 md:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 transition-all overflow-hidden hover:border-emerald-500/50 text-left shrink-0 select-none"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                
              <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center mb-6 bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300 [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8 [&>svg]:text-emerald-500 relative z-10 pointer-events-none">
                {feat.icon}
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col pointer-events-none">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-zinc-100 tracking-tight">{feat.title}</h3>
                <p className="font-light text-zinc-400 text-xs md:text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
