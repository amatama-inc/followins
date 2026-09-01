"use client";

import { useLanguage } from '@/i18n/LanguageContext';

interface MutualStatsProps {
  data: { youFirst: number, themFirst: number, sameDay: number };
}

export default function MutualStats({ data }: MutualStatsProps) {
  const { t, formatCompactNumber } = useLanguage();
  if (!data) return null;

  const total = data.youFirst + data.themFirst + data.sameDay;
  if (total === 0) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-sm relative overflow-hidden">
      
      <div className="relative z-10 mb-4 pb-4 lg:mb-8 lg:pb-6 border-b border-zinc-200">
        <h3 className="text-fluid-widget-title font-bold text-zinc-900 tracking-tight mb-1 lg:mb-2">{t('mutualStatsTitle')}</h3>
        <p className="text-fluid-widget-desc text-zinc-600 font-light max-w-2xl">
          {t('mutualStatsDesc1')} <span className="text-zinc-900 font-bold font-mono px-2 py-0.5 bg-zinc-100 rounded border border-zinc-200 mx-1">{formatCompactNumber(total)}</span> {t('mutualStatsDesc2')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 relative z-10 pt-2 lg:pt-4 pb-2">
        {/* You First */}
        <div className="flex flex-row lg:flex-col items-center lg:items-start text-left group w-full gap-4 lg:gap-0">
          <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-black font-mono tracking-tight text-teal-600 lg:mb-2 leading-tight whitespace-nowrap group-hover:text-teal-500 transition-colors w-20 lg:w-full shrink-0 text-center lg:text-left" title={data.youFirst.toString()}>
            {formatCompactNumber(data.youFirst)}
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-xs lg:text-sm font-bold uppercase tracking-wider lg:tracking-widest text-zinc-900 font-mono mb-0.5 lg:mb-2">{t('youFirst')}</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-light leading-tight md:leading-relaxed">{t('youFirstDesc')}</div>
          </div>
        </div>
        
        {/* Same Day */}
        <div className="flex flex-row lg:flex-col items-center lg:items-start text-left border-t lg:border-t-0 lg:border-l border-zinc-200 pt-3 lg:pt-0 lg:pl-6 group w-full gap-4 lg:gap-0">
          <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-black font-mono tracking-tight text-emerald-500 lg:mb-2 leading-tight whitespace-nowrap group-hover:text-emerald-400 transition-colors w-20 lg:w-full shrink-0 text-center lg:text-left" title={data.sameDay.toString()}>
            {formatCompactNumber(data.sameDay)}
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-xs lg:text-sm font-bold uppercase tracking-wider lg:tracking-widest text-zinc-900 font-mono mb-0.5 lg:mb-2">{t('sameDay')}</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-light leading-tight md:leading-relaxed">{t('sameDayDesc')}</div>
          </div>
        </div>

        {/* Them First */}
        <div className="flex flex-row lg:flex-col items-center lg:items-start text-left border-t lg:border-t-0 lg:border-l border-zinc-200 pt-3 lg:pt-0 lg:pl-6 group w-full gap-4 lg:gap-0">
          <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-5xl font-black font-mono tracking-tight text-zinc-400 lg:mb-2 leading-tight whitespace-nowrap group-hover:text-zinc-500 transition-colors w-20 lg:w-full shrink-0 text-center lg:text-left" title={data.themFirst.toString()}>
            {formatCompactNumber(data.themFirst)}
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-xs lg:text-sm font-bold uppercase tracking-wider lg:tracking-widest text-zinc-900 font-mono mb-0.5 lg:mb-2">{t('themFirst')}</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-light leading-tight md:leading-relaxed">{t('themFirstDesc')}</div>
          </div>
        </div>
      </div>

      {/* Visual Progress Bar to fill space */}
      <div className="mt-auto pt-8 relative z-10 w-full flex flex-col gap-2">
        <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden flex">
          <div className="bg-teal-600 h-full transition-all duration-1000 ease-out" style={{ width: `${(data.youFirst / total) * 100}%` }}></div>
          <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out" style={{ width: `${(data.sameDay / total) * 100}%` }}></div>
          <div className="bg-zinc-400 h-full transition-all duration-1000 ease-out" style={{ width: `${(data.themFirst / total) * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-zinc-400">
          <span>{((data.youFirst / total) * 100).toFixed(1)}%</span>
          <span>{((data.sameDay / total) * 100).toFixed(1)}%</span>
          <span>{((data.themFirst / total) * 100).toFixed(1)}%</span>
        </div>
      </div>

    </div>
  );
}
