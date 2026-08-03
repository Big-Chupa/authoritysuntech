'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IOrder } from '@/types';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Printer, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const { formatNaira } = useCart();

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 font-mono">Loading order confirmation...</div>;
  }

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Order record not found</h2>
        <Link href="/" className="px-6 py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 print:py-0 print:max-w-none">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8 text-center print:border-none print:shadow-none">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white">Payment Successful & Order Confirmed!</h1>
          <p className="text-sm text-slate-400">
            Authority SunTech Order Reference:{' '}
            <strong className="text-amber-400 font-mono text-base">{order.orderNumber}</strong>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-400">Order Delivery Tracker</h3>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold">✓</div>
              <span className="text-emerald-400 font-bold block text-[10px]">Received</span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold">✓</div>
              <span className="text-emerald-400 font-bold block text-[10px]">Processing</span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto font-bold">3</div>
              <span className="text-slate-500 block text-[10px]">Dispatched</span>
            </div>
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mx-auto font-bold">4</div>
              <span className="text-slate-500 block text-[10px]">Delivered</span>
            </div>
          </div>
        </div>

        <div className="text-left space-y-4 border-t border-slate-800 pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Purchased Solar Items</h3>
            <span className="text-xs text-slate-400">Taiwo Road, Ilorin, Kwara State</span>
          </div>

          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-200 font-medium">{item.name} x{item.quantity}</span>
                <span className="font-mono text-amber-400 font-bold">{formatNaira(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-base font-black text-white pt-4 border-t border-slate-800">
            <span>Total Paid (Paystack)</span>
            <span className="font-mono text-emerald-400">{formatNaira(order.totalAmount)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs hover:border-emerald-500 transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-emerald-400" /> Print PDF Receipt
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
          >
            Track in Customer Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
