'use client';

import { motion } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import ProgressBar from '@/components/ProgressBar';
import { ArrowLeft, FileText, User, ShieldCheck, Building2, Pencil, MapPin } from 'lucide-react';

export default function Confirmation({ isKiosk = false }) {
  const { data, nextStep, setStep, genPatientId } = useRegistration();
  const handleGenerate = () => { genPatientId(); nextStep(); };
  const cls = isKiosk ? 'max-w-2xl mx-auto px-6 py-8' : 'max-w-2xl mx-auto px-4 sm:px-6 py-6';

  const rows = [
    { label: 'Patient Name', value: data.patientName },
    { label: "Father's / Guardian Name", value: data.fatherName },
    { label: 'Age', value: data.age },
    { label: 'Sex', value: data.sex },
    ...(data.sex === 'Female' && data.maritalStatus ? [{ label: 'Marital Status', value: data.maritalStatus }] : []),
    { label: 'Mobile Number', value: data.mobile },
    ...(data.email ? [{ label: 'Email', value: data.email }] : []),
    { label: 'Address', value: data.address },
    { label: 'Registration Date', value: data.registrationDate },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className={cls}>
        <div className="mb-8">
          <h2 className={`font-heading font-bold text-slate-900 dark:text-white ${isKiosk ? 'text-3xl' : 'text-2xl'}`}>Review Registration</h2>
          <p className={`text-slate-500 dark:text-slate-400 mt-1 ${isKiosk ? 'text-base' : 'text-sm'}`}>Verify your information before generating the OPD slip.</p>
        </div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-brand" />
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white">Patient Information</h3>
            </div>
            <div className="space-y-3">
              {rows.map((r) => (
                <div key={r.label} className="flex justify-between items-start py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <span className={`text-slate-500 dark:text-slate-400 ${isKiosk ? 'text-base' : 'text-sm'}`}>{r.label}</span>
                  <span className={`font-medium text-slate-900 dark:text-white text-right max-w-[60%] ${isKiosk ? 'text-base' : 'text-sm'}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-success" />
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white">Verification</h3>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-slate-500 dark:text-slate-400 ${isKiosk ? 'text-base' : 'text-sm'}`}>Aadhaar</span>
              <span className="inline-flex items-center gap-1.5 text-success font-medium text-sm bg-success/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-brand" />
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white">OPD Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50 dark:border-slate-800">
                <span className={`text-slate-500 dark:text-slate-400 ${isKiosk ? 'text-base' : 'text-sm'}`}>Department</span>
                <span className={`font-medium text-brand dark:text-brand-300 ${isKiosk ? 'text-base' : 'text-sm'}`}>{data.department}</span>
              </div>
              {data.symptoms && (
                <div className="py-1.5">
                  <span className={`text-slate-500 dark:text-slate-400 ${isKiosk ? 'text-base' : 'text-sm'}`}>Problem / Symptoms</span>
                  <p className={`mt-1 text-slate-700 dark:text-slate-300 ${isKiosk ? 'text-base' : 'text-sm'}`}>{data.symptoms}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className={`flex justify-between mt-8`}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setStep(0)} className={isKiosk ? 'btn-ghost text-lg' : 'btn-ghost'}>
            <Pencil className="w-4 h-4" /> Edit Details
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleGenerate} className={isKiosk ? 'btn-success px-8 py-4 text-lg rounded-2xl font-semibold' : 'btn-success'}>
            <FileText className="w-5 h-5" /> Generate OPD Slip
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
