import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo.startsWith('http') ? brand.logo : `/${brand.logo}`;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  return (
    <section className="py-20 bg-white font-snpro border-t border-slate-50">
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-12">

        {/* Compact Header - Stylish & Compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex gap-6 items-center">
            {/* Vertical Decorative Bar */}
            <div className="hidden md:block h-16 w-1.5 bg-brand rounded-full"></div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 capitalize tracking-[0.3em] flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-brand"></div>
                Official Partners
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand capitalize  leading-none">
                The <span className="text-slate-400">Network.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Lightweight Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-slate-100 border border-slate-100 rounded-[2rem] overflow-hidden">
          {brands.map((brand, i) => (
            <Link
              key={brand.id}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group relative bg-white p-8 lg:p-12 flex flex-col items-center justify-center transition-all duration-500 hover:z-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
              {/* Subtle hover accent */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                <ArrowUpRight size={16} className="text-brand" />
              </div>

              {/* Minimal Logo */}
              <div className="relative h-12 lg:h-16 w-full flex items-center justify-center">
                <img
                  src={getBrandLogo(brand)}
                  alt={brand.name}
                  className="max-h-full max-w-[120px] object-contain transition-all duration-700 opacity-40 group-hover:opacity-100 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=0f172a&bold=true`; }}
                />
              </div>

              {/* Identity (Revealed on hover) */}
              <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-[9px] font-bold text-brand capitalize tracking-[0.2em]">{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Section Decorative Line */}
        <div className="mt-12 flex justify-center opacity-30">
          <div className="flex items-center gap-4">
            <div className="h-1 w-1 rounded-full bg-slate-900"></div>
            <div className="h-1 w-1 rounded-full bg-slate-900"></div>
            <div className="h-1 w-1 rounded-full bg-slate-900"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
