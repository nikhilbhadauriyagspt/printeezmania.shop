import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, Plus, Star } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

import 'swiper/css';
import 'swiper/css/free-mode';

export default function BestSellers({ products = [] }) {
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
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=PrinteezMania";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-snpro relative overflow-hidden">

      {/* --- Section Header --- */}
      <div className="flex items-end justify-between mb-16">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-bold text-slate-400 capitalize tracking-[0.4em]">Most Wanted</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-950 capitalize  leading-none">
            Best <span className="text-blue-600 italic">Sellers.</span>
          </h2>
        </div>

        <div className="flex gap-3">
          <button className="bs-prev h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <button className="bs-next h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, FreeMode]}
        spaceBetween={20}
        slidesPerView={1.5}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
        freeMode={true}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 4.5 },
          1440: { slidesPerView: 5.5 },
        }}
        className="!overflow-visible"
      >
        {products.map((p, i) => (
          <SwiperSlide key={p.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-8 transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-blue-500/20">
                {/* Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-2.5 py-1 bg-white border border-slate-100 rounded-lg text-[8px] font-bold capitalize tracking-widest text-slate-400">
                    {p.brand_name || 'Top'}
                  </span>
                </div>

                {/* Actions */}
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

                <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                  <img src={getImagePath(p.images)} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                </Link>

                {/* Minimal Add Icon */}
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

              <div className="mt-5 px-1">
                <Link to={`/product/${p.slug}`}>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 capitalize  line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-950">${p.price}</span>
                  <div className="flex items-center gap-1 opacity-40">
                    <div className="h-1 w-1 rounded-full bg-slate-900"></div>
                    <span className="text-[8px] font-bold capitalize tracking-widest">Trending</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
