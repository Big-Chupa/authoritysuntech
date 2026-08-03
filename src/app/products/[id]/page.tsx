'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, ShieldCheck, Truck, Check, Heart, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart, toggleWishlist, isInWishlist, formatNaira } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 font-mono text-sm">
        Loading Authority SunTech product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <Link href="/products" className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs">
          Back to Store Catalog
        </Link>
      </div>
    );
  }

  const activePrice = product.discountPrice || product.price;
  const inWish = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/checkout';
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Product Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-80 sm:h-[450px] bg-slate-950/80 rounded-3xl overflow-hidden p-6 flex items-center justify-center border border-slate-800 shadow-2xl">
            <Image
              src={product.images[selectedImg] || product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-6"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 bg-slate-900 ${
                    selectedImg === idx ? 'border-emerald-400' : 'border-slate-800 opacity-60'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-full text-xs uppercase tracking-wider">
                {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-2xl border transition-colors ${
                  inWish ? 'bg-rose-500 text-white border-rose-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">{product.name}</h1>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating.toFixed(1)} ({product.reviewCount} Reviews)</span>
              </div>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-bold">{product.warranty}</span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-baseline gap-4">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                {formatNaira(activePrice)}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-slate-500 line-through font-mono">
                  {formatNaira(product.price)}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quantity:</span>
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 font-bold"
                >
                  -
                </button>
                <span className="px-5 py-2 text-sm font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {product.inStock ? `${product.stockQuantity} items in stock` : 'Out of Stock'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/25'
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />} Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl"
              >
                Buy Now (Instant Checkout)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-2xl font-black text-white">Technical Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.specifications &&
            Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold">{key}</span>
                <span className="font-bold text-slate-100">{val}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
