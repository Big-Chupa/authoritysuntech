'use client';

import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, ShieldCheck, ArrowRight, Sun, Leaf } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const SolarCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<'home' | 'business' | 'industrial'>('home');
  const [monthlyBill, setMonthlyBill] = useState<number>(150000);
  const { formatNaira } = useCart();

  const monthlySavings = Math.round(monthlyBill * 0.85);
  const annualSavings = monthlySavings * 12;

  let recommendedSystem = '5kVA Hybrid Solar System';
  let estimatedCost = 3500000;
  let panelCount = 8;
  let batteryCapacity = '10kWh Lithium';

  if (monthlyBill > 500000) {
    recommendedSystem = '30kVA Industrial Commercial System';
    estimatedCost = 18500000;
    panelCount = 36;
    batteryCapacity = '45kWh Lithium LiFePO4';
  } else if (monthlyBill > 250000) {
    recommendedSystem = '15kVA Executive Hybrid System';
    estimatedCost = 8200000;
    panelCount = 18;
    batteryCapacity = '20kWh Lithium';
  } else if (monthlyBill > 100000) {
    recommendedSystem = '10kVA Smart Home Solar System';
    estimatedCost = 5400000;
    panelCount = 12;
    batteryCapacity = '15kWh Lithium';
  }

  const paybackYears = (estimatedCost / annualSavings).toFixed(1);
  const co2Offset = (annualSavings * 0.00045).toFixed(1);

  return (
    <section id="calculator" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0B1329] via-[#0F172A] to-[#0B1329]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" /> Interactive ROI Tool
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Authority SunTech <span className="text-gradient-emerald">Solar Savings</span> Calculator
          </h2>
          <p className="text-slate-400 text-base">
            Find out how much money you can save each month by replacing grid tariffs and diesel generators with Authority SunTech clean solar energy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-slate-300 mb-3">
                  1. Select Property Category
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'home', label: 'Residential', icon: Sun },
                    { id: 'business', label: 'Commercial', icon: Zap },
                    { id: 'industrial', label: 'Industrial', icon: TrendingUp },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPropertyType(item.id as any)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                        propertyType === item.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase font-bold tracking-wider text-slate-300">
                    2. Monthly Grid & Fuel Expense
                  </label>
                  <span className="text-xl font-extrabold text-amber-400 font-mono">
                    {formatNaira(monthlyBill)}
                  </span>
                </div>

                <input
                  type="range"
                  min={30000}
                  max={1500000}
                  step={10000}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>₦30,000</span>
                  <span>₦750,000</span>
                  <span>₦1,500,000+</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[75000, 150000, 300000, 600000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlyBill(preset)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
                  >
                    {formatNaira(preset)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Calculated using current NERC electricity tariffs & average diesel fuel price.</span>
            </div>
          </div>

          <div className="lg:col-span-6 glass-panel-gold p-8 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400">
                  Recommended Solution
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold">
                  {panelCount} High-Efficiency Panels
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-1">
                  {recommendedSystem}
                </h3>
                <p className="text-xs text-slate-400">Includes {batteryCapacity} & Tier-1 Smart Inverter</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Monthly Savings</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">{formatNaira(monthlySavings)}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Annual Savings</span>
                  <span className="text-lg font-black text-amber-400 font-mono">{formatNaira(annualSavings)}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Payback ROI</span>
                  <span className="text-lg font-black text-white font-mono">{paybackYears} Years</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-xs text-slate-300">
                  Reduces your carbon footprint by <strong className="text-emerald-400">{co2Offset} metric tons</strong> of CO2 per year.
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3 relative z-10">
              <a
                href="/products"
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-center text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                Shop Solar Kits <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
