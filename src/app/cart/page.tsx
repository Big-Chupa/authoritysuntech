'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotalPrice, formatNaira } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const shippingFee = cart.length > 0 ? 15000 : 0;
  const discountAmount = Math.round((subtotalPrice * discountPercent) / 100);
  const finalTotal = subtotalPrice - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SUNTECH10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'GREENENERGY2026') {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try SUNTECH10');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-emerald-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white">Your Shopping Cart is Empty</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Explore our range of tier-1 solar panels, lithium batteries, and inverters.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-500/25"
        >
          Explore Solar Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-emerald-400" /> Shopping Cart ({cart.length} Items)
        </h1>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => {
            const activePrice = product.discountPrice || product.price;
            return (
              <div
                key={product._id}
                className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-slate-950 rounded-2xl overflow-hidden shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-contain p-2" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">{product.category}</span>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{product.name}</h3>
                    <div className="text-sm font-black text-amber-400 font-mono mt-1">
                      {formatNaira(activePrice)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-900">
                    <button
                      onClick={() => updateQuantity(product._id, quantity - 1)}
                      className="px-3 py-1 text-slate-300 hover:bg-slate-800 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, quantity + 1)}
                      className="px-3 py-1 text-slate-300 hover:bg-slate-800 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-white font-mono">
                      {formatNaira(activePrice * quantity)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-4">
              Order Summary
            </h3>

            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" /> Promo Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SUNTECH10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs uppercase text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-xs text-emerald-400 font-semibold">✓ Coupon applied! {discountPercent}% discount active.</p>
              )}
              {couponError && <p className="text-xs text-rose-400">{couponError}</p>}
            </form>

            <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-white font-bold">{formatNaira(subtotalPrice)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount ({discountPercent}%)</span>
                  <span className="font-mono">-{formatNaira(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Logistics & Freight Shipping</span>
                <span className="font-mono text-white font-bold">{formatNaira(shippingFee)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-white border-t border-slate-800 pt-3">
                <span>Total Amount</span>
                <span className="font-mono text-amber-400">{formatNaira(finalTotal)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm text-center shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
