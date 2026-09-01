"use client";

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';
import ChartContainer from './ChartContainer';

interface CohortChartProps {
  data: { year: string, fans: number, mutuals: number, unfollowers: number }[];
}

export default function CohortChart({ data }: CohortChartProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isTablet, setIsTablet] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const handleResize = () => {
      // Tablet view: 768px to 1023px
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data || data.length === 0) return null;

  // Menghitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Logika Pagination:
  // Data aslinya diurutkan dari tahun terlama -> terbaru.
  // Halaman 1 = 10 tahun terbaru.
  // Untuk mengambilnya dengan mudah: balikkan array (terbaru di depan), potong, lalu balikkan lagi untuk render di grafik (agar X-axis tetap terlama -> terbaru).
  const reversedData = [...data].reverse();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = reversedData.slice(startIndex, startIndex + itemsPerPage).reverse();

  const currentStackId = isTablet ? undefined : "a";

  return (
    <ChartContainer title={t('cohortTitle')} description={t('cohortDesc')}>
      <div className="h-64 md:h-80 w-full relative z-10 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={paginatedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} />
            <Tooltip 
              cursor={{fill: '#f4f4f5'}}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            
            <Bar dataKey="mutuals" name={t('cohortMutuals')} stackId={currentStackId} fill="#10b981" maxBarSize={40} isAnimationActive={false} radius={isTablet ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            <Bar dataKey="fans" name={t('cohortFans')} stackId={currentStackId} fill="#14b8a6" maxBarSize={40} isAnimationActive={false} radius={isTablet ? [4, 4, 0, 0] : [0, 0, 0, 0]} />
            <Bar dataKey="unfollowers" name={t('cohortUnfollowers')} stackId={currentStackId} fill="#52525b" maxBarSize={40} radius={isTablet ? [4, 4, 0, 0] : [6, 6, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Responsive Legend */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-start sm:items-center gap-3 sm:gap-6 mt-4 w-full relative z-10 px-2">
        <div className="flex items-center gap-2.5 text-[11px] sm:text-sm text-zinc-600 font-medium">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#10b981' }}></span>
          <span>{t('cohortMutuals')}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] sm:text-sm text-zinc-600 font-medium">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#14b8a6' }}></span>
          <span>{t('cohortFans')}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] sm:text-sm text-zinc-600 font-medium">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#52525b' }}></span>
          <span>{t('cohortUnfollowers')}</span>
        </div>
      </div>

      {/* Kontrol Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-row justify-center items-center mt-8 gap-1 sm:gap-4 relative z-10 w-full px-1 sm:px-0">
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-[11px] sm:text-sm font-medium text-zinc-700 bg-white px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-xl disabled:opacity-30 transition-all hover:bg-zinc-50 border border-zinc-200 flex items-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none justify-center"
          >
            <span>&larr;</span> {t('cohortOlder')}
          </button>
          
          <span className="text-[11px] sm:text-sm font-medium text-zinc-600 px-3 py-2 sm:px-4 sm:py-2.5 bg-zinc-50 rounded-xl border border-zinc-200 whitespace-nowrap">
            {t('cohortPage')} {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-[11px] sm:text-sm font-medium text-zinc-700 bg-white px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-xl disabled:opacity-30 transition-all hover:bg-zinc-50 border border-zinc-200 flex items-center gap-1 sm:gap-2 whitespace-nowrap flex-1 sm:flex-none justify-center"
          >
            {t('cohortNewer')} <span>&rarr;</span>
          </button>
        </div>
      )}
    </ChartContainer>
  );
}
