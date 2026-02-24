import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#FFFEF7] z-[1001] shadow-2xl flex flex-col font-urbanist border-l border-amber-100"
          >
            {/* Header */}
            <div className="p-8 border-b border-amber-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#4A3728] capitalize">Your Bag.</h2>
                <p className="text-[10px] font-bold text-amber-600 capitalize tracking-widest mt-1">{cartCount} selected items</p>
              </div>
              <button
                onClick={closeCartDrawer}
                className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-[#4A3728] hover:bg-amber-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="h-24 w-24 rounded-2xl bg-white p-4 flex items-center justify-center flex-shrink-0 relative border border-amber-50 shadow-sm">
                        <img
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <p className="text-[9px] font-bold text-amber-500 capitalize tracking-widest mb-1">{item.brand_name}</p>
                            <h3 className="text-sm font-bold text-[#4A3728] capitalize truncate pr-4">{item.name}</h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-amber-200 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 bg-amber-50 rounded-lg px-2 py-1 border border-amber-100/50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-amber-600 hover:text-amber-800"><Minus size={12} /></button>
                            <span className="text-[11px] font-bold w-3 text-center text-[#4A3728]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-amber-600 hover:text-amber-800"><Plus size={12} /></button>
                          </div>
                          <span className="text-sm font-bold text-[#4A3728]">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                    <ShoppingBag size={24} className="text-amber-200" />
                  </div>
                  <h3 className="text-lg font-bold text-[#4A3728] capitalize mb-2">Your bag is empty</h3>
                  <p className="text-xs font-bold text-amber-300 capitalize tracking-widest mb-8">Discover our collection</p>
                  <button
                    onClick={closeCartDrawer}
                    className="px-8 py-3 bg-[#4A3728] text-white text-[10px] font-bold capitalize tracking-widest rounded-xl hover:bg-amber-800 transition-all"
                  >
                    Explore Shop
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-[#FFFEF7] border-t border-amber-50">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold text-amber-400 capitalize tracking-widest">Estimated Total</span>
                  <span className="text-2xl font-bold text-[#4A3728]">${total}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-12 bg-amber-50 text-amber-900 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold capitalize tracking-widest hover:bg-amber-100 transition-all border border-amber-100"
                  >
                    Manage Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-12 bg-[#4A3728] text-white rounded-xl flex items-center justify-center gap-3 text-[10px] font-bold capitalize tracking-widest hover:bg-amber-800 transition-all shadow-lg"
                  >
                    Continue to Checkout
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <p className="text-center text-[8px] font-bold text-amber-300 capitalize tracking-widest mt-6">
                  Taxes and shipping calculated at final step
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
