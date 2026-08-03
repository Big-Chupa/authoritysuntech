'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sun, Mail, Phone, MapPin, Send, ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#080C16] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-16 border border-slate-700/60 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
              <Zap className="w-6 h-6 text-amber-400" /> Subscribe to Authority SunTech Clean Energy Insights
            </h3>
            <p className="text-sm text-slate-400">
              Get exclusive solar discounts, clean energy tips, and system maintenance updates delivered to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-2xl">
                <CheckCircle2 className="w-5 h-5" /> Welcome! Check your inbox for confirmation.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-80 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'} <Send className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                AUTHORITY <span className="text-emerald-400">SUNTECH</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Authority SunTech powers homes, businesses, hospitals, and industries across Kwara State and Nigeria with tier-1 smart solar energy systems, lithium batteries, hybrid inverters, and professional turn-key installation.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 25-Year Panel Warranty
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Award className="w-4 h-4 text-amber-400" /> Certified ISO 9001
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Authority SunTech
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors">
                  Product Shop
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-emerald-400 transition-colors">
                  Solar Savings Calculator
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-emerald-400 transition-colors">
                  Client Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products?category=Solar+Panels" className="hover:text-emerald-400 transition-colors">
                  Monocrystalline Panels
                </Link>
              </li>
              <li>
                <Link href="/products?category=Lithium+Batteries" className="hover:text-emerald-400 transition-colors">
                  Lithium LiFePO4 Batteries
                </Link>
              </li>
              <li>
                <Link href="/products?category=Inverters" className="hover:text-emerald-400 transition-colors">
                  Hybrid Inverters
                </Link>
              </li>
              <li>
                <Link href="/products?category=Charge+Controllers" className="hover:text-emerald-400 transition-colors">
                  MPPT Charge Controllers
                </Link>
              </li>
              <li>
                <Link href="/products?category=Solar+Street+Lights" className="hover:text-emerald-400 transition-colors">
                  Solar Street Lights
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Official Contact & HQ
            </h4>
            <div className="flex items-start gap-2.5 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>Taiwo Road, Ilorin, Kwara State, Nigeria</span>
            </div>
            <div className="flex flex-col gap-1 text-sm text-slate-400 pt-1">
              <a href="tel:07016091727" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>07016091727</span>
              </a>
              <a href="tel:+2347063987545" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+234 706 398 7545</span>
              </a>
            </div>
            <a
              href="mailto:akinsolamicheal706@gmail.com"
              className="flex items-center gap-2.5 text-sm text-slate-400 pt-1 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>akinsolamicheal706@gmail.com</span>
            </a>

            <div className="w-full h-24 rounded-xl overflow-hidden border border-slate-700/60 mt-3 shadow-inner">
              <iframe
                title="Authority SunTech Location Map - Ilorin Kwara State"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.719875321524!2d4.5458!3d8.4862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10364d2df46b142d%3A0xa643666bfa099516!2sTaiwo%20Rd%2C%20Ilorin%2C%20Kwara!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
                className="w-full h-full filter grayscale invert opacity-75 hover:opacity-100 transition-opacity"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Authority SunTech Solar Energy Solutions. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Secured by Paystack</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-[10px] text-white">
                PAYSTACK
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-[10px] text-slate-300">
                VISA
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-[10px] text-slate-300">
                MASTERCARD
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono text-[10px] text-slate-300">
                VERVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
