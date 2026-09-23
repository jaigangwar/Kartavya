'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import ProgressBar from '@/components/ProgressBar';
import { departments, suggestDepartment } from '@/utils/symptomMapping';
import { ArrowRight, ArrowLeft, Search, Sparkles, CheckCircle2, Building2, Brain } from 'lucide-react';

export default function DepartmentSelection({ isKiosk = false }) {
  const { data, updateData, nextStep, prevStep } = useRegistration();
  const [search, setSearch] = useState('');
  const [showSymptoms, setShowSymptoms] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return departments;
    return departments.filter((d) => d.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const suggestion = useMemo(() => suggestDepartment(data.symptoms), [data.symptoms]);

  const handleSelectDepartment = (dept) => { updateData('department', dept); setShowSymptoms(false); };
  const handleUseSuggestion = () => { if (suggestion) updateData('department', suggestion); };
  const handleNext = () => { if (data.department) nextStep(); };

  const cls = isKiosk ? 'max-w-2xl mx-auto px-6 py-8' : 'max-w-2xl mx-auto px-4 sm:px-6 py-6';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <ProgressBar currentStep={2} isKiosk={isKiosk} />
      <div className={cls}>
        <div className="mb-8">
          <h2 className={`font-heading font-bold text-slate-900 dark:text-white ${isKiosk ? 'text-3xl' : 'text-2xl'}`}>Where would you like to go?</h2>
          <p className={`text-slate-500 dark:text-slate-400 mt-1 ${isKiosk ? 'text-base' : 'text-sm'}`}>Select your department or describe your problem.</p>
        </div>

        {/* ML Feature Highlight */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="mb-5 glass-card p-4 border-2 border-accent/20 dark:border-accent/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center flex-shrink-0 shadow-lg animate-float-slow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">AI-Powered Department Suggestion</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">ML ENGINE</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Don&apos;t know which department? Describe your symptoms and our ML model will suggest the right department automatically.</p>
            </div>
          </div>
        </motion.div>

        {/* Department List */}
        <div className="glass-card p-5 md:p-6 mb-5">
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments..." className={`${isKiosk ? 'glass-input-lg pl-11' : 'glass-input pl-11'}`} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
            {filtered.map((dept, i) => {
              const isSelected = data.department === dept;
              return (
                <motion.button key={dept} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectDepartment(dept)}
                  className={`flex items-center gap-3 text-left rounded-xl border-2 transition-all duration-300
                    ${isKiosk ? 'px-5 py-4' : 'px-4 py-3'}
                    ${isSelected
                      ? 'border-brand bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-300 shadow-lg shadow-brand/10'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'}`}>
                  <Building2 className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-brand' : 'text-slate-400'}`} />
                  <span className={`font-medium ${isKiosk ? 'text-base' : 'text-sm'}`}>{dept}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto text-brand" />}
                </motion.button>
              );
            })}
          </div>
          {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No departments match your search.</p>}
        </div>

        {/* Symptom Section */}
        <div className="glass-card p-5 md:p-6">
          <motion.button whileHover={{ x: 4 }} onClick={() => setShowSymptoms(!showSymptoms)}
            className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors w-full">
            <Sparkles className="w-5 h-5" />
            <span className={`font-medium ${isKiosk ? 'text-base' : 'text-sm'}`}>Don&apos;t know the department? Describe your problem</span>
          </motion.button>

          <AnimatePresence>
            {showSymptoms && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <div className="mt-4">
                  <textarea value={data.symptoms} onChange={(e) => updateData('symptoms', e.target.value)}
                    placeholder="Describe your symptoms or health problem..." rows={3}
                    className={`${isKiosk ? 'glass-input-lg' : 'glass-input'} resize-none`} />

                  <AnimatePresence>
                    {data.symptoms.length > 2 && suggestion && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-4 flex items-center justify-between glass rounded-xl p-4 border-2 border-accent/20">
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <p className="text-xs text-accent font-semibold">ML Suggested Department</p>
                          </div>
                          <p className="font-heading font-bold text-brand dark:text-brand-300">{suggestion}</p>
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={handleUseSuggestion} className="btn-primary text-sm py-2 px-4">
                          Use Suggestion
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {data.department && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="mt-5 flex items-center gap-2 text-success">
            <CheckCircle2 className="w-5 h-5" />
            <span className={`font-medium ${isKiosk ? 'text-base' : 'text-sm'}`}>Selected: {data.department}</span>
          </motion.div>
        )}

        <div className={`flex justify-between mt-8`}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={prevStep} className={isKiosk ? 'btn-ghost text-lg' : 'btn-ghost'}>
            <ArrowLeft className="w-5 h-5" /> Back
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleNext} disabled={!data.department} className={isKiosk ? 'btn-primary-lg' : 'btn-primary'}>
            Continue <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
