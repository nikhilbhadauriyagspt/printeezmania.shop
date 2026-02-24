import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

export default function CategorySection({ title, subtitle, categoryKeyword, bgColor = "bg-white" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?limit=100`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filtered = data.data.filter(p =>
            p.name.toLowerCase().includes(categoryKeyword.toLowerCase())
          ).slice(0, 6);
          setProducts(filtered);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [categoryKeyword]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (!loading && products.length === 0) return null;

  return (
    <section className={`px-6 md:px-10 lg:px-12 py-24 ${bgColor} font-urbanist`}>
      <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] capitalize text-blue-600 mb-2 block ml-1">{subtitle}</span>
          <h2 className="text-4xl font-bold text-slate-900  capitalize leading-none">
            {title.split(' ')[0]} <span className="text-slate-400 italic">{title.split(' ').slice(1).join(' ')}.</span>
          </h2>
        </div>
        <button className="text-xs font-bold capitalize tracking-widest text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors pb-1">
          View All <ArrowRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-200" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-3 border border-gray-100 group-hover:border-blue-500/20 transition-all duration-300 flex items-center justify-center p-4">
                <img
                  src={getImagePath(p.images)}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 right-2 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full h-8 bg-black text-white rounded-lg flex items-center justify-center gap-2 text-[9px] font-bold capitalize tracking-widest hover:bg-blue-600 transition-colors">
                    <ShoppingBag size={12} /> Add
                  </button>
                </div>
              </div>
              <div className="px-1">
                <h3 className="text-[11px] font-bold text-slate-800 line-clamp-1 mb-0.5">{p.name}</h3>
                <span className="text-xs font-bold text-slate-900">${p.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
