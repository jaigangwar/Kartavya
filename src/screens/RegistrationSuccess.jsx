'use client';

import { motion } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import { useRouter } from 'next/navigation';
import { CheckCircle2, FileText, RotateCcw } from 'lucide-react';

export default function RegistrationSuccess({ isKiosk = false }) {
  const { data, nextStep, resetRegistration } = useRegistration();
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
            Registration Completed
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className={`text-slate-500 dark:text-slate-400 ${isKiosk ? 'text-lg' : 'text-base'}`}>
            Your OPD slip has been generated successfully.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="glass-card p-6 md:p-8 max-w-md mx-auto mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Patient Name</span>
              <span className="font-semibold text-slate-900 dark:text-white">{data.patientName}</span>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Patient ID</span>
              <span className="font-mono font-semibold text-brand dark:text-brand-400 text-sm">{data.patientId}</span>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Department</span>
              <span className="font-semibold text-slate-900 dark:text-white">{data.department}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={nextStep} className={`flex-1 ${isKiosk ? 'btn-primary-lg' : 'btn-primary'}`}>
            <FileText className="w-5 h-5" /> View OPD Slip
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleNew} className={`flex-1 ${isKiosk ? 'btn-secondary px-8 py-4 text-lg rounded-2xl' : 'btn-secondary'}`}>
            <RotateCcw className="w-5 h-5" /> New Registration
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
