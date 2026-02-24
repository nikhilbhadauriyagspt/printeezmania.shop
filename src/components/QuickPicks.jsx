import { motion } from "framer-motion";
import { Plus, ArrowRight, Check, Zap } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import 'swiper/css';
import 'swiper/css/free-mode';

export default function QuickPicks({ products = [] }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=PrinteezMania";
  };

  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-snpro">
      <div className="max-w-[1920px] mx-auto">

        {/* --- Header --- */}
        <div className="flex items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-blue-600 fill-blue-600" />
              <span className="text-[10px] font-bold text-blue-600 capitalize tracking-[0.4em]">Recommended</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-950 capitalize  leading-none">
              Quick <span className="text-slate-400 italic">Picks.</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button className="qp-prev h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm">
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button className="qp-next h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={1.2}
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: '.qp-prev', nextEl: '.qp-next' }}
          freeMode={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
            1440: { slidesPerView: 4.5 },
            1800: { slidesPerView: 5.5 },
          }}
          className="!overflow-visible"
        >
          {products.map((p, i) => (
            <SwiperSlide key={p.id}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-5 p-4 pr-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-500/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group cursor-pointer"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <div className="h-20 w-20 rounded-2xl bg-white overflow-hidden flex-shrink-0 p-3 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 duration-500">
                  <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-blue-600 capitalize tracking-widest mb-1">{p.brand_name || 'Electronics'}</p>
                  <h4 className="text-sm font-bold text-slate-900 truncate capitalize ">{p.name}</h4>
                  <p className="text-base font-bold text-slate-950 mt-1">${p.price}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(p);
                  }}
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all shadow-lg ${cart.find(i => i.id === p.id) ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-blue-600 scale-0 group-hover:scale-100'}`}
                >
                  {cart.find(i => i.id === p.id) ? <Check size={18} /> : <Plus size={20} />}
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
