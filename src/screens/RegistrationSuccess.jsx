'use client';

import { motion } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { CheckCircle2, FileText, RotateCcw } from 'lucide-react';

export default function RegistrationSuccess({ isKiosk = false }) {
  const { data, nextStep, resetRegistration } = useRegistration();
  const { t } = useLanguage();
  const router = useRouter();
  const handleNew = () => { resetRegistration(); if (!isKiosk) router.push('/'); };
  const cls = isKiosk ? 'max-w-2xl mx-auto px-6 py-12' : 'max-w-2xl mx-auto px-4 sm:px-6 py-10';

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <div className={cls}>
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-success/30">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className={`font-heading font-bold text-slate-900 dark:text-white mb-2 ${isKiosk ? 'text-3xl' : 'text-2xl'}`}>
            {t('regCompleted')}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className={`text-slate-500 dark:text-slate-400 ${isKiosk ? 'text-lg' : 'text-base'}`}>
            {t('regSuccessSub')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="glass-card p-6 md:p-8 h-full flex flex-col justify-center">
            <h3 className="font-heading font-semibold text-lg mb-4 text-slate-800 dark:text-white">Registration Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('patientName')}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{data.patientName}</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('patientId')}</span>
                <span className="font-mono font-semibold text-brand dark:text-brand-400 text-sm">{data.patientId}</span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500 dark:text-slate-400">{t('department')}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{data.department}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
            className="glass-card p-0 overflow-hidden relative bg-[#efeae2] dark:bg-[#0b141a] border-0 shadow-lg flex flex-col h-full min-h-[250px]">
            {/* WhatsApp Header */}
            <div className="bg-[#008069] dark:bg-[#202c33] p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="text-[#008069] font-bold font-heading">K</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">KARTAVYA Hospital</p>
                <p className="text-white/80 text-xs">Official Account</p>
              </div>
            </div>
            {/* WhatsApp Chat bg */}
            <div className="p-4 flex-1 flex items-end">
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}
                className="bg-white dark:bg-[#202c33] rounded-lg rounded-tl-none p-3 max-w-[90%] shadow-sm relative">
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-snug">
                  Dear *{data.patientName}*,<br/><br/>
                  Your OPD registration is successful.<br/>
                  *Token No:* 42<br/>
                  *Dept:* {data.department}<br/>
                  *ID:* {data.patientId}<br/><br/>
                  Show this at the counter.
                </p>
                <span className="text-[10px] text-slate-400 float-right mt-1">Just now</span>
                {/* Tail */}
                <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white dark:border-t-[#202c33] border-l-[10px] border-l-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={nextStep} className={`flex-1 ${isKiosk ? 'btn-primary-lg' : 'btn-primary'}`}>
            <FileText className="w-5 h-5" /> {t('viewSlip')}
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleNew} className={`flex-1 ${isKiosk ? 'btn-secondary px-8 py-4 text-lg rounded-2xl' : 'btn-secondary'}`}>
            <RotateCcw className="w-5 h-5" /> {t('newReg')}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
