"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface AccountHealthRatioProps {
  followers: number;
  following: number;
}

export default function AccountHealthRatio({ followers, following }: AccountHealthRatioProps) {
  const { t } = useLanguage();

  const ratio = following === 0 ? followers : (followers / following);
  const isHealthy = ratio >= 1.0;
  
  // Calculate percentage for gauge (max 2.0 ratio = 100%)
  const percentage = Math.min(Math.max((ratio / 2) * 100, 5), 100);

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 relative z-10">
        <div className={`p-2 lg:p-2.5 rounded-lg ${isHealthy ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-fluid-widget-title text-zinc-900 tracking-tight">{t('healthTitle')}</h3>
          <p className="text-fluid-widget-desc text-zinc-500">{t('healthDesc')}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-4">
        {/* Simple half-circle gauge */}
        <div className="relative w-40 h-20 lg:w-48 lg:h-24 overflow-hidden mb-2 lg:mb-4 scale-90 lg:scale-100 origin-bottom transform-gpu">
          <div className="absolute top-0 left-0 w-40 h-40 lg:w-48 lg:h-48 rounded-full border-[12px] lg:border-[16px] border-zinc-100 box-border"></div>
          <motion.div 
            initial={{ rotate: -180 }}
            whileInView={{ rotate: -180 + (percentage * 1.8) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`absolute top-0 left-0 w-40 h-40 lg:w-48 lg:h-48 rounded-full border-[12px] lg:border-[16px] border-b-transparent border-l-transparent box-border ${isHealthy ? 'border-emerald-500' : 'border-rose-400'}`}
            style={{ transformOrigin: 'center center' }}
          ></motion.div>
          
          <div className="absolute bottom-0 left-0 w-full flex justify-center items-end pb-2">
            <div className="text-center">
              <div className="text-3xl font-black text-zinc-900 tracking-tighter">
                {ratio.toFixed(2)}
              </div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Ratio
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-6 mt-2 lg:mt-4 w-full px-2 lg:px-4 text-[11px] lg:text-sm font-medium">
          <div className="flex flex-col items-center flex-1">
            <span className="text-zinc-500 text-xs mb-1">Followers</span>
            <span className="text-zinc-800">{followers.toLocaleString()}</span>
          </div>
          <div className="h-8 w-px bg-zinc-200"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-zinc-500 text-xs mb-1">Following</span>
            <span className="text-zinc-800">{following.toLocaleString()}</span>
          </div>
        </div>
        
        <div className={`mt-4 lg:mt-6 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-medium flex items-center gap-1.5 ${isHealthy ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {isHealthy ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{isHealthy ? t('healthGood') : t('healthBad')}</span>
        </div>
      </div>
    </div>
  );
}
