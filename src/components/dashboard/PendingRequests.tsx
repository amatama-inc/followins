"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { deobfuscate } from '@/utils/crypto';
import { UserCheck, Clock, CheckCircle2 } from 'lucide-react';

interface PendingRequestsProps {
  data: { username: string; timestamp: number }[];
}

export default function PendingRequests({ data }: PendingRequestsProps) {
  const { t, language } = useLanguage();

  if (!data) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-blue-50 text-blue-500 rounded-lg">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-fluid-widget-title text-zinc-900 tracking-tight">{t('pendingTitle')}</h3>
          <p className="text-fluid-widget-desc text-zinc-500">{t('pendingDesc')}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 relative z-10">
        {data.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-200 rounded-xl bg-zinc-50">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" />
            <p className="text-zinc-600 font-medium">{language === 'en' ? 'No pending requests!' : 'Bersih! Tidak ada permintaan menggantung.'}</p>
            <p className="text-xs text-zinc-400 mt-1">{language === 'en' ? 'Everyone you requested to follow has accepted.' : 'Semua permintaan follow Anda sudah diterima.'}</p>
          </div>
        ) : (
          <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
            {data.slice(0, 50).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 transition-colors border border-zinc-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-zinc-800 truncate" title={deobfuscate(item.username)}>@{deobfuscate(item.username)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(item.timestamp)}</span>
                </div>
              </div>
            ))}
            {data.length > 50 && (
              <div className="text-center p-3 text-xs text-zinc-500 font-medium bg-zinc-50 rounded-lg">
                {language === 'en' ? `+ ${data.length - 50} more hidden` : `+ ${data.length - 50} lainnya disembunyikan`}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Global styles for custom scrollbar inside this component scope */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f4f4f5; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d8; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa; 
        }
      `}} />
    </div>
  );
}
