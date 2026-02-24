import { motion } from "framer-motion";
import { Laptop, Printer, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Import local assets
import laptopCat from "@/assets/category/laptop_cat.jpg";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-snpro">

      {/* --- Minimal Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-[10px] font-bold text-blue-600 capitalize tracking-[0.4em]">Core Pillars</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-950 capitalize  leading-none">
            Major <span className="text-slate-400 italic">Series.</span>
          </h2>
        </div>
        <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-bold capitalize tracking-widest text-slate-400 hover:text-slate-950 transition-all border-b border-slate-100 pb-2">
          Discover full drop <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* --- LAPTOP COLLECTION --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={laptopCat}
              alt="Premium Laptops"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Soft Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
          </div>

          <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                  <Laptop size={20} className="text-blue-600" />
                </div>
                <span className="text-[10px] font-bold capitalize tracking-[0.3em] text-slate-900">Computing</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-bold text-slate-950 capitalize  leading-none">
                Elite <br /><span className="text-blue-600 italic">Laptops.</span>
              </h3>

              <p className="text-slate-500 text-sm md:text-lg font-bold max-w-xs leading-relaxed">
                Precision tools for the modern high-performance workflow.
              </p>

              <Link to="/shop?category=laptop-computers" className="inline-flex items-center gap-4 h-14 px-8 bg-slate-950 text-white rounded-2xl font-bold text-[10px] capitalize tracking-[0.2em] hover:bg-blue-600 hover:scale-105 transition-all shadow-xl shadow-black/10">
                Explore Models <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- PRINTER COLLECTION --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={printerCat}
              alt="Premium Printers"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Soft Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
          </div>

          <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
                  <Printer size={20} className="text-purple-600" />
                </div>
                <span className="text-[10px] font-bold capitalize tracking-[0.3em] text-slate-900">Precision</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-bold text-slate-950 capitalize  leading-none">
                Smart <br /><span className="text-purple-600 italic">Printing.</span>
              </h3>

              <p className="text-slate-500 text-sm md:text-lg font-bold max-w-xs leading-relaxed">
                Enterprise-grade solutions for seamless productivity.
              </p>

              <Link to="/shop?category=printers" className="inline-flex items-center gap-4 h-14 px-8 bg-slate-950 text-white rounded-2xl font-bold text-[10px] capitalize tracking-[0.2em] hover:bg-purple-600 hover:scale-105 transition-all shadow-xl shadow-black/10">
                View Catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
