import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopByCategory({ categories = [] }) {
  // Extract the 10 child categories from 'Printers' (Parent ID 46)
  const printerParent = categories.find(c => c.slug === 'printers' || c.id === 46);
  const displayCategories = printerParent?.children || [];

  // Triple the categories to ensure the container is always full enough for a slow, smooth crawl
  const loopCategories = [...displayCategories, ...displayCategories, ...displayCategories];

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return null;
  };

  if (displayCategories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white font-sans border-b border-slate-100">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marquee-slow 80s linear infinite;
        }
        .category-section:hover .animate-marquee-slow {
          animation-play-state: paused;
        }
      `}} />
      
      <div className="container mx-auto px-4 lg:px-6 category-section">
        
        {/* --- STANDARDIZED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#007DBA] rounded-full" />
              <span className="text-[10px] font-bold text-[#007DBA] uppercase tracking-[0.3em]">HP Departments</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-none">
              Shop by <span className="text-[#007DBA]">Category.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl text-sm md:text-base leading-relaxed">
              Explore our comprehensive range of HP authorized printing solutions and genuine supplies.
            </p>
          </div>
          
          <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-bold text-slate-400 hover:text-[#007DBA] transition-all uppercase tracking-widest bg-white hover:bg-blue-50 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm mb-1">
            Full Catalog Index <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- CONTAINED CSS MARQUEE --- */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-50 bg-[#F8FAFC]/50">
          <div className="animate-marquee-slow gap-4 py-4 px-4">
            {loopCategories.map((item, i) => (
              <Link 
                key={`${item.id}-${i}`}
                to={`/shop?category=${item.slug}`}
                className="group block"
              >
                <div className="flex items-center gap-4 p-3 pr-6 rounded-xl bg-white border border-slate-100 transition-all duration-500 group-hover:border-[#007DBA]/30 group-hover:shadow-[0_10px_30px_-10px_rgba(0,125,186,0.1)] w-[220px] md:w-[250px]">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
                    <div className="w-full h-full rounded-full bg-[#F8FAFC] border border-slate-50 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105">
                      {item.image ? (
                        <img
                          src={getImagePath(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${item.name.charAt(0)}&background=f8fafc&color=007dba&bold=true&size=64`; }}
                        />
                      ) : (
                        <span className="text-xs font-black text-[#007DBA]/20">{item.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-700 group-hover:text-[#007DBA] transition-colors leading-tight truncate">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                      Browse <ChevronRight size={10} strokeWidth={2} />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
