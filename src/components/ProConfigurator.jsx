import { motion } from "framer-motion";
import { Cpu, Zap, Shield, MousePointer2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "M3 Max Performance",
    desc: "Up to 80% faster than previous generations.",
    icon: Cpu,
    color: "bg-blue-50/50",
    iconColor: "text-blue-600",
    size: "lg"
  },
  {
    title: "Next-Gen Cooling",
    desc: "Silent and efficient thermal management.",
    icon: Zap,
    color: "bg-emerald-50/50",
    iconColor: "text-emerald-600",
    size: "sm"
  },
  {
    title: "Secure Silicon",
    desc: "Encrypted data protection.",
    icon: Shield,
    color: "bg-purple-50/50",
    iconColor: "text-purple-600",
    size: "sm"
  },
];

export default function ProConfigurator() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 bg-white font-urbanist">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* BIG BENTO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between h-[450px]"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-[0.3em] capitalize text-blue-400 mb-4 block">Engineered for Pro</span>
            <h3 className="text-5xl font-bold  mb-6 leading-none">BUILD YOUR <br />ULTIMATE RIG.</h3>
            <p className="text-slate-400 font-bold max-w-md">Customize every component to match your professional workflow. From memory to graphics.</p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <Button size="xl" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-12 font-bold text-xs tracking-widest transition-all">
              START CONFIGURING
            </Button>
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-2">
              <MousePointer2 size={12} /> 14,000+ CONFIGURATIONS
            </span>
          </div>
        </motion.div>

        {/* SIDE BENTO CARDS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {features.map((f, i) => (
            f.size === "sm" && (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex-1 p-6 rounded-3xl border border-gray-100 ${f.color} flex items-center gap-5 hover:border-slate-200 transition-all cursor-default group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-all ${f.iconColor}`}>
                  <f.icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{f.title}</h4>
                  <p className="text-[10px] font-bold text-slate-500 capitalize ">{f.desc}</p>
                </div>
              </motion.div>
            )
          ))}
        </div>

      </div>
    </section>
  );
}
