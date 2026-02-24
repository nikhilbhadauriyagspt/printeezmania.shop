import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "PrimeBook Air M2",
    tag: "Most Popular",
    price: "$999",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
    color: "bg-blue-50/50"
  },
  {
    name: "Blade Pro 16",
    tag: "High Performance",
    price: "$2,199",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400",
    color: "bg-purple-50/50"
  },
  {
    name: "Zenith Studio",
    tag: "Creative Choice",
    price: "$1,499",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400",
    color: "bg-emerald-50/50"
  },
  {
    name: "Office Jet 500",
    tag: "New Solution",
    price: "$499",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=400",
    color: "bg-orange-50/50"
  }
];

export default function TrendingProducts() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 bg-white font-urbanist">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-bold  capitalize">Trending <span className="text-blue-600">Now.</span></h3>
        <Link to="#" className="text-xs font-bold text-slate-400 hover:text-black transition-colors capitalize tracking-widest flex items-center gap-2 group">
          Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className={`aspect-square rounded-3xl ${p.color} border border-gray-100 p-8 relative overflow-hidden transition-all duration-500 group-hover:border-slate-300`}>
              <img
                src={p.image}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                alt={p.name}
              />
              <span className="absolute top-4 left-4 text-[8px] font-bold capitalize tracking-[0.2em] bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                {p.tag}
              </span>
            </div>
            <div className="mt-4 px-2 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900 text-sm ">{p.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-blue-600 font-bold text-sm">{p.price}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold text-slate-400">4.9</span>
                  </div>
                </div>
              </div>
              <button className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                <ShoppingCart size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Fixed missing import in the created file
import { Link } from 'react-router-dom';
