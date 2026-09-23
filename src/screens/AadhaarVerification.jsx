'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import { useLanguage } from '@/context/LanguageContext';
import { Fingerprint, CheckCircle2, ScanFace, ChevronLeft, Info, Camera } from 'lucide-react';

export default function AadhaarVerification({ isKiosk }) {
  const { updateData, nextStep, prevStep } = useRegistration();
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [stage, setStage] = useState('aadhaar'); // aadhaar -> face -> abha
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;
    if (stage === 'face') {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(s => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => console.warn('Webcam not available:', err));
    }
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [stage]);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      if (stage === 'aadhaar') {
        setStage('face');
      } else if (stage === 'face') {
        setStage('abha');
      } else if (stage === 'abha') {
        setVerified(true);
        updateData('aadhaarVerified', true);
        setTimeout(() => nextStep(), 1500);
      }
    }, 2500);
  };

  const skipCurrentStage = () => {
    if (stage === 'aadhaar' || stage === 'face') {
      // User skips compulsory stages? Fallback to next step without verification
      updateData('aadhaarVerified', false);
      nextStep();
    } else if (stage === 'abha') {
      setVerified(true);
      updateData('aadhaarVerified', true); // They verified aadhaar & face, so it's true
      setTimeout(() => nextStep(), 1000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      
      {/* ─── Instructions ─── */}
      <div className="mb-6 p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <p className="text-sm text-brand-700 font-medium leading-relaxed">
          {stage === 'aadhaar' && "Please verify your Aadhaar using the biometric scanner."}
          {stage === 'face' && "Face Verification is mandatory. Please look into the camera."}
          {stage === 'abha' && "Optional: Link your ABHA (Health ID) account."}
        </p>
      </div>

      <div className="mb-8">
        <button onClick={prevStep} className={`${isKiosk ? 'text-lg mb-6' : 'text-sm mb-4'} font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors`}>
          <ChevronLeft className={isKiosk ? 'w-5 h-5' : 'w-4 h-4'} /> {t('back')}
        </button>
        <h2 className={`${isKiosk ? 'text-4xl mb-4' : 'text-3xl mb-2'} font-heading font-bold text-slate-900 dark:text-white`}>
          {stage === 'aadhaar' ? 'Aadhaar Verification' : stage === 'face' ? 'Face Verification' : 'ABHA Verification'}
        </h2>
        <p className={`${isKiosk ? 'text-xl' : ''} text-slate-600 dark:text-slate-400`}>
          Step {stage === 'aadhaar' ? '1' : stage === 'face' ? '2' : '3'} of 3
        </p>
      </div>

      <div className={`card border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 flex flex-col items-center justify-center relative overflow-hidden group ${isKiosk ? 'min-h-[450px]' : 'min-h-[400px]'}`}>
        
        {scanning && (
          <div className={`absolute inset-0 pointer-events-none ${stage === 'abha' ? 'bg-emerald-500/5' : stage === 'face' ? 'bg-purple-500/5' : 'bg-brand/5'}`}>
            <div className={`absolute w-full h-1 shadow-[0_0_15px_rgba(0,0,0,0.5)] animate-scan-line ${stage === 'abha' ? 'bg-emerald-500' : stage === 'face' ? 'bg-purple-500' : 'bg-brand-500'}`} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.div key={stage} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="text-center relative z-10 w-full">
              
              <button
                onClick={handleScan}
                disabled={scanning}
                className={`mx-auto flex items-center justify-center mb-6 
                transition-all duration-300 group disabled:opacity-80
                border-4 border-transparent 
                ${stage === 'face' ? 'w-64 h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:shadow-purple-500/20 hover:border-purple-500/30 overflow-hidden relative' : 
                `w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 hover:shadow-2xl ${stage === 'abha' ? 'hover:shadow-emerald-500/20 hover:border-emerald-500/30' : 'hover:shadow-brand-500/20 hover:border-brand-500/30'}`}`}
              >
                {stage === 'face' ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
                    <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
                    
                    {/* Camera Bracket corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-lg opacity-90 z-10" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-lg opacity-90 z-10" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-lg opacity-90 z-10" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg opacity-90 z-10" />
                    
                    {!scanning && <Camera className="w-12 h-12 text-white/50 z-10 group-hover:scale-110 transition-transform" />}
                    
                    {scanning && (
                      <div className="absolute top-0 left-0 w-full h-2 bg-purple-500 shadow-[0_0_20px_#a855f7] animate-scan-line z-20" />
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <Fingerprint className={`w-16 h-16 transition-all duration-500 ${stage === 'abha' ? 'text-emerald-500' : 'text-brand-500'} ${scanning ? 'animate-spin-slow scale-110' : 'group-hover:scale-110'}`} />
                    {scanning && (
                      <div className={`absolute inset-0 border-4 rounded-full animate-ripple border-t-transparent ${stage === 'abha' ? 'border-emerald-500' : 'border-brand-500'}`} />
                    )}
                  </div>
                )}
              </button>
              
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                {scanning ? 'Scanning...' : stage === 'abha' ? 'Scan ABHA QR Code' : stage === 'face' ? 'Click to Capture Face' : 'Place Thumb on Scanner'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {scanning ? 'Please hold steady...' : 'Click the scanner to simulate'}
              </p>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center text-success">
              <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">All Verifications Complete!</h3>
              <p className="text-success/80">Proceeding to review...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 text-center">
        <button onClick={skipCurrentStage} className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white underline underline-offset-4 transition-all">
          {stage === 'abha' ? 'Skip ABHA Linking (Optional)' : 'Skip Verification'}
        </button>
      </div>
    </motion.div>
  );
}
