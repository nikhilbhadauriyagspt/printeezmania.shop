import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Monitor } from "lucide-react";

const techProducts = [
  {
    name: "Blade 16",
    series: "Z-Series",
    perf: 98,
    thermal: 92,
    display: "4K OLED",
    icon: Zap,
    color: "bg-blue-600"
  },
  {
    name: "Precision 500",
    series: "Workstation",
    perf: 94,
    thermal: 99,
    display: "Pro Retina",
    icon: Activity,
    color: "bg-emerald-600"
  },
  {
    name: "Vantage X",
    series: "Ultra-Light",
    perf: 88,
    thermal: 95,
    display: "Liquid Retina",
    icon: Monitor,
    color: "bg-orange-600"
  }
];

export default function TechBlueprints() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-24 bg-white font-urbanist">

      {/* --- UNIQUE HEADING: TECHNICAL LINE STYLE --- */}
      <div className="flex items-center gap-8 mb-20">
        <div className="h-[100px] w-px bg-gray-200 relative hidden sm:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-slate-900  capitalize leading-none">
            Technical <br /><span className="text-blue-600 italic">Blueprints.</span>
          </h2>
          <p className="text-slate-400 font-bold text-xs capitalize tracking-widest mt-4 flex items-center gap-2">
            <span className="w-4 h-px bg-gray-300"></span> Performance Benchmarks 2026
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techProducts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-[3rem] border border-gray-100 bg-gray-50/30 relative group hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
          >
            <div className={`absolute top-10 right-10 w-12 h-12 rounded-2xl ${p.color} text-white flex items-center justify-center shadow-lg group-hover:rotate-[360deg] transition-transform duration-1000`}>
              <p.icon size={24} />
            </div>

            <div className="mb-12">
              <span className="text-[10px] font-bold tracking-widest text-blue-600 capitalize">{p.series}</span>
              <h3 className="text-3xl font-bold text-slate-900  mt-1">{p.name}</h3>
            </div>

            {/* Performance Bars */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-slate-400 capitalize tracking-widest">Processing Power</span>
                  <span className="text-sm font-bold text-slate-900">{p.perf}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.perf}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className={`h-full ${p.color} rounded-full`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-slate-400 capitalize tracking-widest">Thermal Efficiency</span>
                  <span className="text-sm font-bold text-slate-900">{p.thermal}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.thermal}%` }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className={`h-full ${p.color} rounded-full opacity-60`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-dashed border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 capitalize tracking-widest">Display Standard</p>
                  <p className="text-sm font-bold text-slate-900 capitalize">{p.display}</p>
                </div>
                <button className="text-[10px] font-bold text-blue-600 capitalize tracking-widest hover:underline">Full Specs</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
