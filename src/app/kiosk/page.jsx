'use client';

import { useEffect, useState } from 'react';
import { useRegistration } from '@/context/RegistrationContext';
import KioskLayout from '@/components/KioskLayout';
import PatientDetails from '@/screens/PatientDetails';
import AadhaarVerification from '@/screens/AadhaarVerification';
import DepartmentSelection from '@/screens/DepartmentSelection';
import Confirmation from '@/screens/Confirmation';
import RegistrationSuccess from '@/screens/RegistrationSuccess';
import OPDSlip from '@/screens/OPDSlip';
import { Shield, ArrowRight, Hand } from 'lucide-react';

const steps = [
  PatientDetails,
  AadhaarVerification,
  DepartmentSelection,
  Confirmation,
  RegistrationSuccess,
  OPDSlip,
];

function KioskWelcome({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
      <div className="w-24 h-24 rounded-2xl bg-brand/10 flex items-center justify-center mb-8">
        <Shield className="w-14 h-14 text-brand" />
      </div>

      <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
        Welcome to <span className="text-brand">KARTAVYA</span>
      </h1>

      <p className="text-xl text-slate-500 mb-2">
        Rohilkhand Medical College and Hospital
      </p>

      <p className="text-lg text-slate-400 mb-10 max-w-lg">
        Register for your OPD appointment in just a few simple steps. No paperwork needed.
      </p>

      <button
        onClick={onStart}
        className="btn-primary-lg text-xl px-12 py-5 rounded-2xl shadow-lg shadow-brand/20"
      >
        <Hand className="w-6 h-6" />
        Tap to Start Registration
      </button>

      <p className="text-sm text-slate-400 mt-8">
        Touch the screen to begin • Takes less than 2 minutes
      </p>
    </div>
  );
}

export default function KioskPage() {
  const { step, setStep, setMode, resetRegistration } = useRegistration();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setMode('kiosk');
    resetRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    setStarted(true);
    setStep(0);
  };

  const StepComponent = steps[step] || PatientDetails;

  return (
    <KioskLayout>
      {!started ? (
        <KioskWelcome onStart={handleStart} />
      ) : (
        <StepComponent isKiosk={true} />
      )}
    </KioskLayout>
  );
}
