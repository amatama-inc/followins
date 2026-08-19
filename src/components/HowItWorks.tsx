import { useLanguage } from '@/i18n/LanguageContext';
import { Settings, Download, Mail, Upload } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: t('step1Title'),
      desc: t('step1Desc'),
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: t('step2Title'),
      desc: t('step2Desc'),
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('step3Title'),
      desc: t('step3Desc'),
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: t('step4Title'),
      desc: t('step4Desc'),
    }
  ];

  return (
    <section id="how-it-works" className="w-full max-w-7xl mx-auto py-8 md:py-20 px-6 md:px-12 relative z-10">
      <div className="mb-8 md:mb-12 text-left">
        <h2 className="text-fluid-h2 font-black text-zinc-900 mb-6 tracking-tight leading-tight">{t('howItWorksTitle')}</h2>
        <p className="text-fluid-subtitle text-zinc-600 font-light leading-relaxed">{t('howItWorksDesc')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="group relative flex flex-row sm:flex-col items-start gap-4 sm:gap-0 p-5 sm:p-6 lg:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all shadow-lg overflow-hidden hover:border-emerald-500/50">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            
            <div className="absolute top-2 right-3 lg:top-4 lg:right-6 text-fluid-h1 font-black text-zinc-800/40 group-hover:text-zinc-700/50 transition-colors select-none z-10 pointer-events-none">0{idx + 1}</div>
              
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl flex items-center justify-center mb-0 sm:mb-6 lg:mb-8 bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-7 sm:[&>svg]:h-7 lg:[&>svg]:w-8 lg:[&>svg]:h-8 [&>svg]:text-emerald-500 relative z-20">
              {step.icon}
            </div>
            
            <div className="relative z-20 pr-6 lg:pr-0">
              <h3 className="text-fluid-h4 font-bold mb-2 lg:mb-3 text-zinc-100 tracking-tight">{step.title}</h3>
              <p className="font-light text-zinc-400 leading-relaxed text-sm lg:text-base">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
