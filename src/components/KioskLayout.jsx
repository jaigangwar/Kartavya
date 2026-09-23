'use client';

import { Shield, Clock, Mic } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export default function KioskLayout({ children }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="kiosk-mode flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Decorative orbs */}
      <div className="orb w-96 h-96 bg-brand-500 top-0 -right-48" style={{ position: 'fixed' }} />
      <div className="orb w-80 h-80 bg-accent bottom-0 -left-40" style={{ position: 'fixed' }} />

      <header className="flex-shrink-0 glass border-b border-white/10 px-6 py-4 flex items-center justify-between relative z-10 bg-[length:200%_200%] animate-gradient-shift"
        style={{ background: 'linear-gradient(135deg, rgba(26,82,118,0.95), rgba(20,143,119,0.9), rgba(26,82,118,0.95))', backgroundSize: '200% 200%' }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-inner overflow-hidden border border-white/20">
            <img src="/logo.jfif" alt="Kartavya Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-white font-heading font-bold text-2xl tracking-tight drop-shadow-sm">KARTAVYA</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-white/80 text-sm font-medium">Self-Service Terminal Active</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-mono font-medium tracking-wide">{time}</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/20 border border-accent/30 text-white">
            <Mic className="w-4 h-4 text-accent-light animate-pulse" />
            <span className="text-sm font-medium">Voice Ready</span>
          </div>

          <div className="h-8 w-px bg-white/20 mx-2" />

          <LanguageToggle />
          <ThemeToggle />
          
          <div className="text-right ml-2">
            <p className="text-white font-semibold text-sm drop-shadow-sm">Rohilkhand Medical College</p>
            <p className="text-white/70 text-xs tracking-wide">& Hospital</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative">{children}</main>

      <footer className="flex-shrink-0 glass border-t border-white/10 dark:border-white/5 px-6 py-3 flex items-center justify-between relative z-10">
        <p className="text-xs text-slate-400 dark:text-slate-600">Powered by KARTAVYA</p>
        <p className="text-xs text-slate-400 dark:text-slate-600">Need help? Ask at the reception desk.</p>
      </footer>
    </div>
  );
}
