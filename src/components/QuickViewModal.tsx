'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { X, Star, ShoppingBag, ShieldCheck, Check, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickViewModalProps {
  product: IProduct | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, formatNaira } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const activePrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-4">
              <div className="relative w-full h-72 sm:h-80 bg-slate-950/80 rounded-2xl overflow-hidden p-4 flex items-center justify-center border border-slate-800">
                <Image
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 bg-slate-900 ${
                        selectedImg === idx ? 'border-emerald-400' : 'border-slate-800 opacity-60'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-3 text-xs mb-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-mono">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating} (12 reviews)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-white">{product.name}</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">SKU: {product.sku}</p>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-emerald-400 font-mono">
                    {formatNaira(activePrice)}
                  </span>
                  {product.discountPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono">
                      {formatNaira(product.price)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-3">
                  {product.shortDescription}
                </p>

                <div className="mt-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-400">Brand</span>
                    <span className="font-bold text-white">{product.brand}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                    <span className="text-slate-400">Warranty</span>
                    <span className="font-bold text-amber-400">{product.warranty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stock Status</span>
                    <span className="font-bold text-emerald-400">
                      {product.inStock ? `${product.stockQuantity} Units In Stock` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400 font-bold uppercase">Quantity:</span>
                  <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-mono font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" /> Add {quantity} to Cart ({formatNaira(activePrice * quantity)})
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-400" /> Nationwide Delivery
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" /> Official Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
