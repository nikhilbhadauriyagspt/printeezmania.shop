import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Authorized Partner",
    desc: "100% Genuine HP Inventory",
    accent: "bg-amber-50 text-amber-600"
  },
  {
    icon: Truck,
    title: "Express Logistics",
    desc: "Fast Global Priority Delivery",
    accent: "bg-amber-50 text-amber-600"
  },
  {
    icon: ShieldCheck,
    title: "Elite Protection",
    desc: "Comprehensive Brand Warranty",
    accent: "bg-amber-50 text-amber-600"
  },
  {
    icon: Headphones,
    title: "Expert Support",
    desc: "24/7 Dedicated Consultation",
    accent: "bg-amber-50 text-amber-600"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-[#FFFEF7] font-snpro">
      <div className="max-w-[1800px] mx-auto px-6">
        
        {/* --- STANDARDIZED SECTION HEADER --- */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3 opacity-40">
            <div className="h-[1px] w-8 bg-amber-900" />
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-[0.4em]">The Standard</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#4A3728] tracking-tight">
            Strategic <span className="text-amber-500 italic font-light">Performance.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-5 group"
            >
              {/* Minimal Icon Hub */}
              <div className={`h-12 w-12 shrink-0 rounded-2xl border border-amber-100/50 flex items-center justify-center transition-all duration-500 group-hover:bg-[#4A3728] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-amber-900/10 text-amber-500 bg-white`}>
                <item.icon size={20} strokeWidth={1.5} />
              </div>

              {/* Precise Typography */}
              <div className="space-y-1.5 py-1">
                <h3 className="text-[13px] font-bold text-[#4A3728] uppercase tracking-wider group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-medium text-amber-900/40 leading-tight">
                  {item.desc}
                </p>
                
                {/* Micro-interaction Line */}
                <div className="h-0.5 w-4 bg-amber-200 rounded-full transition-all duration-500 group-hover:w-8 group-hover:bg-amber-500" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
