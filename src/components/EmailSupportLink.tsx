"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { useSupport } from '@/contexts/SupportContext';
import { Mail } from 'lucide-react';

interface Props {
  className?: string;
  showIcon?: boolean;
}

export default function EmailSupportLink({ className, showIcon = false }: Props) {
  const { t } = useLanguage();
  const { openSupport } = useSupport();

  const defaultClassName = "text-emerald-500 hover:text-emerald-400 underline font-medium inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0";

  return (
    <button 
      onClick={openSupport}
      type="button"
      className={className || defaultClassName}
      title="Contact Support"
    >
      {showIcon && <Mail size={16} className="text-emerald-500" />}
      {showIcon ? t('emailSupport') : 'Email Support'}
    </button>
  );
}
