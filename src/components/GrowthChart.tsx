"use client";

import { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';
import ChartContainer from './ChartContainer';

interface GrowthChartProps {
  data: { date: string, followers: number, following: number }[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function GrowthChart({ data }: GrowthChartProps) {
  const { t, language } = useLanguage();
  const MONTHS = t('months') as unknown as string[];
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly' | 'custom'>('monthly');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi ukuran layar untuk grafik (Stacked di HP, Grouped di Laptop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dapatkan daftar tahun yang tersedia dari data
  const availableYears = useMemo(() => {
    if (!data || data.length === 0) return [];
    const years = new Set(data.map(d => d.date.split('-')[0]));
    return Array.from(years).sort().reverse(); // Urutkan dari tahun terbaru ke terlama
  }, [data]);

  // Set tahun default ke tahun terbaru saat komponen dimuat
  useEffect(() => {
    if (availableYears.length > 0 && !selectedYear) {
      setSelectedYear(availableYears[0]);
    }
    if (data && data.length > 0 && !customStart && !customEnd) {
      setCustomStart(data[0].date);
      setCustomEnd(data[data.length - 1].date);
    }
  }, [availableYears, selectedYear, data, customStart, customEnd]);

  // Proses data berdasarkan mode yang dipilih
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [{ displayDate: t('growthNoData') }];
    }

    if (viewMode === 'yearly') {
      // Agregasi (Total) per Tahun
      const yearlyMap: Record<string, { followers: number, following: number }> = {};
      
      data.forEach(item => {
        const year = item.date.split('-')[0];
        if (!yearlyMap[year]) {
          yearlyMap[year] = { followers: 0, following: 0 };
        }
        yearlyMap[year].followers += item.followers;
        yearlyMap[year].following += item.following;
      });

      return Object.keys(yearlyMap).sort().map(year => ({
        displayDate: year,
        followers: yearlyMap[year].followers > 0 ? yearlyMap[year].followers : undefined,
        following: yearlyMap[year].following > 0 ? yearlyMap[year].following : undefined
      }));

    } else if (viewMode === 'custom') {
      if (!customStart || !customEnd) return [];
      
      const filteredData = data.filter(d => d.date >= customStart && d.date <= customEnd);
      
      return filteredData.map(item => {
        const [year, month] = item.date.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        return {
          displayDate: `${MONTHS[monthIndex]} '${year.slice(2)}`,
          followers: item.followers > 0 ? item.followers : undefined,
          following: item.following > 0 ? item.following : undefined
        };
      });

    } else {
      // Mode Per Bulan (Khusus untuk tahun yang dipilih)
      if (!selectedYear) return [];
      
      const yearData = data.filter(d => d.date.startsWith(selectedYear));
      const monthlyMap: Record<string, { followers: number, following: number }> = {};
      
      yearData.forEach(item => {
        const monthIndex = parseInt(item.date.split('-')[1], 10) - 1;
        monthlyMap[MONTHS[monthIndex]] = { followers: item.followers, following: item.following };
      });

      return MONTHS.map(m => ({
        displayDate: m,
        followers: monthlyMap[m]?.followers > 0 ? monthlyMap[m].followers : undefined,
        following: monthlyMap[m]?.following > 0 ? monthlyMap[m].following : undefined
      }));
    }
  }, [data, viewMode, selectedYear, customStart, customEnd, MONTHS, t]);

  const getDescription = () => {
    if (viewMode === 'monthly') return `${t('growthDescMonthly')} ${selectedYear}`;
    if (viewMode === 'yearly') return t('growthDescYearly');
    return language === 'en' ? `Custom Range: ${customStart} to ${customEnd}` : `Rentang Kustom: ${customStart} sampai ${customEnd}`;
  };

  return (
    <ChartContainer 
      title={t('growthTitle')} 
      description={getDescription()}
      controls={
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-3 sm:mt-0 items-start sm:items-center">
          {viewMode === 'monthly' && availableYears.length > 0 && (
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full sm:w-auto bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 block p-2.5 outline-none cursor-pointer [&>option]:bg-white [&>option]:text-zinc-900"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{t('growthYear')} {year}</option>
              ))}
            </select>
          )}

          {viewMode === 'custom' && (
            <div className="flex flex-col min-[450px]:flex-row items-stretch min-[450px]:items-center gap-2 w-full sm:w-auto">
              <input 
                type="month" 
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full sm:w-auto bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 block p-2 outline-none"
              />
              <span className="text-zinc-400 font-medium hidden min-[450px]:block shrink-0">-</span>
              <input 
                type="month" 
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full sm:w-auto bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 block p-2 outline-none"
              />
            </div>
          )}

          <div className="flex w-full sm:w-auto bg-zinc-100 rounded-xl p-1 border border-zinc-200 hide-scrollbar overflow-x-auto">
            <button 
              onClick={() => setViewMode('monthly')}
              className={`flex-1 sm:flex-none px-2 min-[375px]:px-4 py-2 text-xs min-[375px]:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                viewMode === 'monthly' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {t('growthPerMonth')}
            </button>
            <button 
              onClick={() => setViewMode('yearly')}
              className={`flex-1 sm:flex-none px-2 min-[375px]:px-4 py-2 text-xs min-[375px]:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                viewMode === 'yearly' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {t('growthPerYear')}
            </button>
            <button 
              onClick={() => setViewMode('custom')}
              className={`flex-1 sm:flex-none px-2 min-[375px]:px-4 py-2 text-xs min-[375px]:text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                viewMode === 'custom' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {language === 'en' ? 'Custom' : 'Kustom'}
            </button>
          </div>
        </div>
      }
    >
      <div className="h-72 md:h-96 w-full relative z-10 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12, fontFamily: 'monospace'}} />
            <Tooltip 
              cursor={{fill: '#f4f4f5'}}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              labelStyle={{ fontWeight: 'bold', color: '#18181b', marginBottom: '8px' }}
              itemStyle={{ color: '#52525b' }}
            />
            
            {/* Followers Baru (Bawah saat mobile atau kustom, Kiri saat laptop mode lain) */}
            <Bar 
              dataKey="followers" 
              name={t('growthNewFollowers')} 
              fill="#10b981" 
              stackId={isMobile || viewMode === 'custom' ? "a" : undefined} 
              maxBarSize={40} 
              radius={isMobile || viewMode === 'custom' ? [0, 0, 0, 0] : [6, 6, 0, 0]} 
              isAnimationActive={false}
            />
            
            {/* Following Baru (Atas saat mobile atau kustom, Kanan saat laptop mode lain) */}
            <Bar 
              dataKey="following" 
              name={t('growthNewFollowing')} 
              fill="#52525b" 
              stackId={isMobile || viewMode === 'custom' ? "a" : undefined} 
              radius={[6, 6, 0, 0]} 
              maxBarSize={40} 
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Responsive Legend */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-start sm:items-center gap-3 sm:gap-6 mt-4 w-full relative z-10 px-2">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-600 font-medium">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#10b981' }}></span>
          <span>{t('growthNewFollowers')}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-600 font-medium">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#52525b' }}></span>
          <span>{t('growthNewFollowing')}</span>
        </div>
      </div>
    </ChartContainer>
  );
}
