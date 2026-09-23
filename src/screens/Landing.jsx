'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Clock, FileText, ArrowRight, Building2, Monitor, Tablet, Sparkles, Activity, HeartPulse, Stethoscope, Microscope } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useRef, useCallback, useEffect, useState } from 'react';

// ...
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

function Card3D({ children, className = '' }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px) scale(1.02)`;
  }, []);
  const handleLeave = useCallback(() => {
    const el = ref.current; if (el) el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
  }, []);
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

function FloatingIcons() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const icons = [
    { Icon: HeartPulse, top: '20%', left: '10%', color: 'text-brand-400', delay: 0 },
    { Icon: Activity, top: '15%', right: '15%', color: 'text-accent', delay: 1 },
    { Icon: Stethoscope, bottom: '25%', left: '15%', color: 'text-blue-400', delay: 2 },
    { Icon: Microscope, bottom: '30%', right: '10%', color: 'text-emerald-400', delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, i) => (
        <motion.div key={i}
          className={`absolute ${item.color} opacity-20 dark:opacity-10`}
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <item.Icon size={48} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Landing() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="orb w-[500px] h-[500px] bg-brand-500 -top-64 -right-64 fixed" />
      <div className="orb w-[400px] h-[400px] bg-accent fixed bottom-0 -left-48" />
      <div className="orb w-[300px] h-[300px] bg-brand-400 fixed top-1/2 left-1/3" />

      <FloatingIcons />

      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center shadow-lg shadow-brand/20">
              <Shield className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="font-heading font-bold text-brand dark:text-brand-300 text-lg tracking-tight">KARTAVYA</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 -mt-0.5">Digital OPD Registration</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Rohilkhand Medical College</p>
              <p className="text-xs text-slate-500 dark:text-slate-500">and Hospital</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-sm font-medium text-brand dark:text-brand-300 mb-8 border border-brand/20 shadow-md">
              <Building2 className="w-4 h-4" />
              Rohilkhand Medical College and Hospital
            </div>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-5 drop-shadow-sm">
            Simplifying Every{' '}
            <span className="bg-gradient-to-r from-brand via-brand-500 to-accent bg-clip-text text-transparent animate-gradient-shift">
              Patient Journey
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
            Register for your OPD appointment digitally. Skip the long queues, get your OPD slip instantly.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/register')} className="btn-primary-lg text-lg group overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-2">
                Register for OPD
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>
        </div>

        {/* 3D Floating Card */}
        <div className="flex justify-center pb-12 relative z-10">
          <Card3D>
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card p-8 max-w-sm mx-6 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent/10 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-accent flex items-center justify-center mx-auto mb-4 animate-float shadow-xl shadow-brand/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-1 relative z-10">AI-Powered Routing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 relative z-10">Describe your symptoms and get auto-assigned to the right department using our ML engine.</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-white px-3 py-1.5 rounded-full bg-gradient-to-r from-accent to-emerald-500 shadow-lg relative z-10 animate-pulse-gentle">
                <Sparkles className="w-3 h-3" /> ML-Powered Feature
              </div>
            </motion.div>
          </Card3D>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Clock, title: 'Fast Registration', desc: 'Complete OPD registration in under 2 minutes.', color: 'from-blue-500 to-brand' },
            { icon: FileText, title: 'Digital OPD Slip', desc: 'Receive your slip digitally — download or print.', color: 'from-brand to-accent' },
            { icon: Building2, title: 'Smart Department', desc: 'Choose department or describe symptoms for auto-routing.', color: 'from-accent to-emerald-500' },
            { icon: Shield, title: 'Secure & Verified', desc: 'Aadhaar-verified identity. Your data stays safe.', color: 'from-brand-500 to-brand-700' },
          ].map((f) => (
            <motion.div key={f.title} variants={fadeUp} transition={{ duration: 0.5 }}>
              <Card3D className="h-full">
                <div className="glass-card p-6 h-full border border-white/20 hover:border-brand/30 dark:hover:border-brand/50 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg animate-float-slow`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Registration Options */}
      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-12">
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            How would you like to register?
          </h3>
          <p className="text-slate-600 dark:text-slate-400">Choose the option that works best for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card3D className="h-full">
              <div className="glass-card p-8 h-full group border-2 border-transparent hover:border-brand/30 dark:hover:border-brand/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-500 flex items-center justify-center mb-5 shadow-lg shadow-brand/20 group-hover:shadow-brand/40 transition-shadow">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-heading text-xl font-semibold text-slate-900 dark:text-white mb-2">Register from Home</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                  Complete your OPD registration before visiting the hospital. Get your digital slip delivered instantly.
                </p>
                <button onClick={() => router.push('/register')} className="btn-primary w-full group/btn overflow-hidden relative">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Continue Online
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </Card3D>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Card3D className="h-full">
              <div className="glass-card p-8 h-full group border-2 border-transparent hover:border-accent/30 dark:hover:border-accent/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-emerald-500 flex items-center justify-center mb-5 shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
                  <Tablet className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-heading text-xl font-semibold text-slate-900 dark:text-white mb-2">Register at Hospital</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                  Use the self-service KARTAVYA tablet at the hospital reception. Walk up, fill details, get your slip.
                </p>
                <button onClick={() => router.push('/kiosk')} className="btn-secondary w-full group/btn relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Registration
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} KARTAVYA — Rohilkhand Medical College and Hospital
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Simplifying Every Patient Journey.</p>
        </div>
      </footer>
    </div>
  );
}
