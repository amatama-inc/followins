"use client";

import { Globe, ArrowUpCircle, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import AccountSwitcher from '../shared/AccountSwitcher';

interface HeaderProps {
  showNav?: boolean;
  currentUsername?: string | null;
  onSwitchAccount?: (username: string) => void;
  triggerRefresh?: number;
}

export default function Header({ showNav = true, currentUsername = null, onSwitchAccount, triggerRefresh = 0 }: HeaderProps = {}) {
  const { t, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [hasAccounts, setHasAccounts] = useState(false);

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
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 cursor-pointer group min-w-0 shrink-0" onClick={scrollToTop}>
        <img src="/logo.png" alt="Followins Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain shrink-0" />
        <span className="font-bold text-lg sm:text-fluid-h3 tracking-tight text-zinc-900 truncate">
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

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 lg:gap-6 shrink-0">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors hover:text-zinc-900 shrink-0"
          title="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        <button 
          onClick={toggleLanguage}
          className="flex items-center justify-center sm:gap-2 text-sm font-medium text-zinc-600 w-8 h-8 sm:w-auto sm:px-3 sm:py-2 hover:bg-zinc-100 rounded-lg transition-colors hover:text-zinc-900 shrink-0"
          title="Toggle Language"
        >
          <Globe className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline whitespace-nowrap">{t('langSwitch')}</span>
        </button>

        {showNav && !hasAccounts && (
          <button 
            onClick={scrollToTop}
            className="hidden sm:flex items-center gap-1.5 lg:gap-2 px-3 py-2 lg:px-5 lg:py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors shadow-sm whitespace-nowrap"
          >
            {t('navUpload')}
            <ArrowUpCircle size={18} />
          </button>
        )}

        {onSwitchAccount && (
          <AccountSwitcher 
            currentUsername={currentUsername} 
            onSwitchAccount={onSwitchAccount} 
            triggerRefresh={triggerRefresh} 
            onHasAccounts={setHasAccounts}
          />
        )}
      </div>
    </header>
  );
}
