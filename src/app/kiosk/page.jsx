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
        
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand to-accent flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand/20 animate-float">
          <Shield className="w-12 h-12 text-white" />
        </div>

        <h2 className="font-heading text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 drop-shadow-sm">
          {t('kioskWelcome')}
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12">
          {t('kioskSub')}
        </p>

        <button onClick={() => router.push('/register?kiosk=true')}
          className="btn-primary-lg text-2xl px-12 py-6 w-full max-w-md shadow-2xl shadow-brand/30 hover:shadow-brand/50 group overflow-hidden relative">
          <span className="relative z-10 flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 animate-pulse-gentle" />
            {t('tapToStart')}
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
      </motion.div>
    </div>
  );
}
