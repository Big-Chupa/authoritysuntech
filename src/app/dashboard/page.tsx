'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { User, Package, Heart, LogOut, Shield, Printer, CheckCircle2, Clock, MapPin, Phone, Mail, ArrowRight, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'orders';

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'transactions' | 'profile'>(initialTab);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { wishlist, formatNaira } = useCart();

  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    street: 'Taiwo Road / Tanke',
    city: 'Ilorin',
    state: 'Kwara State',
  });

  useEffect(() => {
    const userData = localStorage.getItem('suntech_user');
    if (userData) {
      try {
        const u = JSON.parse(userData);
        setUser(u);
        setProfileForm({
          name: u.name || '',
          phone: u.phone || '07016091727',
          street: u.address?.street || 'Taiwo Road / Tanke',
          city: u.address?.city || 'Ilorin',
          state: u.address?.state || 'Kwara State',
        });
        fetchOrders(u.email);
      } catch (e) {}
    } else {
      setLoadingOrders(false);
    }
  }, []);

  const fetchOrders = async (email: string) => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('suntech_token');
    localStorage.removeItem('suntech_user');
    window.dispatchEvent(new Event('suntech_auth_change'));
    window.location.href = '/';
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, name: profileForm.name, phone: profileForm.phone, address: { street: profileForm.street, city: profileForm.city, state: profileForm.state } };
    localStorage.setItem('suntech_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event('suntech_auth_change'));
    alert('Profile & delivery address updated successfully!');
  };

  if (!user) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Sign In Required</h2>
        <p className="text-xs text-slate-400">Please sign in to view your orders, live tracking, favorites, and profile.</p>
        <Link href="/auth/login" className="inline-block px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg">
          Sign In Now
        </Link>
      </div>
    );
  }

  const firstName = user.name.split(' ')[0];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Profile Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-xl shrink-0">
            <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center text-emerald-400 font-black text-2xl">
              {firstName.charAt(0)}
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome back, {firstName}!</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30">
                {user.role} Member
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase border border-amber-500/30">
                Kwara State Account
              </span>
            </div>
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
            className="px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-6 text-xs sm:text-sm font-bold overflow-x-auto pb-1">
        {[
          { id: 'orders', label: `My Orders & Live Tracking (${orders.length})`, icon: Package },
          { id: 'wishlist', label: `Saved Favorites (${wishlist.length})`, icon: Heart },
          { id: 'transactions', label: 'Payment Ledger', icon: DollarSign },
          { id: 'profile', label: 'Account & Delivery Settings', icon: User },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
              activeTab === tab.id
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ORDERS & LIVE TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {loadingOrders ? (
            <div className="py-16 text-center text-slate-400 font-mono text-xs">Fetching your orders from database...</div>
          ) : orders.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4">
              <Package className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Order History Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven't placed any solar orders yet. Order solar panels or batteries to view real-time delivery status here.
              </p>
              <Link href="/products" className="inline-block px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg">
                Explore Solar Products
              </Link>
            </div>
          ) : (
            orders.map((o) => (
              <div key={o._id} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs border-b border-slate-800 pb-4 gap-2">
                  <div>
                    <span className="text-slate-400">Order Ref:</span>{' '}
                    <strong className="text-amber-400 font-mono text-sm">{o.orderNumber}</strong>
                  </div>
                  <div className="text-slate-400 font-mono">
                    Placed On: {new Date(o.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold uppercase text-[10px] w-fit">
                    Status: {o.orderStatus || 'Processing'}
                  </div>
                </div>

                {/* Step-by-Step Live Order Tracking Bar */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 block">
                    ⚡ Real-Time Order Delivery Progress
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold shadow-md">✓</div>
                      <span className="text-emerald-400 font-bold block text-[10px]">Order Received</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold ${
                        ['processing', 'shipped', 'delivered'].includes(o.orderStatus) ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {['processing', 'shipped', 'delivered'].includes(o.orderStatus) ? '✓' : '2'}
                      </div>
                      <span className={`block text-[10px] font-bold ${['processing', 'shipped', 'delivered'].includes(o.orderStatus) ? 'text-emerald-400' : 'text-slate-500'}`}>
                        Preparing Setup
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold ${
                        ['shipped', 'delivered'].includes(o.orderStatus) ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {['shipped', 'delivered'].includes(o.orderStatus) ? '✓' : '3'}
                      </div>
                      <span className={`block text-[10px] font-bold ${['shipped', 'delivered'].includes(o.orderStatus) ? 'text-emerald-400' : 'text-slate-500'}`}>
                        In Transit
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold ${
                        o.orderStatus === 'delivered' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {o.orderStatus === 'delivered' ? '✓' : '4'}
                      </div>
                      <span className={`block text-[10px] font-bold ${o.orderStatus === 'delivered' ? 'text-emerald-400' : 'text-slate-500'}`}>
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {o.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-slate-200 font-medium">{item.name} x{item.quantity}</span>
                      <span className="font-mono text-amber-400 font-bold">{formatNaira(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-800 pt-4 gap-4">
                  <div className="text-sm font-black">
                    <span className="text-slate-400 font-normal">Total Paid: </span>
                    <span className="font-mono text-emerald-400 text-base">{formatNaira(o.totalAmount)}</span>
                  </div>

                  <Link
                    href={`/order-success/${o._id}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-emerald-400" /> Printable PDF Receipt
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: SAVED FAVORITES (WISHLIST) */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlist.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
              <Heart className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Your Saved Favorites List is Empty</h3>
              <p className="text-xs text-slate-400">Click the heart icon on any solar product to save it to your profile.</p>
              <Link href="/products" className="inline-block px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs">
                Browse Products
              </Link>
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

      {/* TAB 3: PAYMENT LEDGER */}
      {activeTab === 'transactions' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 overflow-x-auto space-y-4">
          <h3 className="text-base font-bold text-white">Paystack Payment Ledger</h3>
          {orders.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No completed payment transactions found.</p>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase font-bold">
                <tr>
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Gateway</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((o) => (
                  <tr key={o._id} className="hover:bg-slate-900/50">
                    <td className="py-3 font-mono font-bold text-amber-400">{o.paystackRef || o.orderNumber}</td>
                    <td className="py-3 text-slate-300 font-mono">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 text-emerald-400 font-bold">{o.paymentMethod || 'Paystack'}</td>
                    <td className="py-3 font-mono font-bold text-white">{formatNaira(o.totalAmount)}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                        {o.paymentStatus || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* TAB 4: ACCOUNT & DELIVERY SETTINGS */}
      {activeTab === 'profile' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-2xl space-y-6 shadow-xl">
          <h3 className="text-lg font-black text-white border-b border-slate-800 pb-4">
            Account Profile & Shipping Details
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">Street Address</label>
              <input
                type="text"
                value={profileForm.street}
                onChange={(e) => setProfileForm({ ...profileForm, street: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-400">City / LGA</label>
                <input
                  type="text"
                  value={profileForm.city}
                  onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">State</label>
                <input
                  type="text"
                  value={profileForm.state}
                  onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-white font-extrabold text-xs shadow-lg"
            >
              Update Profile Information
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
