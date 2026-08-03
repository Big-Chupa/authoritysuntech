'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Alhaji Ibrahim Bello',
    role: 'Commercial Supermarket Owner',
    location: 'Tanke, Ilorin, Kwara State',
    content:
      'Authority SunTech installed a 15kVA Commercial Hybrid Solar System at our store along University Road, Tanke. We no longer buy fuel for our generator, and our cold rooms run non-stop. Outstanding customer service!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    system: '15kVA Commercial Solar System',
  },
  {
    id: '2',
    name: 'Mrs. Folashade Adeyemi',
    role: 'Residential Homeowner',
    location: 'GRA Ilorin, Kwara State',
    content:
      'I was tired of frequent power cuts in GRA. Authority SunTech delivered and set up our 10kVA Lithium storage system within 48 hours. Fast delivery, affordable pricing, and extremely polite engineers.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    system: '10kVA Smart Home System',
  },
  {
    id: '3',
    name: 'Dr. Abdulrahman Alabi',
    role: 'Clinic Medical Director',
    location: 'Taiwo Road, Ilorin, Kwara State',
    content:
      'Operating a healthcare facility on Taiwo Road requires 24/7 power for medical equipment. Authority SunTech provided us with high-grade Lithium batteries and hybrid inverters that never fail.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    system: '20kVA Hospital Backup Solar Kit',
  },
  {
    id: '4',
    name: 'Engr. Kayode Ogunleye',
    role: 'Factory Manager',
    location: 'Takie, Ogbomosho',
    content:
      'We sourced N-Type Monocrystalline panels directly from Authority SunTech for our facility in Ogbomosho. The energy yield is remarkable and their warranty guarantee gives us peace of mind.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    system: '600W N-Type Solar Array',
  },
  {
    id: '5',
    name: 'Chief Rasheed Mustapha',
    role: 'Hotel Proprietor',
    location: 'Fate, Ilorin, Kwara State',
    content:
      'Our hotel guests in Fate now enjoy continuous electricity and air conditioning without noisy diesel generators. Authority SunTech is undoubtedly the best solar company in Kwara State!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    system: '30kVA Hybrid Industrial Kit',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#090D16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest inline-block">
            Verified Customer Experiences
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Trusted Across <span className="text-gradient-gold">Kwara State & Nigeria</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-700/80 shadow-2xl relative"
            >
              <Quote className="w-16 h-16 text-emerald-500/15 absolute top-6 right-8 pointer-events-none" />

              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium mb-8 italic">
                "{t.content}"
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      {t.name} <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{t.location}</span>
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-amber-400">
                  ⚡ {t.system}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    current === i ? 'w-8 bg-emerald-400' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
