import { useLanguage } from '@/i18n/LanguageContext';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('general');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const categories = [
    { id: 'general', label: t('faqCatGeneral') },
    { id: 'usage', label: t('faqCatUsage') },
    { id: 'security', label: t('faqCatSecurity') }
  ];

  const faqs = {
    general: [
      { q: t('q1'), a: t('a1') },
      { q: t('q8'), a: t('a8') },
      { q: t('q5'), a: t('a5') }
    ],
    usage: [
      { q: t('q2'), a: t('a2') },
      { q: t('q3'), a: t('a3') },
      { q: t('q7'), a: t('a7') }
    ],
    security: [
      { q: t('q6'), a: t('a6') },
      { q: t('q9'), a: t('a9') },
      { q: t('q4'), a: t('a4') }
    ]
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIdx(0);
  };

  const currentFaqs = faqs[activeCategory as keyof typeof faqs];

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto py-8 md:py-20 px-6 md:px-12 relative z-10">
      <div className="mb-8 md:mb-10 text-left">
        <h2 className="text-fluid-h2 font-black text-zinc-900 mb-6 tracking-tight leading-tight">{t('faqTitle')}</h2>
        <p className="text-fluid-subtitle text-zinc-600 font-light leading-relaxed">{t('faqDesc')}</p>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 mb-8 text-left">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
              activeCategory === cat.id 
                ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20 border border-emerald-400' 
                : 'bg-zinc-100 text-zinc-600 border border-zinc-200 shadow-sm hover:bg-zinc-200 hover:text-zinc-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {currentFaqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`rounded-xl border transition-all duration-300 overflow-hidden relative ${openIdx === idx ? 'bg-zinc-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none relative z-10"
            >
              <span className={`font-bold text-fluid-h4 tracking-tight pr-8 ${openIdx === idx ? 'text-emerald-400' : 'text-zinc-100'}`}>
                {faq.q}
              </span>
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 shrink-0 ${openIdx === idx ? 'rotate-180 text-emerald-500' : 'text-zinc-500'}`} />
            </button>
            
            <div 
              className={`px-6 md:px-8 transition-all duration-300 ease-in-out relative z-10 ${openIdx === idx ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
            >
              <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
