'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Monitor, ArrowRight } from 'lucide-react';

const DEPARTMENTS = [
  { id: 'GEN', name: 'General Medicine', current: 42, counter: 1 },
  { id: 'PED', name: 'Pediatrics', current: 18, counter: 3 },
  { id: 'ORT', name: 'Orthopedics', current: 25, counter: 2 },
  { id: 'EYE', name: 'Ophthalmology', current: 9, counter: 5 },
  { id: 'ENT', name: 'ENT', current: 14, counter: 4 },
  { id: 'GYN', name: 'Gynecology', current: 31, counter: 6 },
];

export default function TVScreen() {
  const [time, setTime] = useState('');
  const [announcement, setAnnouncement] = useState(null);
  const [departments, setDepartments] = useState(DEPARTMENTS);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * departments.length);
      setDepartments(prev => {
        const next = [...prev];
        next[randIdx].current += 1;
        setAnnouncement({
          dept: next[randIdx].name,
          token: next[randIdx].current,
          counter: next[randIdx].counter
        });
        setTimeout(() => setAnnouncement(null), 5000);
        return next;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [departments]);

  return (
    <div className="min-h-screen bg-[#050B14] text-white overflow-hidden flex flex-col font-sans">
      <header className="bg-gradient-to-r from-brand-900 to-[#0A1929] border-b border-brand-500/30 px-8 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-brand-500/20 border-2 border-brand-400/50 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(41,128,185,0.5)]">
            <Monitor className="w-8 h-8 text-brand-300" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">KARTAVYA LIVE QUEUE</h1>
            <p className="text-brand-300 text-lg font-medium tracking-wide">Rohilkhand Medical College & Hospital</p>
          </div>
        </div>
        <div className="text-right bg-black/40 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-md">
          <p className="text-4xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">{time}</p>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-3 gap-8 relative">
        <AnimatePresence>
          {announcement && (
            <motion.div initial={{ opacity: 0, y: -50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl bg-gradient-to-br from-brand-600 to-accent-700 border-4 border-white/20 rounded-[3rem] p-12 text-center shadow-[0_0_100px_rgba(41,128,185,0.6)] z-50 overflow-hidden">
              <Volume2 className="w-24 h-24 text-white/90 mx-auto mb-6 animate-pulse" />
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">TOKEN NO. <span className="text-7xl text-yellow-300">{announcement.token}</span></h2>
              <div className="flex items-center justify-center gap-6 text-4xl font-semibold text-white/90 mb-4">
                <span>{announcement.dept}</span>
                <ArrowRight className="w-10 h-10" />
                <span className="bg-white text-brand-900 px-6 py-2 rounded-2xl font-bold">Counter {announcement.counter}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {departments.map((dept, i) => (
          <div key={dept.id} className="bg-[#0A1929] border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-bl-full blur-2xl" />
            <h3 className="text-3xl font-bold text-slate-300 mb-6 truncate">{dept.name}</h3>
            
            <div className="flex items-end justify-between mt-auto">
              <div>
                <p className="text-slate-500 text-lg uppercase font-bold tracking-widest mb-1">Serving Token</p>
                <div className="text-7xl font-bold font-mono text-brand-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  {dept.current}
                </div>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm uppercase font-bold tracking-widest mb-1">Counter</p>
                <div className="text-5xl font-bold text-white bg-white/10 px-6 py-2 rounded-2xl">
                  {dept.counter}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-brand-600 py-3 overflow-hidden whitespace-nowrap relative border-t border-brand-400/50">
        <div className="animate-marquee inline-block text-2xl font-semibold text-white tracking-wide">
          <span className="mx-8">•</span> Please keep your OPD slip ready
          <span className="mx-8">•</span> Do not leave the waiting area when your token is near
          <span className="mx-8">•</span> Keep silence in the hospital premises
          <span className="mx-8">•</span> Masks are recommended
          <span className="mx-8">•</span> Self-service Kiosk available at reception for fast registration
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}