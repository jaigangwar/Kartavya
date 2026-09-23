'use client';

import { useEffect } from 'react';
import { useRegistration } from '@/context/RegistrationContext';
import PatientDetails from '@/screens/PatientDetails';
import AadhaarVerification from '@/screens/AadhaarVerification';
import DepartmentSelection from '@/screens/DepartmentSelection';
import Confirmation from '@/screens/Confirmation';
import RegistrationSuccess from '@/screens/RegistrationSuccess';
import OPDSlip from '@/screens/OPDSlip';
import { Shield } from 'lucide-react';
import Link from 'next/link';

const steps = [
  PatientDetails,
  AadhaarVerification,
  DepartmentSelection,
  Confirmation,
  RegistrationSuccess,
  OPDSlip,
];

export default function RegisterPage() {
  const { step, setMode, resetRegistration } = useRegistration();

  useEffect(() => {
    setMode('online');
    resetRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StepComponent = steps[step] || PatientDetails;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 no-print">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-brand text-sm tracking-tight">KARTAVYA</h1>
              <p className="text-[10px] text-slate-500 -mt-0.5">OPD Registration</p>
            </div>
          </Link>
          <p className="text-xs text-slate-400 hidden sm:block">Rohilkhand Medical College and Hospital</p>
        </div>
      </header>

      {/* Step Content */}
      <main className="pb-12">
        <StepComponent isKiosk={false} />
      </main>
    </div>
  );
}
