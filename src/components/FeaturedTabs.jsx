import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Heart, Check, ShoppingCart, Printer, MousePointer2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FeaturedTabs({ printers = [], accessories = [] }) {
  const [activeTab, setActiveTab] = useState("printers");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const tabs = [
    { id: "printers", label: "Printer Hardware", icon: Printer, count: printers.length, data: printers },
    { id: "accessories", label: "Supplies & Ink", icon: MousePointer2, count: accessories.length, data: accessories },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400?text=HP+Genuine";
    } catch (e) { return "https://via.placeholder.com/400x400?text=HP+Genuine"; }
  };

  // 30 products
  const activeData = tabs.find(t => t.id === activeTab)?.data.slice(0, 30) || [];

  return (
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">

        {/* --- STANDARDIZED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#007DBA] rounded-full" />
              <span className="text-[10px] font-bold text-[#007DBA] uppercase tracking-[0.3em]">Authorized Selection</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-none">
              Featured <span className="text-[#007DBA]">Inventory.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl text-sm md:text-base leading-relaxed">
              Explore our top-performing hardware and certified supplies, curated for maximum efficiency and professional reliability.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="flex border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id ? 'text-[#007DBA]' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <span className="flex items-center gap-2">
                    {tab.label}
                    <span className={`text-[8px] ${activeTab === tab.id ? 'text-[#007DBA]/40' : 'text-slate-300'}`}>({tab.count})</span>
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007DBA]"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-bold text-slate-400 hover:text-[#007DBA] transition-all uppercase tracking-widest bg-white hover:bg-blue-50 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm mb-1">
              Store Catalog Index <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* --- TECHNICAL GRID --- */}
        <div className="min-h-[600px] border-t border-l border-slate-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <AnimatePresence mode="wait">
            {activeData.map((p, i) => (
              <motion.div 
                key={`${activeTab}-${p.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.01 }}
                className="group relative bg-white border-r border-b border-slate-100 p-6 flex flex-col transition-all duration-500 hover:z-10 hover:bg-slate-50/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Original Stock</span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`text-slate-200 hover:text-red-500 transition-colors ${isInWishlist(p.id) ? 'text-red-500' : ''}`}
                  >
                    <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <Link to={`/product/${p.slug}`} className="block aspect-square w-full mb-6">
                  <img
                    src={getImagePath(p.images)}
                    alt=""
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>

                <div className="mt-auto space-y-3">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#007DBA] transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Current Price</p>
                      <p className="text-base font-black text-slate-900 leading-none">${parseFloat(p.price).toLocaleString()}</p>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={addedItems[p.id]}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-[#007DBA] shadow-lg shadow-slate-200'}`}
                    >
                      {addedItems[p.id] ? <Check size={16} strokeWidth={3} /> : <Plus size={18} />}
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[3px] border-l-[3px] border-[#007DBA] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- MINIMALIST FOOTER --- */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-slate-300">
            <Zap size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Fast Dispatch Available</span>
            <Zap size={14} />
          </div>
          <Link 
            to="/shop" 
            className="group flex items-center gap-3 px-10 py-4 bg-slate-50 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-widest border border-slate-200 hover:border-[#007DBA] hover:bg-white transition-all shadow-sm active:scale-95"
          >
            View All Series Catalog
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
