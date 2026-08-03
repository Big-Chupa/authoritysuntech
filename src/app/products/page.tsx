'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CompareModal } from '@/components/CompareModal';
import { IProduct } from '@/types';
import { Search, SlidersHorizontal, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(5000000);

  const [quickViewProduct, setQuickViewProduct] = useState<IProduct | null>(null);
  const [compareItems, setCompareItems] = useState<IProduct[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const { formatNaira } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sort, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?sort=${sort}&maxPrice=${maxPrice}`;
      if (selectedCategory !== 'All') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    'Solar Panels',
    'Lithium Batteries',
    'Tubular Batteries',
    'Inverters',
    'Charge Controllers',
    'Solar Street Lights',
    'Solar Kits',
    'Accessories',
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCompare = (product: IProduct) => {
    if (compareItems.some((item) => item._id === product._id)) {
      setCompareItems(compareItems.filter((item) => item._id !== product._id));
    } else {
      if (compareItems.length >= 3) {
        alert('You can compare up to 3 products at a time');
        return;
      }
      setCompareItems([...compareItems, product]);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest inline-block">
          Authority SunTech Store
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Explore <span className="text-gradient-emerald">Solar & Battery Systems</span>
        </h1>
        <p className="text-slate-400 text-sm">
          All equipment comes with official manufacturer warranty and is priced in Nigerian Naira (₦).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(5000000);
                  setSearch('');
                }}
                className="text-xs text-slate-400 hover:text-emerald-400"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Search Store</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search solar panels, battery..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex justify-between items-center ${
                      selectedCategory === cat
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-400">Max Price</label>
                <span className="font-mono text-amber-400 font-bold">{formatNaira(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={100000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-6">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="text-slate-300">
              Showing <strong className="text-white">{filteredProducts.length}</strong> Products
            </div>

            <div className="flex items-center gap-4">
              {compareItems.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center gap-1.5 shadow-md animate-bounce"
                >
                  Compare ({compareItems.length})
                </button>
              )}

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400 font-mono">Loading Authority SunTech Products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">No products found matching your filters</h3>
              <p className="text-xs text-slate-400">Try adjusting your category selection or resetting filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="relative">
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                  <button
                    onClick={() => toggleCompare(product)}
                    className={`mt-2 w-full py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      compareItems.some((i) => i._id === product._id)
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {compareItems.some((i) => i._id === product._id) ? '✓ Added to Compare' : '+ Add to Compare'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      {showCompareModal && (
        <CompareModal
          products={compareItems}
          onRemove={(id) => setCompareItems(compareItems.filter((i) => i._id !== id))}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
}
