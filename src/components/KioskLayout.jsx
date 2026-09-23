'use client';

import { Shield } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export default function KioskLayout({ children }) {
  return (
    <div className="kiosk-mode flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Decorative orbs */}
      <div className="orb w-96 h-96 bg-brand-500 top-0 -right-48" style={{ position: 'fixed' }} />
      <div className="orb w-80 h-80 bg-accent bottom-0 -left-40" style={{ position: 'fixed' }} />

      <header className="flex-shrink-0 glass border-b border-white/10 px-6 py-4 flex items-center justify-between relative z-10"
        style={{ background: 'linear-gradient(135deg, rgba(26,82,118,0.95), rgba(20,143,119,0.9))' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-white font-heading font-bold text-xl tracking-tight">KARTAVYA</h1>
            <p className="text-white/60 text-xs">Self-Service Registration</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <div className="text-right">
            <p className="text-white/70 text-xs font-medium">Rohilkhand Medical College</p>
            <p className="text-white/50 text-xs">and Hospital</p>
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
