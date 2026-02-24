import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const exclusiveProducts = [
  {
    name: "PrimeBook Ultra X",
    desc: "The world's most powerful 14-inch workstation. Engineered for 8K video editing and heavy 3D workflows.",
    price: "$3,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    accent: "from-blue-600 to-indigo-600"
  },
  {
    name: "Zenith Liquid G1",
    desc: "First laptop with integrated liquid-vapor cooling. Overclocked RTX 4090 for the ultimate gaming edge.",
    price: "$4,499",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop",
    accent: "from-purple-600 to-rose-600"
  }
];

export default function ExclusiveShowcase() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-urbanist relative overflow-hidden">

      {/* --- UNIQUE HEADING: WATERMARK STYLE --- */}
      <div className="relative mb-20">
        <span className="absolute -top-12 -left-4 text-[120px] font-bold text-gray-50 select-none pointer-events-none  capitalize">
          Exclusive
        </span>
        <div className="relative z-10">
          <span className="text-blue-600 font-bold text-xs tracking-[0.4em] capitalize block mb-2 ml-1">Limited Edition</span>
          <h2 className="text-5xl font-bold text-slate-900  capitalize">
            The <span className="italic">Elite</span> Series.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {exclusiveProducts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 p-8 lg:p-12 hover:bg-white hover:border-blue-500/20 transition-all duration-700"
          >
            {/* Image Side */}
            <div className="w-full lg:w-1/2 aspect-video overflow-hidden rounded-[2.5rem] bg-white shadow-sm border border-gray-100">
              <img src={p.image} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt={p.name} />
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
              <div className={`h-1 w-20 bg-gradient-to-r ${p.accent} mb-8 rounded-full`}></div>
              <h3 className="text-4xl font-bold text-slate-900  mb-4 capitalize">{p.name}</h3>
              <p className="text-slate-500 text-lg font-bold leading-relaxed mb-8 max-w-lg">{p.desc}</p>

              <div className="flex items-center gap-8 mb-10">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 capitalize tracking-widest mb-1">Starting Price</p>
                  <p className="text-3xl font-bold text-slate-900">{p.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button size="xl" className="flex-1 sm:flex-none bg-black hover:bg-blue-600 text-white rounded-2xl px-10 h-14 font-bold text-xs tracking-widest shadow-xl transition-all">
                  ORDER NOW <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <button className="h-14 w-14 rounded-2xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
