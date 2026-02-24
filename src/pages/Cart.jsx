import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-sans">
        <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
          <ShoppingCart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-400 font-medium text-sm mb-10">Looks like you haven't added any hardware to your selection yet.</p>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200 active:scale-95">
          Start Shopping
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
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Purchase Review</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">
              Your <span className="text-[#007DBA]">Cart.</span>
            </h1>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{cartCount} items selected</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">

          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col sm:flex-row items-center gap-8 group hover:border-[#007DBA]/20 transition-all"
                >
                  <Link to={`/product/${item.slug}`} className="h-32 w-32 rounded-2xl bg-[#F8FAFC] p-4 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50/30 transition-colors duration-500">
                    <img
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col mb-5">
                      <span className="text-[9px] font-bold text-[#007DBA] uppercase tracking-widest mb-1">{item.brand_name || 'AUTHENTIC'}</span>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="text-lg font-bold text-slate-900 hover:text-[#007DBA] transition-colors leading-tight line-clamp-1">{item.name}</h3>
                      </Link>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="h-11 px-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-6">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 rounded-lg bg-white text-slate-400 flex items-center justify-center hover:text-[#007DBA] hover:shadow-sm transition-all"><Minus size={14} /></button>
                        <span className="text-sm font-black text-slate-900 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 rounded-lg bg-white text-slate-400 flex items-center justify-center hover:text-[#007DBA] hover:shadow-sm transition-all"><Plus size={14} /></button>
                      </div>
                      <span className="text-xl font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-11 w-11 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 border border-transparent transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#007DBA] transition-all pt-8">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#0F172A] rounded-[2.5rem] p-10 text-white sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck size={20} className="text-[#007DBA]" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Order Summary</h3>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs font-medium text-slate-400">Subtotal</span>
                  <span className="text-lg font-bold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-xs font-medium text-slate-400">Shipping</span>
                  <span className="text-xs font-bold text-[#007DBA] uppercase tracking-widest">Calculated at next step</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-bold uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-black text-white">${total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full h-14 bg-[#007DBA] hover:bg-[#006699] text-white rounded-2xl flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 active:scale-95"
              >
                Go to Checkout
                <ArrowRight size={18} />
              </Link>

              <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <Zap size={14} className="text-[#007DBA]" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Secure HP Merchant</p>
                </div>
                <p className="text-[9px] font-medium text-slate-500 leading-relaxed uppercase tracking-wider">
                  Price includes authorized brand warranty and professional technical assistance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
