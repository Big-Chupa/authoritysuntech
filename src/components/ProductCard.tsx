'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: IProduct;
  onQuickView?: (product: IProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist, formatNaira } = useCart();
  const [added, setAdded] = useState(false);

  const activePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const inWish = isInWishlist(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group relative border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 shadow-xl"
    >
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
        {hasDiscount && (
          <span className="px-3 py-1 bg-amber-500 text-[#0F172A] font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-lg">
            -{discountPercent}% OFF
          </span>
        )}
        {product.isFeatured && (
          <span className="px-3 py-1 bg-emerald-500 text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider shadow-lg">
            FEATURED
          </span>
        )}
      </div>

      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 z-20 p-2.5 rounded-2xl backdrop-blur-md transition-all ${
          inWish
            ? 'bg-rose-500 text-white shadow-lg'
            : 'bg-slate-900/60 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
        }`}
      >
        <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : ''}`} />
      </button>

      <div className="relative w-full h-56 bg-slate-950/60 overflow-hidden flex items-center justify-center p-4 group-hover:bg-slate-950/80 transition-colors">
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80'}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {onQuickView && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => onQuickView(product)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs font-bold flex items-center gap-2 hover:bg-emerald-500 hover:border-emerald-400 transition-all shadow-xl"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-emerald-400/90">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-mono">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <Link href={`/products/${product._id}`} className="block group-hover:text-emerald-400 transition-colors">
            <h3 className="text-base font-bold text-white line-clamp-1 leading-snug">{product.name}</h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-black text-white font-mono">{formatNaira(activePrice)}</div>
            {hasDiscount && (
              <div className="text-xs text-slate-500 line-through font-mono">
                {formatNaira(product.price)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              !product.inStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : !product.inStock ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
