import { motion } from "framer-motion";
import { ArrowRight, Plus, Sparkles, Check, ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductAccordion({ 
  products = [], 
  title = "Hardware", 
  subtitle = "Archive", 
  categorySlug = "printers" 
}) {
  const { addToCart } = useCart();
  
  // Show 8 curated archive items
  const displayProducts = products.slice(0, 8);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white font-sans border-t border-slate-100">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* --- STANDARDIZED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#007DBA] rounded-full" />
              <span className="text-[10px] font-bold text-[#007DBA] uppercase tracking-[0.3em]">Authorized Legacy</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-none">
              {title} <span className="text-[#007DBA]">{subtitle}.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl text-sm md:text-base leading-relaxed">
              A curated collection of proven performance models and original accessories from our authorized catalog.
            </p>
          </div>
          
          <Link to={`/shop?category=${categorySlug}`} className="group flex items-center gap-3 text-[10px] font-bold text-slate-400 hover:text-[#007DBA] transition-all uppercase tracking-widest bg-white hover:bg-blue-50 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm mb-1">
            Full Series Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- THE "MODERN SHELF" GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-[2.5rem] overflow-hidden">
          {displayProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white p-8 transition-all duration-500 hover:bg-[#F8FAFC]"
            >
              {/* Product Visual */}
              <div className="aspect-square w-full mb-8 relative">
                <Link to={`/product/${p.slug}`} className="block w-full h-full">
                  <img 
                    src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} 
                    alt="" 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=HP+Hardware"; }}
                  />
                </Link>
                
                {/* Floating Quick Action */}
                <button 
                  onClick={() => addToCart(p)}
                  className="absolute bottom-0 right-0 h-12 w-12 rounded-full bg-[#007DBA] text-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-900"
                >
                  <Plus size={24} />
                </button>
              </div>

              {/* Minimal Info */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HP Series</p>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#007DBA] transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-black text-slate-900">${parseFloat(p.price).toLocaleString()}</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-[#007DBA] transition-colors" />
                </div>
              </div>

              {/* Reveal Overlay Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-[#007DBA]" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM QUOTE BANNER --- */}
        <div className="mt-12 bg-[#007DBA] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group hover:bg-[#006699] transition-all duration-500">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">Need a professional quote?</h3>
              <p className="text-white/70 font-medium max-w-md">Our certified HP consultants provide customized solutions for enterprises and large teams.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/contact" className="px-10 py-4 bg-white text-[#007DBA] rounded-2xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-blue-900/20">
                Contact Specialist
              </Link>
              <Link to="/shop" className="flex items-center gap-2 text-white font-bold text-sm hover:underline">
                Explore Full Catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
