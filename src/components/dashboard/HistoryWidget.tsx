import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { HistoryRecord } from '@/utils/storage';
import { Clock, Users, UserMinus, Heart, RotateCcw } from 'lucide-react';

interface HistoryWidgetProps {
  onRestore?: () => void;
}

export default function HistoryWidget({ onRestore }: HistoryWidgetProps) {
  const { t, language } = useLanguage();
  const [history, setHistory] = useState<HistoryRecord | null>(null);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('followins_history');
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryRecord[];
        if (parsed && parsed.length > 0) {
          // Get the most recent one
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setHistory(parsed[0]);
        }
      }
      if (localStorage.getItem('followins_latest_session')) {
        setHasSession(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!history) return null;

  const date = new Date(history.timestamp).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US', 
    { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  );

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  return (
    <div className="group relative w-full max-w-3xl mx-auto my-8 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 md:p-6 transition-all shadow-lg overflow-hidden hover:border-emerald-500/50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-zinc-800 pb-4 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-emerald-500">
            <Clock />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-zinc-100 tracking-tight">
            <span className="text-emerald-500 select-none mr-2 font-mono">~ $</span>{t('historyTitle')}
          </h3>
        </div>
        <div className="self-start sm:self-auto">
          <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block shadow-sm">
            [{date}]
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 divide-x divide-zinc-800/50 bg-zinc-950/40 border border-zinc-800/60 rounded-xl relative z-20 backdrop-blur-sm overflow-hidden">
        
        <div className="p-2 sm:p-4 md:p-5 flex flex-col items-center sm:items-start hover:bg-zinc-900/30 transition-colors group/metric">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="p-1 sm:p-1.5 bg-rose-500/10 rounded-md border border-rose-500/20 group-hover/metric:border-rose-500/40 transition-all shrink-0">
              <UserMinus className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-medium tracking-wide text-center sm:text-left leading-tight">{t('cohortUnfollowers')}</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-100 font-mono tracking-tight mt-1">{formatNumber(history.unfollowers)}</span>
        </div>

        <div className="p-2 sm:p-4 md:p-5 flex flex-col items-center sm:items-start hover:bg-zinc-900/30 transition-colors group/metric">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="p-1 sm:p-1.5 bg-emerald-500/10 rounded-md border border-emerald-500/20 group-hover/metric:border-emerald-500/40 transition-all shrink-0">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-medium tracking-wide text-center sm:text-left leading-tight">{t('cohortFans')}</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-100 font-mono tracking-tight mt-1">{formatNumber(history.fans)}</span>
        </div>

        <div className="p-2 sm:p-4 md:p-5 flex flex-col items-center sm:items-start hover:bg-zinc-900/30 transition-colors group/metric">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
            <div className="p-1 sm:p-1.5 bg-indigo-500/10 rounded-md border border-indigo-500/20 group-hover/metric:border-indigo-500/40 transition-all shrink-0">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-medium tracking-wide text-center sm:text-left leading-tight">{t('cohortMutuals')}</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-100 font-mono tracking-tight mt-1">{formatNumber(history.mutuals)}</span>
        </div>
      </div>

      {onRestore && hasSession && (
        <div className="mt-5 pt-4 border-t border-zinc-800/50 flex justify-center sm:justify-start relative z-20">
          <button 
            onClick={onRestore}
            className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 hover:border-emerald-500/30 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2 hover:-translate-y-0.5 w-full sm:w-auto justify-center group/btn"
          >
            <RotateCcw className="w-4 h-4 group-hover/btn:-rotate-180 transition-transform duration-500" />
            {language === 'en' ? 'Open Last Analysis' : 'Buka Riwayat Terakhir'}
          </button>
        </div>
      )}
    </div>
  );
}
