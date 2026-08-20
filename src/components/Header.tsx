"use client";

import { Globe, ArrowUpCircle, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/components/ThemeContext';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps = {}) {
  const { t, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const scrollToSection = (id: string) => {
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      router.push('/#' + id);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 md:px-4 lg:px-12 bg-white sticky top-0 z-50 border-b border-zinc-200 h-20 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={scrollToTop}>
        <img src="/logo.png" alt="Followins Logo" className="w-10 h-10 md:w-11 md:h-11 object-contain" />
        <span className="font-bold text-fluid-h3 tracking-tight text-zinc-900">
          FOLLOWINS
        </span>
      </div>

      {/* Desktop Navigation */}
      {showNav && (
        <nav className="hidden md:flex items-center gap-3 lg:gap-8 h-full px-1 lg:px-8">
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors whitespace-nowrap">
            {t('navHowItWorks')}
          </button>
          <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors whitespace-nowrap">
            {t('navFeatures')}
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors whitespace-nowrap">
            {t('navFaq')}
          </button>
        </nav>
      )}

      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors hover:text-zinc-900"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-sm font-medium text-zinc-600 px-3 py-2 hover:bg-zinc-100 rounded-lg transition-colors hover:text-zinc-900"
          title="Toggle Language"
        >
          <Globe size={18} />
          <span className="hidden sm:inline whitespace-nowrap">{t('langSwitch')}</span>
        </button>

        {showNav && (
          <button 
            onClick={scrollToTop}
            className="hidden sm:flex items-center gap-1.5 lg:gap-2 px-3 py-2 lg:px-5 lg:py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors shadow-sm whitespace-nowrap"
          >
            {t('navUpload')}
            <ArrowUpCircle size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
