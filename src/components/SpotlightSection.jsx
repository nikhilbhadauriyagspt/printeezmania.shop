import { motion } from "framer-motion";
import { Heart, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function SpotlightSection({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const displayProducts = products.length > 0 ? products.slice(0, 12) : [];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/400x400?text=HP+Product";
    } catch (e) {
      return "https://via.placeholder.com/400x400?text=HP+Product";
    }
  };

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] font-sans overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">

        {/* --- STANDARDIZED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#007DBA] rounded-full" />
              <span className="text-[10px] font-bold text-[#007DBA] uppercase tracking-[0.3em]">Seasonal Drops</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-none">
              Special <span className="text-[#007DBA]">Offers.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl text-sm md:text-base leading-relaxed">
              Discover top-performing hardware configurations and essential supplies at exclusive partnership pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="spot-prev h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#007DBA] hover:border-[#007DBA] transition-all shadow-sm active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button className="spot-next h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#007DBA] hover:border-[#007DBA] transition-all shadow-sm active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- LIGHTWEIGHT COMPACT SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            spaceBetween={16}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.spot-prev',
              nextEl: '.spot-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
            freeMode={true}
            className="!overflow-visible"
          >
            {displayProducts.map((p, idx) => (
              <SwiperSlide key={p.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="group"
                >
                  <div className="bg-white rounded-[2rem] border border-slate-100 p-4 transition-all duration-500 hover:bg-[#F8FAFC]/50 hover:border-blue-100 flex items-center gap-4">
                    <Link to={`/product/${p.slug}`} className="w-24 h-24 md:w-28 md:h-28 bg-slate-50 rounded-2xl flex items-center justify-center p-3 shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 pr-2">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-[#007DBA] transition-colors leading-tight">
                          {p.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-2 mb-3">
                        <span className="text-base font-black text-slate-900">${parseFloat(p.price).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={addedItems[p.id]}
                          className={`h-8 px-4 rounded-lg flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider transition-all ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-[#007DBA]'}`}
                        >
                          {addedItems[p.id] ? <Check size={12} strokeWidth={3} /> : <><ShoppingCart size={12} /><span>Add</span></>}
                        </button>
                        <button
                          onClick={() => toggleWishlist(p)}
                          className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-300 hover:text-red-500'}`}
                        >
                          <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
