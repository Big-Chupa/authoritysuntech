'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { SolarCalculator } from '@/components/SolarCalculator';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { IProduct } from '@/types';
import { ArrowRight, ShieldCheck, Zap, Award, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SolarHero3D = dynamic(() => import('@/components/3d/SolarHero3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[650px] flex items-center justify-center text-slate-500 font-mono text-xs">
      Loading 3D Solar Canvas...
    </div>
  ),
});

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch('/api/products?featured=true');
      const data = await res.json();
      if (data.success && data.products.length > 0) {
        setFeaturedProducts(data.products.slice(0, 4));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const displayProducts = featuredProducts.length === 4 ? featuredProducts : [
    {
      _id: '1',
      name: 'Authority SunTech 600W N-Type Monocrystalline Solar Panel',
      category: 'Solar Panels',
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80'],
    },
    {
      _id: '2',
      name: 'Authority SunTech 15kWh Wall-Mounted LiFePO4 Lithium Battery',
      category: 'Lithium Batteries',
      images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80'],
    },
    {
      _id: '3',
      name: 'Authority SunTech 10kVA / 48V Pure Sine Wave Hybrid Inverter',
      category: 'Inverters',
      images: ['https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&auto=format&fit=crop&q=80'],
    },
    {
      _id: '4',
      name: 'Authority SunTech 5kVA Complete Residential Solar Kit Package',
      category: 'Solar Kits',
      images: ['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80'],
    },
  ];

  return (
    <div className="space-y-24">
      {/* 3D Solar Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-hero-gradient pt-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> Next-Gen Clean Energy Ecosystem
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
              Power Your World with <span className="text-gradient-emerald">Authority SunTech</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Tier-1 Monocrystalline N-Type Solar Panels, LiFePO4 Lithium Batteries, and Pure Sine Wave Hybrid Inverters. Headquartered on Taiwo Road, Ilorin, Kwara State.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                Shop Solar Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#calculator"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 font-bold text-sm transition-all text-center"
              >
                Calculate Solar ROI Savings
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <SolarHero3D />
          </div>
        </div>
      </section>

      {/* Featured Products Section (Strictly 4 Cards, Image + Name + Category, NO PRICES on Home Page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest inline-block">
            Featured Innovations
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            High-Performance <span className="text-gradient-gold">Solar & Battery Solutions</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Click any featured product below to inspect full specifications and prices in Nigerian Naira (₦).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((p) => (
            <Link
              key={p._id}
              href={`/products/${p._id}`}
              className="glass-card rounded-3xl overflow-hidden group border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative w-full h-56 bg-slate-950/80 overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3 bg-slate-900/60">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-400">
                  {p.category}
                </span>
                <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold pt-1">
                  <span>View Details & Pricing</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Solar Savings ROI Calculator Component */}
      <SolarCalculator />

      {/* Kwara / Ogbomosho Testimonials Carousel Component */}
      <TestimonialsCarousel />
    </div>
  );
}
