import { useLanguage } from '@/i18n/LanguageContext';
import Link from 'next/link';
import { Shield, FileText, Mail } from 'lucide-react';
import EmailSupportLink from '../shared/EmailSupportLink';

export default function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="w-full mt-auto bg-zinc-900 border-t border-zinc-800 pt-8 pb-28 md:pb-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-zinc-800 pb-8">
          
          {/* Logo & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img src="/logo.png" alt="Followins Logo" className="w-12 h-12 object-contain" />
            <div>
              <span className="font-bold text-2xl tracking-tight text-white font-mono block">
                FOLLOWINS
              </span>
              <p className="text-zinc-400 font-light text-sm mt-1">
                {t('footerText')}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/privacy" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium text-sm group">
              <Shield size={16} className="text-emerald-500" />
              {t('privacyPolicy')}
            </Link>
            <Link href="/terms" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium text-sm group">
              <FileText size={16} className="text-emerald-500" />
              {t('termsOfService')}
            </Link>
            <EmailSupportLink 
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium text-sm group" 
              showIcon={true} 
            />
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-light text-sm text-zinc-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} FOLLOWINS. {language === 'en' ? 'ALL RIGHTS RESERVED.' : 'HAK CIPTA DILINDUNGI.'}
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              {language === 'en' ? 'A PROJECT BY' : 'SEBUAH PROYEK DARI'} 
              <span className="font-medium text-zinc-300 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs">AMATAMA.INC</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
