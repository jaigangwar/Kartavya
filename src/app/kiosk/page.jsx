'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Sparkles, HeartPulse, Stethoscope, Microscope, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function FloatingIcons() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const icons = [
    { Icon: HeartPulse, top: '25%', left: '15%', color: 'text-brand-400', delay: 0 },
    { Icon: Activity, top: '20%', right: '20%', color: 'text-accent', delay: 1 },
    { Icon: Stethoscope, bottom: '30%', left: '20%', color: 'text-blue-400', delay: 2 },
    { Icon: Microscope, bottom: '35%', right: '15%', color: 'text-emerald-400', delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, i) => (
        <motion.div key={i}
          className={`absolute ${item.color} opacity-20`}
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{ y: [0, -40, 0], rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          <item.Icon size={64} />
        </motion.div>
      ))}
    </div>
  );
}

export default function KioskStart() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
      <FloatingIcons />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        className="text-center max-w-3xl relative z-10">
        
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 bg-brand-500/30 blur-[40px] rounded-full scale-150 animate-pulse-gentle" />
          <div className="relative w-32 h-32 rounded-3xl bg-white flex items-center justify-center shadow-[0_0_40px_rgba(41,128,185,0.4)] animate-float overflow-hidden border border-slate-200 dark:border-slate-700">
            <img src="/logo.jfif" alt="Kartavya Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <h2 className="font-heading text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 drop-shadow-sm">
          {t('kioskWelcome')}
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12">
          {t('kioskSub')}
        </p>

        <div className="relative inline-block w-full max-w-md mt-6">
          <div className="absolute inset-0 bg-brand-500/30 blur-[25px] rounded-full animate-pulse-gentle" />
          <button onClick={() => router.push('/register?kiosk=true')}
            className="btn-primary-lg text-2xl px-12 py-6 w-full shadow-[0_10px_40px_rgba(41,128,185,0.4)] hover:shadow-[0_15px_50px_rgba(41,128,185,0.6)] group overflow-hidden relative">
            <span className="relative z-10 flex items-center justify-center gap-4 font-bold tracking-wide">
              <Sparkles className="w-8 h-8 animate-pulse text-white" />
              {t('tapToStart')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
