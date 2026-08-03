'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Zap,
  Users,
  Globe,
  Target,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sun,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const stats = [
    { value: '5,000+', label: 'Successful Installations', icon: Zap },
    { value: '15MW+', label: 'Clean Power Deployed', icon: Sun },
    { value: '99.9%', label: 'System Uptime Guarantee', icon: ShieldCheck },
    { value: '25 Yrs', label: 'Tier-1 Panel Warranty', icon: Award },
  ];

  return (
    <div className="py-12 space-y-24">
      {/* Hero Section with Glowing Orbs */}
      <section className="relative overflow-hidden pt-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> About Authority SunTech
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none"
          >
            Powering Kwara State & Nigeria with <br />
            <span className="text-gradient-emerald">Tier-1 Clean Energy Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Headquartered on Taiwo Road, Ilorin, Kwara State, Authority SunTech is a premier renewable energy technology company specializing in high-efficiency solar panel arrays, wall-mounted LiFePO4 lithium batteries, and smart hybrid inverter micro-grids.
          </motion.p>
        </div>
      </section>

      {/* Official Headquarters & Contact Info Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#0B1329] rounded-[14px] flex items-center justify-center text-emerald-400">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Official Headquarters</span>
              <p className="text-sm font-bold text-white mt-0.5">Taiwo Road, Ilorin, Kwara State, Nigeria</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#0B1329] rounded-[14px] flex items-center justify-center text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Direct Sales & Inquiries</span>
              <div className="flex flex-col text-sm font-bold text-amber-400 mt-0.5">
                <a href="tel:07016091727" className="hover:underline flex items-center gap-1.5">
                  07016091727
                </a>
                <a href="tel:+2347063987545" className="hover:underline flex items-center gap-1.5">
                  +234 706 398 7545
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#0B1329] rounded-[14px] flex items-center justify-center text-teal-400">
                <Mail className="w-6 h-6" />
              </div>
            </div>
              <a
                href="mailto:akinsolamicheal706@gmail.com"
                className="text-sm font-bold text-[#34D399] hover:underline mt-0.5 block"
              >
                akinsolamicheal706@gmail.com
              </a>
          </div>
        </div>
      </section>

      {/* High-Impact Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="glass-card p-8 rounded-3xl border border-slate-800 text-center space-y-3 shadow-xl"
            >
              <s.icon className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">{s.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-700/80 space-y-6 relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-black text-white">Our Corporate Mission</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              To deliver world-class, affordable, and durable smart solar energy systems to homes, medical facilities, educational institutions, commercial outlets, and factories across Ilorin, Kwara State, and the whole of Nigeria. We eliminate diesel generator dependence through zero-downtime lithium storage.
            </p>
          </div>

          <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl border border-amber-500/30 space-y-6 relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <Globe className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-black text-white">Our Vision for Africa</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              To establish Nigeria’s most technologically advanced clean energy ecosystem by pioneering high-yield N-type monocrystalline solar arrays and smart micro-grids, accelerating carbon emissions reduction across Sub-Saharan Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Engineering Excellence Pillars</h2>
          <p className="text-slate-400 text-sm">Why Authority SunTech is Kwara State’s most trusted solar company.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'TOPCon N-Type Tech', desc: 'Solar cells engineered with 22.8% module efficiency and superior heat coefficient.' },
            { title: 'Tier-1 Component Selection', desc: 'Zero tolerance for substandard equipment; backed by up to 25-year performance warranties.' },
            { title: 'Transparent ₦ Pricing', desc: 'Clear Nigerian Naira costs with zero hidden installation fees or unannounced charges.' },
            { title: 'Turn-Key Installation', desc: 'Certified electrical engineers deliver complete design, cabling, and turn-key setup.' },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-gold p-10 sm:p-16 rounded-3xl border border-amber-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-black text-white">Ready to Power Your Property?</h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Contact our engineering team on Taiwo Road, Ilorin, or calculate your monthly solar savings using our interactive ROI calculator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center gap-2"
            >
              Browse Solar Products <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+2347063987545"
              className="px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-amber-400 font-bold text-sm hover:border-amber-500 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call +234 706 398 7545
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
