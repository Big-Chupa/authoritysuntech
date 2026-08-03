'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { User, Package, Heart, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');
  const { wishlist, formatNaira } = useCart();

  useEffect(() => {
    const userData = localStorage.getItem('suntech_user');
    if (userData) {
      const u = JSON.parse(userData);
      setUser(u);
      fetchOrders(u.email);
    }
  }, []);

  const fetchOrders = async (email: string) => {
    try {
      const res = await fetch(`/api/orders?email=${email}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('suntech_token');
    localStorage.removeItem('suntech_user');
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Please sign in to access your customer dashboard</h2>
        <Link href="/auth/login" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl text-xs inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-xl">
            <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center text-white font-black text-xl">
              {user.name.charAt(0)}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{user.name}</h1>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
              {user.role} Account
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(user.role === 'admin' || user.role === 'superadmin') && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> Admin CMS
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-rose-400 text-xs font-bold hover:bg-rose-500/10 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-800 gap-8 text-sm font-bold">
        {[
          { id: 'orders', label: 'My Orders', icon: Package },
          { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
          { id: 'profile', label: 'Account Settings', icon: User },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-white">No order history found</h3>
              <p className="text-xs text-slate-400">Place an order for solar panels or lithium batteries to track delivery.</p>
            </div>
          ) : (
            orders.map((o) => (
              <div key={o._id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs border-b border-slate-800 pb-3 gap-2">
                  <div>
                    <span className="text-slate-400">Order Ref:</span>{' '}
                    <strong className="text-amber-400 font-mono">{o.orderNumber}</strong>
                  </div>
                  <div className="text-slate-400">
                    Date: {new Date(o.createdAt).toLocaleDateString()}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px] w-fit">
                    Status: {o.orderStatus}
                  </div>
                </div>

                <div className="space-y-2">
                  {o.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-slate-200">{item.name} x{item.quantity}</span>
                      <span className="font-mono text-white font-bold">{formatNaira(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-slate-800 pt-3 text-sm font-black">
                  <span className="text-slate-300">Total Paid</span>
                  <span className="font-mono text-emerald-400">{formatNaira(o.totalAmount)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800">
              <p className="text-xs text-slate-400">Your saved wishlist is currently empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-xl space-y-4 text-xs">
          <h3 className="text-base font-bold text-white mb-4">Account Profile</h3>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Full Name</span>
            <span className="font-bold text-white">{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Email Address</span>
            <span className="font-bold text-white">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Default Delivery City</span>
            <span className="font-bold text-amber-400">Ilorin, Kwara State</span>
          </div>
        </div>
      )}
    </div>
  );
}
