'use client';

import React, { useState, useEffect } from 'react';
import { IProduct } from '@/types';
import { useCart } from '@/context/CartContext';
import { Shield, Plus, Edit, Trash2, Package, Users, DollarSign, Upload, Image as ImageIcon, Send, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'rbac' | 'newsletter'>('analytics');
  const [loading, setLoading] = useState(true);
  const { formatNaira } = useCart();

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Solar Panels',
    brand: 'Authority SunTech',
    price: 185000,
    discountPrice: 165000,
    shortDescription: '',
    description: '',
    stockQuantity: 20,
    warranty: '25 Years',
    isFeatured: true,
    images: [] as string[],
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [resP, resO, resU, resS] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
        fetch('/api/users'),
        fetch('/api/newsletter/subscribers'),
      ]);

      const dataP = await resP.json();
      const dataO = await resO.json();
      const dataU = await resU.json();
      const dataS = await resS.json();

      if (dataP.success) setProducts(dataP.products);
      if (dataO.success) setOrders(dataO.orders);
      if (dataU.success) setUsers(dataU.users);
      if (dataS.success) setSubscribers(dataS.subscribers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const uploadedUrls: string[] = [...productForm.images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      await new Promise((resolve) => {
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          try {
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64Data }),
            });
            const data = await res.json();
            if (data.success) {
              uploadedUrls.push(data.url);
            }
          } catch (err) {
            console.error(err);
          }
          resolve(true);
        };
        reader.readAsDataURL(file);
      });
    }

    setProductForm({ ...productForm, images: uploadedUrls });
    setImagePreview(uploadedUrls);
    setUploadingImage(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const finalImages = productForm.images.length > 0 ? productForm.images : [
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80',
      ];

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...productForm, images: finalImages }),
      });

      const data = await res.json();
      if (data.success) {
        setShowProductModal(false);
        setEditingProduct(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  const seedDatabase = async () => {
    if (!confirm('Re-seed database with default Authority SunTech products?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) fetchAdminData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Authority SunTech Admin CMS</h1>
            <p className="text-xs text-slate-400">Manage products, Cloudinary uploads, orders, and team access</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={seedDatabase}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Seed Products
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setProductForm({
                name: '',
                category: 'Solar Panels',
                brand: 'Authority SunTech',
                price: 185000,
                discountPrice: 165000,
                shortDescription: '',
                description: '',
                stockQuantity: 20,
                warranty: '25 Years',
                isFeatured: true,
                images: [],
              });
              setImagePreview([]);
              setShowProductModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="flex border-b border-slate-800 gap-6 text-xs font-bold overflow-x-auto pb-1">
        {[
          { id: 'analytics', label: 'Overview & Metrics' },
          { id: 'products', label: `Products Catalog (${products.length})` },
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'rbac', label: `Team & RBAC (${users.length})` },
          { id: 'newsletter', label: `Email List (${subscribers.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3.5 border-b-2 transition-colors uppercase tracking-wider shrink-0 ${
              activeTab === tab.id
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Revenue</span>
                <h3 className="text-xl font-black text-white font-mono">{formatNaira(totalRevenue)}</h3>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-400">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Orders Processed</span>
                <h3 className="text-xl font-black text-white font-mono">{orders.length}</h3>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-teal-500/20 text-teal-400">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Active Products</span>
                <h3 className="text-xl font-black text-white font-mono">{products.length}</h3>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-indigo-500/20 text-indigo-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Registered Users</span>
                <h3 className="text-xl font-black text-white font-mono">{users.length}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-slate-400 uppercase font-bold">
              <tr>
                <th className="pb-3">Product</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-900/50">
                  <td className="py-3 font-bold text-white max-w-xs truncate">{p.name}</td>
                  <td className="py-3 text-emerald-400 font-semibold">{p.category}</td>
                  <td className="py-3 font-mono font-bold text-amber-400">{formatNaira(p.discountPrice || p.price)}</td>
                  <td className="py-3 font-mono">{p.stockQuantity}</td>
                  <td className="py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setProductForm({
                          name: p.name,
                          category: p.category,
                          brand: p.brand,
                          price: p.price,
                          discountPrice: p.discountPrice || p.price,
                          shortDescription: p.shortDescription,
                          description: p.description,
                          stockQuantity: p.stockQuantity,
                          warranty: p.warranty,
                          isFeatured: p.isFeatured,
                          images: p.images,
                        });
                        setImagePreview(p.images);
                        setShowProductModal(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowProductModal(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6 text-white">
            <h2 className="text-xl font-bold">
              {editingProduct ? 'Edit Product' : 'Create & Upload Solar Product'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  >
                    {['Solar Panels', 'Lithium Batteries', 'Tubular Batteries', 'Inverters', 'Charge Controllers', 'Solar Street Lights', 'Solar Kits'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1">Brand</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Price (₦ Naira)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1">Discount Price (₦)</label>
                  <input
                    type="number"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm({ ...productForm, discountPrice: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-400">Cloudinary Product Images Upload</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-400"
                />
                {uploadingImage && <p className="text-amber-400 font-mono">Uploading to Cloudinary...</p>}
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
