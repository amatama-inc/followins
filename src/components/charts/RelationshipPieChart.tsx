"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';

interface RelationshipPieChartProps {
  unfollowers: number;
  fans: number;
  mutuals: number;
}

export default function RelationshipPieChart({ unfollowers, fans, mutuals }: RelationshipPieChartProps) {
  const { t } = useLanguage();
  const data = [
    { name: t('relNotFollowBack'), value: unfollowers, color: '#52525b' }, // Zinc-500
    { name: t('relMutual'), value: mutuals, color: '#10b981' }, // Emerald-500
    { name: t('relFans'), value: fans, color: '#14b8a6' }, // Teal-500
  ];

  // Sembunyikan bagian yang bernilai 0
  const filteredData = data.filter(item => item.value > 0);

  // Render teks persentase di tengah potongan (slice) pie
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    // For simplicity, we just use a contrasting color strategy:
    const fillCol = (index === 1) ? "#000" : "#fff";

    if (percent < 0.05) return null;

    return (
      <text x={x} y={y} fill={fillCol} fontSize="13" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border border-zinc-200 rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-sm relative overflow-hidden">
      
      <div className="relative z-10 border-b border-zinc-200 pb-4 lg:pb-6">
        <h3 className="text-fluid-widget-title font-bold text-zinc-900 tracking-tight mb-1 lg:mb-2">{t('relTitle')}</h3>
        <p className="text-fluid-widget-desc text-zinc-600 font-light max-w-2xl">
          {t('relDesc')}
        </p>
      </div>
      
      <div className="h-64 md:h-72 lg:h-80 w-full flex justify-center items-center relative z-10 mt-4 lg:mt-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="90%"
              labelLine={false}
              label={renderCustomizedLabel}
              dataKey="value"
              isAnimationActive={true}
              stroke="#ffffff"
              strokeWidth={2} 
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontFamily: 'monospace' }}
              itemStyle={{ fontWeight: 'bold', color: '#18181b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Responsive Legend */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-start sm:items-center gap-3 sm:gap-6 mt-4 w-full relative z-10 px-2">
        {filteredData.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-600 font-medium">
            <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
