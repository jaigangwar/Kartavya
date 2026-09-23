'use client';

import { useRegistration } from '@/context/RegistrationContext';
import { useLanguage } from '@/context/LanguageContext';
import FormField from '@/components/FormField';
import BubbleSelector from '@/components/BubbleSelector';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export default function PatientDetails() {
  const { data, updateData, nextStep } = useRegistration();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      
      {/* ─── Instructions ─── */}
      <div className="mb-6 p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-start gap-3">
        <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <p className="text-sm text-brand-700 font-medium leading-relaxed">
          {t('formInstructions')}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">{t('patientDetails')}</h2>
        <p className="text-slate-600 dark:text-slate-400">{t('patientDetailsSub')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormField label={t('patientName')} value={data.patientName} onChange={(e) => updateData('patientName', e.target.value)} required />
          </div>
          <div className="md:col-span-2">
            <FormField label={t('fatherName')} value={data.fatherName} onChange={(e) => updateData('fatherName', e.target.value)} required />
          </div>
          <FormField label={t('age')} type="number" value={data.age} onChange={(e) => updateData('age', e.target.value)} min="1" max="120" required />
          <BubbleSelector
            label={t('sex')}
            options={[
              { value: 'Male', label: t('male') },
              { value: 'Female', label: t('female') },
            ]}
            value={data.sex}
            onChange={(val) => updateData('sex', val)}
          />
          <div className="md:col-span-2">
            <FormField label={t('address')} value={data.address} onChange={(e) => updateData('address', e.target.value)} required />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/10">
          <h3 className="text-lg font-heading font-semibold text-slate-800 dark:text-slate-200 mb-6">{t('contactDetails')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label={t('mobile')} type="tel" value={data.mobile} onChange={(e) => updateData('mobile', e.target.value)} pattern="[0-9]{10}" placeholder="10-digit number" required />
            <FormField label={t('email')} type="email" value={data.email} onChange={(e) => updateData('email', e.target.value)} placeholder="name@example.com" />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full text-lg py-4">
          {t('continue')}
        </button>
      </form>
    </motion.div>
  );
}
