'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import { useLanguage } from '@/context/LanguageContext';
import ProgressBar from '@/components/ProgressBar';
import { departments, suggestDepartment } from '@/utils/symptomMapping';
import { ArrowRight, ArrowLeft, Search, Sparkles, CheckCircle2, Building2, Brain, Mic } from 'lucide-react';

export default function DepartmentSelection({ isKiosk = false }) {
  const { data, updateData, nextStep, prevStep, step } = useRegistration();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return departments;
    return departments.filter((d) => d.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const suggestion = useMemo(() => suggestDepartment(data.symptoms), [data.symptoms]);

  const handleSelectDepartment = (dept) => { updateData('department', dept); setShowSymptoms(false); };
  const handleUseSuggestion = () => { if (suggestion) updateData('department', suggestion); };
  const handleNext = () => { if (data.department) nextStep(); };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Can be dynamic based on LanguageContext
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      updateData('symptoms', (data.symptoms ? data.symptoms + ' ' : '') + transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const cls = isKiosk ? 'max-w-2xl mx-auto px-6 py-8' : 'max-w-2xl mx-auto px-4 sm:px-6 py-6';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className={cls}>
        <div className="mb-8">
          <h2 className={`font-heading font-bold text-slate-900 dark:text-white ${isKiosk ? 'text-3xl' : 'text-2xl'}`}>{t('whereToGo')}</h2>
          <p className={`text-slate-500 dark:text-slate-400 mt-1 ${isKiosk ? 'text-base' : 'text-sm'}`}>{t('whereToGoSub')}</p>
        </div>

        {/* ML Feature Highlight & Symptom Input (Now First) */}
        <div className="glass-card p-5 md:p-6 mb-5 border-2 border-accent/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-slate-900 dark:text-white">AI Department Routing</h4>
              <p className="text-xs text-slate-500">Describe your symptoms via text or voice.</p>
            </div>
          </div>

          <div className="relative">
            <textarea value={data.symptoms} onChange={(e) => updateData('symptoms', e.target.value)}
              placeholder={t('describeSymptomsPlaceholder')} rows={3}
              className={`${isKiosk ? 'glass-input-lg pr-16' : 'glass-input pr-12'} resize-none`} />
            <button onClick={startListening} title="Speak symptoms"
              className={`absolute right-3 top-3 p-2 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-500 hover:bg-brand/10 hover:text-brand dark:bg-slate-800 dark:text-slate-400'}`}>
              <Mic className={isKiosk ? 'w-6 h-6' : 'w-5 h-5'} />
            </button>
          </div>

          <AnimatePresence>
            {data.symptoms.length > 2 && suggestion && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 flex items-center justify-between glass rounded-xl p-4 border-2 border-accent/40 bg-accent/5">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <p className="text-xs text-accent font-semibold">{t('mlSuggestedDept')}</p>
                  </div>
                  <p className="font-heading font-bold text-brand dark:text-brand-300">{suggestion}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleUseSuggestion} className="btn-primary text-sm py-2 px-4">
                  {t('useSuggestion')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">OR SELECT MANUALLY</span>
          <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
        </div>

        {/* Department List */}
        <div className="glass-card p-5 md:p-6 mb-5">
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchDept')} className={`${isKiosk ? 'glass-input-lg pl-11' : 'glass-input pl-11'}`} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
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
          {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-8">{t('noDeptMatch')}</p>}
        </div>

        {data.department && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            className="mt-5 flex items-center gap-2 text-success">
            <CheckCircle2 className="w-5 h-5" />
            <span className={`font-medium ${isKiosk ? 'text-base' : 'text-sm'}`}>{t('selectedDept')}: {data.department}</span>
          </motion.div>
        )}

        <div className={`flex justify-between mt-8`}>
          {step > 0 ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={prevStep} className={isKiosk ? 'btn-ghost text-lg' : 'btn-ghost'}>
              <ArrowLeft className="w-5 h-5" /> {t('back')}
            </motion.button>
          ) : (
            <div />
          )}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleNext} disabled={!data.department} className={isKiosk ? 'btn-primary-lg' : 'btn-primary'}>
            {t('continue')} <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
