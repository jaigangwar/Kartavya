'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import ProgressBar from '@/components/ProgressBar';
import { ArrowRight, ArrowLeft, ScanLine, ShieldCheck, Loader2, CheckCircle2, Fingerprint } from 'lucide-react';

const STAGES = [
  { label: 'Ready to Scan', duration: 0 },
  { label: 'Scanning...', duration: 1800 },
  { label: 'Document Detected', duration: 1200 },
  { label: 'Verifying Identity...', duration: 1500 },
  { label: 'Identity Verified Successfully', duration: 0 },
];

export default function AadhaarVerification({ isKiosk = false }) {
  const { data, updateData, nextStep, prevStep } = useRegistration();
  const [stage, setStage] = useState(data.aadhaarVerified ? 4 : 0);
  const [isScanning, setIsScanning] = useState(false);

  const runScan = useCallback(async () => {
    setIsScanning(true);
    for (let i = 1; i <= 4; i++) {
      setStage(i);
      if (STAGES[i].duration > 0) await new Promise((r) => setTimeout(r, STAGES[i].duration));
    }
    updateData('aadhaarVerified', true);
    setIsScanning(false);
  }, [updateData]);

  const isVerified = stage === 4;
  const cls = isKiosk ? 'max-w-2xl mx-auto px-6 py-8' : 'max-w-2xl mx-auto px-4 sm:px-6 py-6';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <ProgressBar currentStep={1} isKiosk={isKiosk} />
      <div className={cls}>
        <div className="mb-8">
          <h2 className={`font-heading font-bold text-slate-900 dark:text-white ${isKiosk ? 'text-3xl' : 'text-2xl'}`}>Verify Your Identity</h2>
          <p className={`text-slate-500 dark:text-slate-400 mt-1 ${isKiosk ? 'text-base' : 'text-sm'}`}>Quick identity verification using your Aadhaar card.</p>
        </div>

        <div className="glass-card overflow-hidden">
          <div className={`relative flex flex-col items-center justify-center ${isKiosk ? 'py-16' : 'py-12'}
            ${isVerified ? '' : 'bg-gradient-to-b from-brand-50/50 to-transparent dark:from-brand-900/20 dark:to-transparent'}`}>

            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center">
                  {/* Scan frame */}
                  <div className="relative w-72 h-44 border-2 border-dashed border-brand/30 dark:border-brand/20 rounded-2xl flex items-center justify-center glass mb-6">
                    {isScanning && (
                      <>
                        <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent rounded animate-scan-line" />
                        <div className="absolute inset-0 rounded-2xl animate-ripple" style={{ border: '2px solid rgba(41,128,185,0.2)' }} />
                      </>
                    )}
                    <div className="text-center relative z-10">
                      <motion.div animate={isScanning ? { rotateY: [0, 180, 360] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                        <Fingerprint className={`w-12 h-12 mx-auto mb-2 ${isScanning ? 'text-brand animate-pulse-gentle' : 'text-slate-300 dark:text-slate-600'}`} />
                      </motion.div>
                      <p className={`text-sm font-medium ${isScanning ? 'text-brand dark:text-brand-400' : 'text-slate-400'}`}>
                        {isScanning ? STAGES[stage].label : 'Aadhaar Card'}
                      </p>
                    </div>
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand rounded-br-xl" />
                  </div>
                  <p className={`text-slate-500 dark:text-slate-400 mb-6 ${isKiosk ? 'text-base' : 'text-sm'}`}>Place your Aadhaar card inside the scanning area.</p>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={runScan} disabled={isScanning} className={isKiosk ? 'btn-primary-lg' : 'btn-primary'}>
                    {isScanning ? <><Loader2 className="w-5 h-5 animate-spin" />{STAGES[stage].label}</> : <><ScanLine className="w-5 h-5" />Scan Aadhaar</>}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="verified" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-center">
                  <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-success/30">
                    <ShieldCheck className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className={`font-heading font-bold text-slate-900 dark:text-white mb-1 ${isKiosk ? 'text-2xl' : 'text-xl'}`}>
                    Identity Verified Successfully
                  </h3>
                  <p className="text-success font-medium text-sm flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Aadhaar Verification Complete
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-6 py-3 bg-amber-50/80 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/30">
            <p className="text-xs text-amber-700 dark:text-amber-400 text-center">
              ⚠️ Demo verification only. No real Aadhaar data is captured, processed, or stored.
            </p>
          </div>
        </div>

        <div className={`flex justify-between mt-8`}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={prevStep} className={isKiosk ? 'btn-ghost text-lg' : 'btn-ghost'}>
            <ArrowLeft className="w-5 h-5" /> Back
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={nextStep} disabled={!isVerified} className={isKiosk ? 'btn-primary-lg' : 'btn-primary'}>
            Continue <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
