'use client';

import React from 'react';
import Image from 'next/image';
import { IProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompareModalProps {
  products: IProduct[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ products, onRemove, onClose }) => {
  const { addToCart, formatNaira } = useCart();

  if (!products.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl text-white"
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Side-by-Side Product Specification Comparison
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => {
            const activePrice = p.discountPrice || p.price;
            return (
              <div key={p._id} className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="relative flex flex-col items-center">
                  <button
                    onClick={() => onRemove(p._id)}
                    className="absolute -top-2 -right-2 p-1.5 rounded-full bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative w-full h-40 bg-slate-950 rounded-xl mb-3 overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-contain p-2" />
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">{p.category}</span>
                  <h4 className="text-sm font-bold text-center text-white line-clamp-2 mt-1">{p.name}</h4>
                  <div className="text-lg font-black text-amber-400 font-mono mt-2">{formatNaira(activePrice)}</div>
                </div>

                <div className="space-y-2 text-xs border-t border-b border-slate-800 py-3 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Brand:</span>
                    <span className="font-bold">{p.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Warranty:</span>
                    <span className="font-bold text-emerald-400">{p.warranty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stock:</span>
                    <span className="font-bold">{p.inStock ? `${p.stockQuantity} Units` : 'Out of Stock'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rating:</span>
                    <span className="font-bold text-amber-400">★ {p.rating}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(p, 1)}
                  disabled={!p.inStock}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
