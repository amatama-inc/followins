import { Users, UserMinus, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface MetricCardsProps {
  unfollowers: number;
  fans: number;
  mutuals: number;
  accountMode?: 'public' | 'private';
}

export default function MetricCards({ unfollowers, fans, mutuals, accountMode = 'public' }: MetricCardsProps) {
  const { t, formatCompactNumber, language } = useLanguage();
  return (
    <div className="grid grid-cols-3 divide-x divide-zinc-200 bg-white border border-zinc-200 rounded-2xl md:rounded-3xl relative z-10 shadow-sm overflow-hidden w-full">
      
      <div className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors group/metric">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-700 mb-3 sm:mb-4 lg:mb-6 border border-zinc-200 group-hover/metric:scale-110 transition-transform shrink-0">
          <UserMinus className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-emerald-600" />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 sm:mb-2 lg:mb-3">{t('cohortUnfollowers') || 'Unfollowers'}</h3>
        <p className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black font-mono text-zinc-900 tracking-tighter">{formatCompactNumber(unfollowers)}</p>
      </div>

      <div className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors group/metric">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-700 mb-3 sm:mb-4 lg:mb-6 border border-zinc-200 group-hover/metric:scale-110 transition-transform shrink-0">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-rose-500" />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 sm:mb-2 lg:mb-3">
          {accountMode === 'private' ? (language === 'en' ? 'Lurkers' : 'Penyusup') : (t('cohortFans') || 'Fans')}
        </h3>
        <p className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black font-mono text-zinc-900 tracking-tighter">{formatCompactNumber(fans)}</p>
      </div>

      <div className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors group/metric">
        <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-zinc-50 rounded-xl md:rounded-2xl flex items-center justify-center text-zinc-700 mb-3 sm:mb-4 lg:mb-6 border border-zinc-200 group-hover/metric:scale-110 transition-transform shrink-0">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-500" />
        </div>
        <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm lg:text-base mb-1 sm:mb-2 lg:mb-3">{t('cohortMutuals') || 'Mutuals'}</h3>
        <p className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black font-mono text-zinc-900 tracking-tighter">{formatCompactNumber(mutuals)}</p>
      </div>
      
    </div>
  );
}
