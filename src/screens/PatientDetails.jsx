'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import ProgressBar from '@/components/ProgressBar';
import FormField from '@/components/FormField';
import { ArrowRight, Calendar } from 'lucide-react';

export default function PatientDetails({ isKiosk = false }) {
  const { data, updateData, nextStep } = useRegistration();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const e = {};
    if (!data.patientName.trim()) e.patientName = 'Patient name is required';
    if (!data.age || data.age < 0 || data.age > 150) e.age = 'Valid age required';
    if (!data.sex) e.sex = 'Please select sex';
    if (data.sex === 'Female' && !data.maritalStatus) e.maritalStatus = 'Please select marital status';
    if (!data.fatherName.trim()) e.fatherName = 'Father / Guardian name is required';
    if (!data.address.trim()) e.address = 'Address is required';
    if (!data.mobile || !/^\d{10}$/.test(data.mobile)) e.mobile = 'Valid 10-digit mobile required';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required';
    return e;
  };

  const handleNext = () => {
    const e = validate();
    setErrors(e);
    setTouched({ patientName: true, age: true, sex: true, maritalStatus: true, fatherName: true, address: true, mobile: true, email: true });
    if (Object.keys(e).length === 0) nextStep();
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate()[field] || '' }));
  };

  const cls = isKiosk ? 'max-w-2xl mx-auto px-6 py-8' : 'max-w-2xl mx-auto px-4 sm:px-6 py-6';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <ProgressBar currentStep={0} isKiosk={isKiosk} />
      <div className={cls}>
        <div className="mb-8">
          <h2 className={`font-heading font-bold text-slate-900 dark:text-white ${isKiosk ? 'text-3xl' : 'text-2xl'}`}>Patient Details</h2>
          <p className={`text-slate-500 dark:text-slate-400 mt-1 ${isKiosk ? 'text-base' : 'text-sm'}`}>Please fill in the patient information below.</p>
        </div>

        <div className="glass-card p-6 md:p-8 space-y-5">
          <FormField label="Patient Name" value={data.patientName}
            onChange={(e) => updateData('patientName', e.target.value)}
            onBlur={() => handleBlur('patientName')}
            placeholder="Enter full name" required error={touched.patientName ? errors.patientName : ''} isKiosk={isKiosk} />

          <FormField label="Father's Name / Guardian Name" value={data.fatherName}
            onChange={(e) => updateData('fatherName', e.target.value)}
            onBlur={() => handleBlur('fatherName')}
            placeholder="Enter father's or guardian's name" required error={touched.fatherName ? errors.fatherName : ''} isKiosk={isKiosk} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Age" type="number" value={data.age}
              onChange={(e) => updateData('age', e.target.value)} onBlur={() => handleBlur('age')}
              placeholder="e.g. 34" required error={touched.age ? errors.age : ''} isKiosk={isKiosk} maxLength={3} />

            <FormField label="Sex" required error={touched.sex ? errors.sex : ''} isKiosk={isKiosk}>
              <div className={`flex gap-3 ${isKiosk ? 'mt-1' : ''}`}>
                {['Male', 'Female'].map((opt) => (
                  <motion.button key={opt} type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { updateData('sex', opt); if (opt === 'Male') updateData('maritalStatus', ''); }}
                    className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all duration-300
                      ${isKiosk ? 'text-lg py-4 rounded-2xl' : 'text-sm'}
                      ${data.sex === opt
                        ? 'border-brand bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-300 shadow-lg shadow-brand/10'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'}`}>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </FormField>
          </div>

          {data.sex === 'Female' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
              <FormField label="Marital Status" required error={touched.maritalStatus ? errors.maritalStatus : ''} isKiosk={isKiosk}>
                <div className="flex flex-wrap gap-2">
                  {['Single', 'Married', 'Divorced', 'Widowed', 'Prefer not to say'].map((opt) => (
                    <motion.button key={opt} type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => updateData('maritalStatus', opt)}
                      className={`px-4 py-2 rounded-xl border-2 font-medium transition-all duration-300
                        ${isKiosk ? 'text-base px-5 py-3 rounded-2xl' : 'text-sm'}
                        ${data.maritalStatus === opt
                          ? 'border-brand bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'}`}>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </FormField>
            </motion.div>
          )}

          <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
            <p className={`font-heading font-semibold text-slate-700 dark:text-slate-300 mb-4 ${isKiosk ? 'text-lg' : 'text-sm uppercase tracking-wide'}`}>Contact Details</p>
          </div>

          <FormField label="Mobile Number" type="tel" value={data.mobile}
            onChange={(e) => { const v = e.target.value.replace(/\D/g, '').slice(0, 10); updateData('mobile', v); }}
            onBlur={() => handleBlur('mobile')} placeholder="10-digit mobile number"
            required error={touched.mobile ? errors.mobile : ''} isKiosk={isKiosk} maxLength={10} />

          <FormField label="Email ID" type="email" value={data.email}
            onChange={(e) => updateData('email', e.target.value)} onBlur={() => handleBlur('email')}
            placeholder="email@example.com (optional)" error={touched.email ? errors.email : ''} isKiosk={isKiosk} />

          <FormField label="Address" value={data.address}
            onChange={(e) => updateData('address', e.target.value)} onBlur={() => handleBlur('address')}
            placeholder="Full address with city and state" required error={touched.address ? errors.address : ''} isKiosk={isKiosk} />

          <div>
            <label className={isKiosk ? 'label-lg' : 'label'}>Registration Date</label>
            <div className={`flex items-center gap-3 glass rounded-xl ${isKiosk ? 'px-5 py-4 rounded-2xl' : 'px-4 py-3'}`}>
              <Calendar className="w-5 h-5 text-brand dark:text-brand-400" />
              <span className={`text-slate-700 dark:text-slate-200 font-medium ${isKiosk ? 'text-lg' : ''}`}>{data.registrationDate}</span>
              <span className="text-xs text-slate-400 dark:text-slate-600 ml-auto">Auto-generated</span>
            </div>
          </div>
        </div>

        <div className={`flex justify-end mt-8 ${isKiosk ? 'gap-4' : 'gap-3'}`}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleNext} className={isKiosk ? 'btn-primary-lg' : 'btn-primary'}>
            Continue <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
