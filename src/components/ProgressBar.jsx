'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProgressBar({ currentStep = 0, isKiosk = false }) {
  const { t } = useLanguage();
  const stepLabels = [t('step1'), t('step2'), t('step3'), t('step4'), t('step5')];

  return (
    <div className={`w-full ${isKiosk ? 'px-8 py-6' : 'px-4 py-4'}`}>
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {stepLabels.map((label, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`
                    flex items-center justify-center rounded-full transition-all duration-500
                    ${isKiosk ? 'w-12 h-12 text-base' : 'w-9 h-9 text-sm'}
                    ${isCompleted
                      ? 'bg-gradient-to-br from-brand to-brand-500 text-white shadow-lg shadow-brand/20'
                      : isActive
                        ? 'bg-gradient-to-br from-brand to-brand-500 text-white ring-4 ring-brand-100 dark:ring-brand-800 shadow-lg shadow-brand/30'
                        : 'glass text-slate-400 dark:text-slate-500'
                    }
                    font-semibold
                  `}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                      <Check className={isKiosk ? 'w-5 h-5' : 'w-4 h-4'} strokeWidth={3} />
                    </motion.div>
                  ) : (
                    i + 1
                  )}
                </motion.div>
                <span className={`mt-2 text-center whitespace-nowrap transition-colors duration-300
                  ${isKiosk ? 'text-sm' : 'text-xs'}
                  ${isActive ? 'text-brand dark:text-brand-300 font-semibold' : isCompleted ? 'text-brand-500 dark:text-brand-200' : 'text-slate-400 dark:text-slate-500'}
                `}>
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`flex-1 ${isKiosk ? 'mx-3' : 'mx-1.5'}`}>
                  <div className="h-0.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand to-brand-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: i < currentStep ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
