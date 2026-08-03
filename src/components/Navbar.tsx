'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Shield,
  LogOut,
  Phone,
  Home,
  Info,
  Package,
  Calculator,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const { totalItems, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const token = localStorage.getItem('suntech_token');
    const userData = localStorage.getItem('suntech_user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {}
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('suntech_token');
    localStorage.removeItem('suntech_user');
    setUser(null);
    setMobileMenuOpen(false);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Calculator', href: '/#calculator', icon: Calculator },
    { name: 'Testimonials', href: '/#testimonials', icon: MessageSquare },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1329]/95 backdrop-blur-xl border-b border-slate-800/80 py-2 sm:py-3.5 shadow-2xl'
          : 'bg-[#0B1329]/70 backdrop-blur-md py-2.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-1">
        {/* Brand Logo - Scaled for 320px Mobile S */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0 max-w-[190px] min-[380px]:max-w-none">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin-slow" />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] min-[360px]:text-sm sm:text-lg md:text-xl font-black tracking-tight sm:tracking-wider text-white flex items-center gap-0.5">
              AUTHORITY <span className="text-emerald-400">SUNTECH</span>
            </span>
            <span className="text-[7.5px] sm:text-[9px] uppercase tracking-widest text-slate-400 font-medium hidden min-[340px]:block">
              Smart Solar Energy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Visible >= 768px) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs lg:text-sm font-medium transition-colors hover:text-emerald-400 relative py-1 ${
                  isActive ? 'text-emerald-400' : 'text-slate-300'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions - Engineered to fit 320px Mobile S */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Quick Call Link for Desktop (>= 1024px) */}
          <a
            href="tel:+2347063987545"
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> +234 706 398 7545
          </a>

          {/* Wishlist Link */}
          <Link
            href="/dashboard?tab=wishlist"
            className="p-1.5 sm:p-2.5 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-[#0F172A] text-[9px] font-extrabold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon Link */}
          <Link
            href="/cart"
            className="p-1.5 sm:p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800 transition-all relative group shadow-lg"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Desktop User Account Buttons (>= 768px) */}
          {user ? (
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs font-semibold hover:border-emerald-500/50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <Link
                  href="/admin"
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>CMS</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button (GUARANTEED VISIBLE on Mobile S 320px and up) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Navigation Menu"
            className="md:hidden p-1.5 sm:p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-amber-400" /> : <Menu className="w-4.5 h-4.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer (Optimized for Mobile S 320px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#090D16]/98 backdrop-blur-2xl border-b border-slate-800/90 px-3.5 sm:px-6 py-4 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Direct Calling Hotline Section */}
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Kwara State Sales Hotline
              </span>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <a
                  href="tel:07016091727"
                  className="px-2 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" /> 07016091727
                </a>
                <a
                  href="tel:+2347063987545"
                  className="px-2 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" /> Call +234
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <span className="text-[9.5px] uppercase tracking-widest font-extrabold text-slate-500 px-1 block mb-1">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-md'
                        : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <link.icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>

            {/* User Account / Auth Actions */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <span className="text-[9.5px] uppercase tracking-widest font-extrabold text-slate-500 px-1 block">
                Account & Access
              </span>
              {user ? (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">{user.name}</div>
                        <div className="text-[9.5px] text-slate-400 font-mono truncate max-w-[140px]">{user.email}</div>
                      </div>
                    </div>
                    {(user.role === 'admin' || user.role === 'superadmin') && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-2 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/40"
                      >
                        CMS
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold text-center border border-slate-700"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-2 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-bold text-center border border-rose-500/30"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs text-center shadow-lg shadow-emerald-500/20"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
