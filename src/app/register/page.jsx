'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRegistration } from '@/context/RegistrationContext';
import PatientDetails from '@/screens/PatientDetails';
import AadhaarVerification from '@/screens/AadhaarVerification';
import DepartmentSelection from '@/screens/DepartmentSelection';
import Confirmation from '@/screens/Confirmation';
import RegistrationSuccess from '@/screens/RegistrationSuccess';
import OPDSlip from '@/screens/OPDSlip';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import KioskLayout from '@/components/KioskLayout';
import ProgressBar from '@/components/ProgressBar';

const steps = [
  DepartmentSelection,
  PatientDetails,
  AadhaarVerification,
  Confirmation,
  RegistrationSuccess,
  OPDSlip,
];

function RegisterContent() {
  const { step, setMode } = useRegistration();
  const searchParams = useSearchParams();
  const isKiosk = searchParams.get('kiosk') === 'true';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode(isKiosk ? 'kiosk' : 'online');
  }, [isKiosk, setMode]);

  if (!mounted) return null;

  const StepComponent = steps[step] || PatientDetails;

  const content = (
    <div className={`${isKiosk ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-6 py-12`}>
      {step < 4 && (
        <div className="mb-12">
          <ProgressBar currentStep={step} isKiosk={isKiosk} />
        </div>
      )}
      <div className={`${isKiosk ? 'glass-card p-12 shadow-2xl' : ''}`}>
        <StepComponent isKiosk={isKiosk} />
      </div>
    </div>
  );

  if (isKiosk) {
    return <KioskLayout>{content}</KioskLayout>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 no-print sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white overflow-hidden shadow-sm flex items-center justify-center">
              <img src="/logo.jfif" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-brand dark:text-brand-300 text-sm tracking-tight">KARTAVYA</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">OPD Registration</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-400 hidden sm:block">Rohilkhand Medical College and Hospital</p>
          </div>
        </div>
      </header>

      <main className="pb-12 relative z-10">
        {content}
      </main>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
