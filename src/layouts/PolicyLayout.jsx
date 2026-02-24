import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-[#FFFEF7] min-h-screen font-snpro pb-20 selection:bg-amber-500 selection:text-white pt-24">
      {/* --- HEADER --- */}
      <div className="max-w-[1800px] mx-auto px-6 mb-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">{title}</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-[#4A3728] tracking-tight">
                  {title.split(' ').slice(0, -1).join(' ')} <span className="text-amber-500 italic font-light">{title.split(' ').slice(-1)}</span>
                </h1>
                {subtitle && (
                  <p className="text-amber-900/60 text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-amber-100 shadow-sm shrink-0">
                <Clock size={14} className="text-amber-500" />
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Revised: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT --- */}
      <article className="max-w-[1800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-full bg-white p-10 md:p-16 rounded-[3rem] border border-amber-100 shadow-sm prose prose-slate prose-headings:text-[#4A3728] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-amber-900/60 prose-p:leading-relaxed prose-li:text-amber-900/60 prose-strong:text-[#4A3728] prose-a:text-amber-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
