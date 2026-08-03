'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Zap, ShieldCheck } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('suntech_preloader_seen');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('suntech_preloader_seen', 'true');
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090D16] text-white overflow-hidden select-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative mb-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-amber-400/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-56 h-56 rounded-full border border-emerald-500/20"
            />

            <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 p-0.5 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
              <div className="w-full h-full bg-[#0B1329] rounded-[22px] flex items-center justify-center">
                <Sun className="w-12 h-12 text-amber-400 animate-spin-slow" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider bg-gradient-to-r from-white via-emerald-300 to-amber-400 bg-clip-text text-transparent">
              AUTHORITY SUNTECH
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80 mt-1 font-medium">
              NEXT-GEN RENEWABLE ENERGY
            </p>
          </motion.div>

          <div className="mt-8 flex gap-2 items-center">
            {[1, 2, 3, 4].map((panel) => (
              <motion.div
                key={panel}
                animate={{
                  backgroundColor: progress >= panel * 25 ? ['#1E293B', '#10B981', '#F59E0B'] : '#1E293B',
                  borderColor: progress >= panel * 25 ? '#34D399' : '#334155',
                }}
                transition={{ duration: 0.5 }}
                className="w-12 h-8 rounded border bg-slate-800/80 flex items-center justify-center shadow-inner relative overflow-hidden"
              >
                <div className="w-full h-[1px] bg-slate-700/50 absolute top-1/2" />
                <div className="h-full w-[1px] bg-slate-700/50 absolute left-1/2" />
                <Zap
                  className={`w-3.5 h-3.5 z-10 transition-colors duration-300 ${
                    progress >= panel * 25 ? 'text-amber-300' : 'text-slate-600'
                  }`}
                />
              </motion.div>
            ))}
          </div>

          <div className="w-72 mt-8 space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Powering Your Future...
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
