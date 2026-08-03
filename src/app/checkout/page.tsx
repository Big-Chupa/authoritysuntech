'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const { cart, subtotalPrice, clearCart, formatNaira } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Kwara State',
    orderNotes: '',
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const shippingFee = 15000;
  const totalAmount = subtotalPrice + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaystackPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.city) {
      setError('Please fill in all required address fields');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const initRes = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          amount: totalAmount,
          metadata: { ...formData },
        }),
      });

      const initData = await initRes.json();

      if (initData.success) {
        const orderRes = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.map((item) => ({
              product: item.product._id,
              name: item.product.name,
              price: item.product.discountPrice || item.product.price,
              quantity: item.quantity,
              image: item.product.images[0],
            })),
            totalAmount,
            shippingAddress: formData,
            paymentMethod: 'Paystack Card/Transfer',
            paymentStatus: 'completed',
            paystackRef: initData.data?.reference || 'AST-' + Date.now(),
          }),
        });

        const orderData = await orderRes.json();

        if (orderData.success) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          clearCart();
          router.push(`/order-success/${orderData.order._id}`);
        } else {
          setError(orderData.error || 'Failed to place order');
        }
      } else {
        setError('Payment initialization failed.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <a href="/products" className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold text-xs inline-block">
          Return to Store
        </a>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest inline-block">
          256-Bit SSL Encrypted Checkout
        </span>
        <h1 className="text-3xl font-black text-white">Complete Your Authority SunTech Order</h1>
      </div>

      <form onSubmit={handlePaystackPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-xl font-extrabold text-white border-b border-slate-800 pb-4">
            1. Delivery Address & Contact
          </h2>

          {error && <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500 text-rose-300 text-xs font-bold">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Alhaji Ibrahim Bello"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. ibrahim@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="07016091727 or +234 706 398 7545"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {['Kwara State', 'Lagos State', 'Abuja FCT', 'Oyo State', 'Osun State', 'Ogun State', 'Kano State', 'Rivers State'].map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">Street Address *</label>
            <input
              type="text"
              name="street"
              required
              placeholder="e.g. Taiwo Road / Tanke, Ilorin"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400">City / Local Government *</label>
            <input
              type="text"
              name="city"
              required
              placeholder="e.g. Ilorin South"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel-gold p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <h2 className="text-xl font-extrabold text-white border-b border-slate-800 pb-4">
            2. Payment Summary
          </h2>

          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {cart.map(({ product, quantity }) => (
              <div key={product._id} className="flex justify-between items-center text-xs">
                <span className="text-slate-300 line-clamp-1">{product.name} x{quantity}</span>
                <span className="font-mono text-white font-bold">{formatNaira((product.discountPrice || product.price) * quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-mono text-white">{formatNaira(subtotalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Nationwide Logistics</span>
              <span className="font-mono text-white">{formatNaira(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-slate-800">
              <span>Total Payable</span>
              <span className="font-mono text-amber-400">{formatNaira(totalAmount)}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Lock className="w-4 h-4" /> Secured by Paystack Gateway
            </div>
            <p>Accepts all Nigerian bank cards, transfers, USSD, and Apple Pay.</p>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm text-center shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
          >
            {processing ? 'Connecting to Paystack...' : `Pay ${formatNaira(totalAmount)} via Paystack`}
          </button>
        </div>
      </form>
    </div>
  );
}
