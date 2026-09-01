"use client";

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { deobfuscate } from '@/utils/crypto';
import { Award, Medal, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface LoyalFollowersProps {
  data: { username: string; timestamp: number }[];
  accountMode?: 'public' | 'private';
}

export default function LoyalFollowers({ data, accountMode = 'public' }: LoyalFollowersProps) {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
        <div className="p-2 lg:p-2.5 bg-amber-50 text-amber-500 rounded-lg">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-fluid-widget-title text-zinc-900 tracking-tight">
            {accountMode === 'private' ? (language === 'en' ? 'Oldest Followers Audit' : 'Audit Pengikut Lama') : t('loyalTitle')}
          </h3>
          <p className="text-fluid-widget-desc text-zinc-500">
            {accountMode === 'private' ? (language === 'en' ? 'People who have followed you for a very long time. Do you still know them?' : 'Daftar orang yang sudah sangat lama mem-follow Anda. Apakah Anda masih mengenali mereka?') : t('loyalDesc')}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {paginatedData.map((item, index) => {
          const realIndex = startIndex + index;
          return (
            <div key={realIndex} className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100 gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center font-bold text-sm shrink-0">
                {realIndex === 0 ? <Medal className="w-4 h-4 text-amber-500" /> : 
                 realIndex === 1 ? <Medal className="w-4 h-4 text-zinc-400" /> : 
                 realIndex === 2 ? <Medal className="w-4 h-4 text-amber-700" /> : 
                 realIndex + 1}
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between min-w-0 flex-1 gap-0.5 lg:gap-2">
                <span className="font-medium text-zinc-800 truncate">@{deobfuscate(item.username)}</span>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 shrink-0 whitespace-nowrap">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>{formatDate(item.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 md:p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <div className="text-xs md:text-sm font-medium text-zinc-600">
            {currentPage} / {totalPages}
          </div>
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 md:p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
