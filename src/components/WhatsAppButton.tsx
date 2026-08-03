'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '2347063987545';
  const defaultMessage = encodeURIComponent(
    'Hello Authority SunTech, I am interested in your solar products and would like to make an enquiry.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Authority SunTech on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2 border-white/20 group hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] transition-all duration-300 select-none"
    >
      <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
      <MessageCircle className="w-7 h-7 fill-current drop-shadow-md group-hover:rotate-12 transition-transform" />
      <span className="absolute right-16 bg-slate-900/90 text-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
        Chat with Authority SunTech
      </span>
    </motion.a>
  );
};
