import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

export default function TheVault({ products = [] }) {
  const navigate = useNavigate();
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=PrinteezMania";
  };

  if (products.length === 0) return null;

  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-snpro overflow-hidden">
      <div className="max-w-[1920px] mx-auto">

        {/* --- Section Header --- */}
        <div className="flex items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-600" />
              <span className="text-[10px] font-bold text-blue-600 capitalize tracking-[0.4em]">Curated Essentials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-950 capitalize  leading-none">
              The <span className="text-slate-400 italic">Vault.</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button className="vault-prev h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm group">
              <ChevronLeft size={20} className="group-active:scale-75 transition-transform" />
            </button>
            <button className="vault-next h-12 w-12 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-sm group">
              <ChevronRight size={20} className="group-active:scale-75 transition-transform" />
            </button>
          </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-6">
            {products.map((p, i) => (
              <CarouselItem key={p.id} className="pl-6 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="group relative flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-8 transition-all duration-700 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-blue-500/20">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                    />

                    {/* Hover Badge */}
                    <div className="absolute top-5 right-5 h-10 w-10 rounded-2xl bg-white flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-sm border border-slate-50 group-hover:scale-110">
                      <ArrowUpRight size={20} className="text-blue-600" />
                    </div>
                  </div>

                  <div className="mt-5 px-1 space-y-1">
                    <p className="text-[8px] font-bold text-blue-600 capitalize tracking-widest">{p.brand_name || 'Electronics'}</p>
                    <h4 className="text-[11px] font-bold text-slate-900 capitalize  truncate group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-bold text-slate-950">${p.price}</span>
                      <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors"></div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden">
            <CarouselPrevious className="vault-prev" />
            <CarouselNext className="vault-next" />
          </div>
        </Carousel>

        {/* Explore All Hook */}
        <div className="mt-16 flex justify-center">
          <Link to="/shop" className="group flex items-center gap-4 px-10 py-4 bg-slate-50 hover:bg-slate-950 hover:text-white rounded-full transition-all duration-500 border border-slate-100">
            <span className="text-[10px] font-bold capitalize tracking-[0.3em]">Access Full Collection</span>
            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-600 transition-all">
              <ArrowRight size={14} className="text-slate-900 group-hover:text-white transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
