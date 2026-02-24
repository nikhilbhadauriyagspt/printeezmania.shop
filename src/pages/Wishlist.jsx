import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-sans">
        <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
          <Heart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-400 font-medium text-sm mb-10">Save your favorite hardware units here for future acquisition.</p>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200 active:scale-95">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-12 pb-20 font-sans">
      <div className="container mx-auto px-4 lg:px-6">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-100 pb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#007DBA]">
              <div className="h-1 w-1 rounded-full bg-current" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Saved Inventory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">
              Your <span className="text-[#007DBA]">Favorites.</span>
            </h1>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{wishlistCount} units reserved</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-square bg-[#F8FAFC] rounded-[2.5rem] border border-slate-100 transition-all duration-500 flex items-center justify-center p-8 overflow-hidden mb-5 group-hover:bg-white group-hover:border-[#007DBA]/20">
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 h-10 w-10 bg-white text-slate-300 border border-slate-100 rounded-full shadow-sm flex items-center justify-center z-10 hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-110">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-opacity"
                    />
                  </Link>

                  <div className="absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-900/10"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </div>

                <div className="px-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-[#007DBA] uppercase tracking-widest">{p.brand_name || 'AUTHENTIC'}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  </div>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#007DBA] transition-colors leading-snug line-clamp-1 mb-1">{p.name}</h3>
                  </Link>
                  <span className="text-lg font-black text-slate-900">${parseFloat(p.price).toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-24 pt-10 border-t border-slate-100">
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#007DBA] transition-all group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
