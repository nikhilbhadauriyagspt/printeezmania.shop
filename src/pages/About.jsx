import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Heart, Globe, Award, Printer, Package, Wrench, Leaf, ChevronRight, CheckCircle2, Headphones, Sparkles, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <SEO
        title="About Us | Our Mission & Partnership"
        description="Learn about our commitment to authorized HP excellence, our journey, and the core pillars that drive our specialized hardware services."
      />

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#F8FAFC] border-b border-slate-100 pt-12 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900">About Us</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight">
                  Authorized <span className="text-[#007DBA]">Excellence.</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-xl">
                  Setting the benchmark for professional-grade hardware acquisition and certified support.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 size={16} className="text-[#007DBA]" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Official HP Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 mt-20 space-y-32">

        {/* --- SECTION 1: THE STORY --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#007DBA] rounded-full" />
                <span className="text-xs font-bold text-[#007DBA] uppercase tracking-[0.2em]">Our Foundation</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Built on Trust and Precision.</h2>
            </div>
            <div className="space-y-8">
              <p className="text-slate-600 text-lg lg:text-xl font-medium leading-relaxed">
                Founded in 2026, PrinteezMania was established to solve a singular challenge: making the acquisition of high-performance printing infrastructure simple, transparent, and absolutely authentic.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h4 className="text-3xl font-black text-slate-900">100%</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Genuine HP Inventory</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-black text-slate-900">24/7</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certified Tech Support</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-slate-100 group shadow-2xl shadow-blue-900/5">
              <img src={banner1} alt="Hardware Distribution" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur-xl rounded-[2.5rem] border border-white/20">
                <p className="text-xs font-medium text-slate-500 italic leading-relaxed">
                  "We bridge the gap between industrial-grade manufacturing and a personalized, retail-first experience."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: SPECIALIZED SERVICES --- */}
        <section className="space-y-16">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#007DBA] rounded-full" />
              <span className="text-xs font-bold text-[#007DBA] uppercase tracking-[0.2em]">Operational Scope</span>
              <div className="h-px w-8 bg-[#007DBA] rounded-full" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900">Core Capabilities.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Printer, title: "Hardware Deployment", desc: "Expert selection of LaserJet, All-in-One, and high-volume industrial systems." },
              { icon: Package, title: "Supply Chain", desc: "Authorized source for 100% genuine HP ink, toner, and certified replacement parts." },
              { icon: Headphones, title: "Specialist Support", desc: "Factory-trained technicians providing troubleshooting and installation guidance." }
            ].map((item, i) => (
              <motion.div
                key={i} whileHover={{ y: -5 }}
                className="p-12 rounded-[3rem] bg-[#F8FAFC] border border-slate-100 group transition-all hover:bg-white hover:border-[#007DBA]/20 hover:shadow-[0_30px_60px_-20px_rgba(0,125,186,0.1)] flex flex-col justify-between min-h-[340px]"
              >
                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-[#007DBA] group-hover:bg-[#007DBA] group-hover:text-white transition-all duration-500">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: VISION MODULES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-16 rounded-[3.5rem] bg-[#0F172A] text-white space-y-8 relative overflow-hidden group border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#007DBA]/10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-[#007DBA]/20 transition-colors duration-700" />
            <div className="flex items-center gap-3">
              <Target className="text-[#007DBA]" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Our Mission</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">The Customer <br /><span className="text-[#007DBA]">Standard.</span></h3>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
              To empower professionals with reliable, efficient, and sustainable hardware solutions through original products and certified advice.
            </p>
          </div>
          
          <div className="p-16 rounded-[3.5rem] bg-[#F8FAFC] border border-slate-100 text-slate-900 space-y-8 relative overflow-hidden group hover:border-[#007DBA]/20 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-3xl rounded-full -mr-20 -mt-20" />
            <div className="flex items-center gap-3">
              <Users className="text-[#007DBA]" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Our Community</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">Nationwide <br /><span className="text-[#007DBA]">Scale.</span></h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
              Expanding across the United States to deliver professional HP technology with unmatched logistics and long-term service value.
            </p>
          </div>
        </div>

        {/* --- SECTION 4: INFRASTRUCTURE LIST --- */}
        <div className="pb-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-10 w-1 bg-[#007DBA] rounded-full" />
            <div className="space-y-0.5">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">The Edge</h2>
              <p className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-widest">Certified hardware ecosystem advantages</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Authorized Status", icon: ShieldCheck },
              { title: "Genuine Supplies", icon: Package },
              { title: "Hardware Service", icon: Zap },
              { title: "Safe Logistics", icon: Globe },
              { title: "Original Hardware", icon: CheckCircle2 },
              { title: "Technical Center", icon: Headphones },
              { title: "Sustainable Tech", icon: Leaf },
              { title: "Professional Hub", icon: Wrench }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-[#F8FAFC] transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#007DBA] group-hover:text-white group-hover:border-[#007DBA] group-hover:rotate-6">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
