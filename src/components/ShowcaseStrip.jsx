import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ShowcaseStrip({ products = [] }) {
  const { addToCart } = useCart();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const featured = products.slice(0, 5);

  if (featured.length === 0) return null;

  return (
    <section ref={targetRef} className="py-20 bg-[#FFFEF7] relative h-[300vh] font-snpro">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="max-w-[1800px] mx-auto w-full px-6 mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Star size={12} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Editor's Selection</span>
            </div>
            <h2 className="text-5xl font-bold text-[#4A3728]">Premier <span className="text-amber-500 italic font-light">Showcase.</span></h2>
          </div>
          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40 hover:text-amber-700 transition-colors flex items-center gap-2">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cinematic Horizontal Scroll */}
        <motion.div style={{ x }} className="flex gap-10 px-6 w-max pl-[10vw]">
          {featured.map((p) => (
            <div key={p.id} className="relative w-[700px] aspect-[16/9] rounded-[3.5rem] overflow-hidden bg-white border border-amber-100/50 shadow-2xl flex group">
              
              {/* Product Visual */}
              <div className="w-1/2 bg-amber-50/20 flex items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-amber-100/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={p.images ? JSON.parse(p.images)[0] : ''} 
                  alt={p.name} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2 relative z-10"
                />
              </div>

              {/* Product Info */}
              <div className="w-1/2 p-12 flex flex-col justify-center bg-white relative z-20">
                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-4">{p.brand_name}</span>
                <h3 className="text-3xl font-bold text-[#4A3728] leading-tight mb-4 capitalize">{p.name}</h3>
                <p className="text-amber-900/40 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                  Engineered for professional workflows. Experience authorized performance with full manufacturer warranty.
                </p>
                
                <div className="flex items-center gap-6 mt-auto">
                  <span className="text-2xl font-bold text-[#4A3728]">${parseFloat(p.price).toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(p)}
                    className="h-12 px-8 rounded-2xl bg-[#4A3728] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg flex items-center gap-2"
                  >
                    Add to Cart <ShoppingBag size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
