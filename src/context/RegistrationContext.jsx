'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { generatePatientId } from '@/utils/generateId';

const RegistrationContext = createContext(null);

const initialData = {
  patientName: '',
  age: '',
  sex: '',
  maritalStatus: '',
  fatherName: '',
  address: '',
  mobile: '',
  email: '',
  registrationDate: '',
  aadhaarVerified: false,
  department: '',
  symptoms: '',
  patientId: '',
  doctorName: '',
};

const initialSlipData = {
  investigation: '',
  triagePriority: '',
  advice: '',
  followUpDay: '',
  followUpMonth: '',
};

function formatDate(date) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function RegistrationProvider({ children }) {
  const [data, setData] = useState({ ...initialData, registrationDate: formatDate(new Date()) });
  const [slipData, setSlipData] = useState({ ...initialSlipData });
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('');

  const updateData = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateSlipData = useCallback((field, value) => {
    setSlipData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => s + 1);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const genPatientId = useCallback(() => {
    const id = generatePatientId();
    setData((prev) => ({ ...prev, patientId: id }));
    return id;
  }, []);

  const resetRegistration = useCallback(() => {
    setData({ ...initialData, registrationDate: formatDate(new Date()) });
    setSlipData({ ...initialSlipData });
    setStep(0);
  }, []);

  return (
    <RegistrationContext.Provider
      value={{ data, slipData, step, mode, updateData, updateSlipData, setStep, setMode, nextStep, prevStep, genPatientId, resetRegistration }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider');
  return ctx;
}
