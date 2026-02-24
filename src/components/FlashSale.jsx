import { motion } from "framer-motion";
import { Timer, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function FlashSale({ products: deals = [] }) {
  const { addToCart } = useCart();
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
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-16 bg-white font-urbanist">

      {/* --- REFINED HEADING --- */}
      <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <Timer size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-bold tracking-[0.3em] capitalize text-orange-600">Limited Time</span>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <span className="text-[10px] font-bold tracking-[0.1em] capitalize text-slate-400">Ends in: 04:22:15</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900  capitalize leading-none">
              Flash <span className="text-slate-400 italic">Sale.</span>
            </h2>
          </div>
        </div>
        <Link to="/deals" className="text-xs font-bold capitalize tracking-widest text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors pb-1">
          Explore All Deals <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {deals.map((deal, i) => (
          <Link to={`/product/${deal.id}`} key={deal.id}>
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden group transition-all duration-500 hover:bg-white hover:border-orange-500/20"
            >
              <div className="w-1/2 p-8 lg:p-12">
                <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500 text-white text-[10px] font-bold capitalize tracking-widest mb-6 shadow-lg shadow-orange-500/20">
                  Save ${(deal.price * 0.2).toFixed(0)}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900  mb-4 capitalize line-clamp-2">{deal.name}</h3>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-bold text-slate-900">${deal.price}</span>
                  <span className="text-lg font-bold text-slate-300 line-through">${(deal.price * 1.25).toFixed(0)}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(deal);
                  }}
                  disabled={addedItems[deal.id]}
                  className={`flex items-center gap-2 text-xs font-bold capitalize tracking-widest transition-all ${addedItems[deal.id] ? 'text-emerald-500' : 'text-blue-600 group-hover:gap-4'}`}
                >
                  {addedItems[deal.id] ? (
                    <><Check size={16} /> Added</>
                  ) : (
                    <><span className="hover:underline">Claim Offer</span> <ArrowRight size={16} /></>
                  )}
                </button>                            </div>              <div className="w-1/2 h-full bg-white flex items-center justify-center p-8">
                <img
                  src={getImagePath(deal.images)}
                  alt={deal.name}
                  className="w-full h-auto max-h-[300px] object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
