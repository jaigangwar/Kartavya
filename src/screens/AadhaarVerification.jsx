'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Fingerprint, CheckCircle2, ScanFace, ChevronLeft, Info } from 'lucide-react';

export default function AadhaarVerification({ isKiosk }) {
  const { updateData, nextStep, prevStep } = useRegistration();
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);

  const [scanType, setScanType] = useState('aadhaar'); // 'aadhaar' or 'abha'

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
      updateData('aadhaarVerified', true); // Works for both in context
      setTimeout(() => {
        nextStep();
      }, 1500);
    }, 2500);
  };

  const skipVerification = () => {
    updateData('aadhaarVerified', false);
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      
      {/* ─── Instructions ─── */}
      <div className="mb-6 p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <p className="text-sm text-brand-700 font-medium leading-relaxed">
          {t('aadhaarInstructions')}
        </p>
      </div>

      <div className="mb-8">
        <button onClick={prevStep} className={`${isKiosk ? 'text-lg mb-6' : 'text-sm mb-4'} font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors`}>
          <ChevronLeft className={isKiosk ? 'w-5 h-5' : 'w-4 h-4'} /> {t('back')}
        </button>
        <h2 className={`${isKiosk ? 'text-4xl mb-4' : 'text-3xl mb-2'} font-heading font-bold text-slate-900 dark:text-white`}>{t('verifyIdentity')}</h2>
        <p className={`${isKiosk ? 'text-xl' : ''} text-slate-600 dark:text-slate-400`}>{t('verifyIdentitySub')}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setScanType('aadhaar')} className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-all ${scanType === 'aadhaar' ? 'bg-brand/10 border-brand text-brand' : 'glass border-transparent text-slate-500'}`}>
          Aadhaar Biometric
        </button>
        <button onClick={() => setScanType('abha')} className={`flex-1 py-3 px-4 rounded-xl font-semibold border-2 transition-all flex items-center justify-center gap-2 ${scanType === 'abha' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'glass border-transparent text-slate-500'}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          ABHA Card QR
        </button>
      </div>

      <div className={`card border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 flex flex-col items-center justify-center relative overflow-hidden group ${isKiosk ? 'min-h-[450px]' : 'min-h-[400px]'}`}>
        
        {scanning && (
          <div className={`absolute inset-0 pointer-events-none ${scanType === 'abha' ? 'bg-emerald-500/5' : 'bg-brand/5'}`}>
            <div className={`absolute w-full h-1 shadow-[0_0_15px_rgba(41,128,185,1)] animate-scan-line ${scanType === 'abha' ? 'bg-emerald-500' : 'bg-brand-500'}`} />
            <div className="absolute inset-0 flex items-center justify-center animate-pulse-gentle">
              <ScanFace className={`w-64 h-64 ${scanType === 'abha' ? 'text-emerald-500/20' : 'text-brand-500/20'}`} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.div key="scan" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="text-center relative z-10">
              <button
                onClick={handleScan}
                disabled={scanning}
                className={`w-32 h-32 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 
                hover:shadow-2xl transition-all duration-300 group disabled:opacity-80
                border-4 border-transparent ${scanType === 'abha' ? 'hover:shadow-emerald-500/20 hover:border-emerald-500/30' : 'hover:shadow-brand-500/20 hover:border-brand-500/30'}`}
              >
                <div className="relative">
                  <Fingerprint className={`w-16 h-16 transition-all duration-500 ${scanType === 'abha' ? 'text-emerald-500' : 'text-brand-500'} ${scanning ? 'animate-spin-slow scale-110' : 'group-hover:scale-110'}`} />
                  {scanning && (
                    <div className={`absolute inset-0 border-4 rounded-full animate-ripple border-t-transparent ${scanType === 'abha' ? 'border-emerald-500' : 'border-brand-500'}`} />
                  )}
                </div>
              </button>
              
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {scanning ? t('scanning') : (scanType === 'abha' ? 'Scan ABHA QR Code' : t('scanAadhaar'))}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {scanning ? t('holdSteady') : t('clickToSimulate')}
              </p>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-success">
              <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('identityVerified')}</h3>
              <p className="text-success/80">{t('proceeding')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <button onClick={skipVerification} className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-slate-800 dark:hover:decoration-white transition-all">
          {t('skipVerification')}
        </button>
      </div>
    </motion.div>
  );
}
