"use client";

import { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';
import ChartContainer from './ChartContainer';

interface SeasonalityRadarProps {
  data: { date: string, followers: number }[];
}


export default function SeasonalityRadar({ data }: SeasonalityRadarProps) {
  const { t } = useLanguage();
  const MONTHS = t('months') as unknown as string[];
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const availableYears = useMemo(() => {
    if (!data || data.length === 0) return [];
    // Ekstrak tahun dari "YYYY-MM"
    const years = new Set(data.map(d => d.date.split('-')[0]));
    return Array.from(years).sort().reverse();
  }, [data]);

  const chartData = useMemo(() => {
    // Inisialisasi 12 bulan dengan 0
    const monthlyMap: Record<string, number> = {};
    MONTHS.forEach(m => monthlyMap[m] = 0);

    data.forEach(item => {
      if (!item.date) return;
      const [year, monthStr] = item.date.split('-');
      if (selectedYear === 'all' || selectedYear === year) {
        const monthIndex = parseInt(monthStr, 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyMap[MONTHS[monthIndex]] += item.followers;
        }
      }
    });

    return MONTHS.map(month => ({
      month,
      followers: monthlyMap[month]
    }));
  }, [data, selectedYear, MONTHS]);

  if (!data || data.length === 0) return null;

  return (
    <ChartContainer
      title={t('seasonTitle')}
      description={selectedYear === 'all' 
        ? t('seasonDescAll')
        : `${t('seasonDescYear')} ${selectedYear}?`
      }
      controls={
        availableYears.length > 0 && (
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 text-zinc-900 font-medium text-sm rounded-xl focus:ring-2 focus:ring-emerald-500/50 block p-2.5 outline-none cursor-pointer [&>option]:bg-white [&>option]:text-zinc-900 min-w-[140px]"
          >
            <option value="all">{t('seasonAllTime')}</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{t('growthYear')} {year}</option>
            ))}
          </select>
        )
      }
    >
      <div className="h-72 md:h-96 w-full relative z-10 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#e4e4e7" />
            <PolarAngleAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} />
            <Radar name={t('seasonTotalFollowers')} dataKey="followers" stroke="#10b981" strokeWidth={2} fill="#34d399" fillOpacity={0.4} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              itemStyle={{ fontWeight: 'bold', color: '#18181b' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
