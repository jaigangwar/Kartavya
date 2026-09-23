'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle({ className = '' }) {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`relative h-10 px-3 rounded-xl glass flex items-center justify-center gap-2
        hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-sm ${className}`}
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4 text-brand dark:text-brand-400" />
      <span className="text-slate-700 dark:text-slate-200">
        {lang === 'en' ? 'EN / HI' : 'HI / EN'}
      </span>
    </button>
  );
}
