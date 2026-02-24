import { motion } from "framer-motion";
import { Plus, Heart, Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0]}`;
      }
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=PrinteezMania";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-snpro">

      {/* --- Minimal Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-[10px] font-bold text-blue-600 capitalize tracking-[0.4em]">Latest Drop</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-950 capitalize  leading-none">
            New <span className="text-slate-400 italic">Arrivals.</span>
          </h2>
        </div>
        <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-bold capitalize tracking-widest text-slate-400 hover:text-slate-950 transition-all border-b border-slate-100 pb-2">
          Explore all tech <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-12">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 12) * 0.05 }}
            className="group"
          >
            {/* Product Card - Clean & Light */}
            <div className="relative aspect-square rounded-[2rem] bg-slate-50/50 border border-slate-100 overflow-hidden p-8 transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-blue-500/20">

              {/* Brand Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-2.5 py-1 bg-white/80 backdrop-blur-md border border-slate-100 rounded-lg text-[8px] font-bold capitalize tracking-widest text-slate-400">
                  {p.brand_name || 'Premium'}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(p);
                }}
                className={`absolute top-5 right-5 h-9 w-9 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all shadow-sm z-10 ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
              >
                <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
              </button>

              {/* Product Image */}
              <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                <img
                  src={getImagePath(p.images)}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                />
              </Link>

              {/* Minimal Add Button (Icon only for light feel) */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(p);
                }}
                disabled={addedItems[p.id]}
                className={`absolute bottom-5 right-5 h-10 w-10 rounded-2xl flex items-center justify-center transition-all shadow-xl z-10 ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-blue-600 scale-0 translate-y-4 group-hover:scale-100 group-hover:translate-y-0'}`}
              >
                {addedItems[p.id] ? <Check size={18} /> : <Plus size={20} />}
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-5 px-1">
              <Link to={`/product/${p.slug}`}>
                <h3 className="text-[11px] font-bold text-slate-950 capitalize  line-clamp-1 group-hover:text-blue-600 transition-colors mb-1">{p.name}</h3>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">${p.price}</span>
                <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
