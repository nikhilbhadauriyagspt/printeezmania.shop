import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Zap, Headphones, Check, Printer, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

// Import local banner assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: 1,
    title: "HP LaserJet Pro Series",
    subtitle: "Authorized. Original. Unstoppable.",
    desc: "Experience professional-grade speed and world-class security with the latest HP printing technology.",
    image: banner1,
    link: "/shop?category=printers"
  },
  {
    id: 2,
    title: "Genuine Ink & Toner",
    subtitle: "Precision engineering for HP.",
    desc: "Guarantee peak performance and vibrant results with 100% original HP supplies and cartridges.",
    image: banner2,
    link: "/shop?category=accessories"
  },
  {
    id: 3,
    title: "Modern Office Hub",
    subtitle: "Efficiency built for your team.",
    desc: "Discover all-in-one systems that combine high-volume scanning, copying, and printing.",
    image: banner3,
    link: "/shop"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="bg-[#F8FAFC] font-sans">
      <div className="container mx-auto px-4 lg:px-0 py-10 md:py-16">

        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Main Stage (Left / Full on Mobile) */}
          <div className="lg:w-3/4 relative h-[450px] md:h-[550px] lg:h-[600px] bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200">

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image with sophisticated overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
                <img
                  src={slides[current].image}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-center p-8 md:p-12 lg:p-20">
                  <div className="max-w-xl space-y-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#007DBA] text-white rounded-md text-[10px] font-bold uppercase tracking-widest"
                    >
                      Official Hardware Partner
                    </motion.div>

                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]"
                    >
                      {slides[current].title}
                    </motion.h1>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-base md:text-xl text-slate-600 font-medium leading-relaxed"
                    >
                      {slides[current].subtitle} <br />
                      <span className="text-slate-400 text-sm md:text-base font-normal">{slides[current].desc}</span>
                    </motion.p>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4 flex items-center gap-4"
                    >
                      <Link to={slides[current].link} className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-[#007DBA] transition-all flex items-center gap-3 group shadow-xl shadow-slate-200">
                        Shop Now
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Manual Controls */}
            <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Side Highlights (Right / Bottom on Mobile) */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between group cursor-pointer hover:border-[#007DBA]/30 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#007DBA]">
                  <Printer size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Latest <br /> Printers</h3>
                <p className="text-xs text-slate-500 font-medium">Explore the new 2026 LaserJet Pro lineup.</p>
              </div>
              <Link to="/shop?category=printers" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#007DBA] group-hover:gap-3 transition-all">
                Browse All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="flex-1 bg-[#003B5C] rounded-[2rem] p-8 border border-white/5 shadow-sm flex flex-col justify-between text-white group cursor-pointer hover:bg-[#002a42] transition-all relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#007DBA]">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold">Fast <br /> Delivery</h3>
                <p className="text-xs text-white/60 font-medium">Get your supplies delivered within 24 hours.</p>
              </div>
              <Link to="/shop?category=accessories" className="relative z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#007DBA] group-hover:gap-3 transition-all">
                Order Supplies <ArrowRight size={14} />
              </Link>
              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#007DBA]/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* --- REFINED PREMIUM TRUST BAR (Soft & Shadowless) --- */}
        <div className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <ShieldCheck size={22} />, title: "30-Day Warranty", sub: "100% Genuine Supplies", bg: "bg-blue-50/50", iconBg: "bg-blue-100", color: "text-blue-600" },
              { icon: <Zap size={22} />, title: "Express Dispatch", sub: "Nationwide Daily", bg: "bg-amber-50/50", iconBg: "bg-amber-100", color: "text-amber-600" },
              { icon: <Headphones size={22} />, title: "Certified Support", sub: "Expert Technicians", bg: "bg-emerald-50/50", iconBg: "bg-emerald-100", color: "text-emerald-600" },
              { icon: <Check size={22} />, title: "Official Warranty", sub: "Manufacturer Backup", bg: "bg-sky-50/50", iconBg: "bg-sky-100", color: "text-[#007DBA]" }
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-5 p-5 rounded-[2rem] ${item.bg} border border-white transition-all duration-500 hover:bg-white hover:border-slate-100 cursor-default group`}>
                <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[13px] font-bold text-slate-900 leading-tight">{item.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium tracking-tight">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
