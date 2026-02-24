import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, Send, MessageCircle, ArrowRight, Loader2, CheckCircle2, ChevronRight, Headphones, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <SEO
        title="Contact Us | Expert Technical Support"
        description="Connect with the PrinteezMania team for technical support, bulk orders, or authorized hardware inquiries."
      />

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#F8FAFC] border-b border-slate-100 pt-12 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900">Support Center</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight">
                  Connect with <span className="text-[#007DBA]">Experts.</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-xl">
                  Dedicated technical support and professional hardware consultation.
                </p>
              </div>
              <div className="flex items-center gap-3 px-5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Headphones size={18} className="text-[#007DBA]" />
                <div className="h-4 w-px bg-slate-200" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Live Assistance Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="p-10 rounded-[2.5rem] bg-[#F8FAFC] border border-slate-100 group transition-all hover:bg-white hover:border-[#007DBA]/20">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-8 text-[#007DBA] group-hover:scale-110 transition-all duration-500">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Email Channel</h4>
              <p className="text-lg font-black text-slate-900 group-hover:text-[#007DBA] transition-colors">info@printeezmania.shop</p>
              <p className="text-[11px] font-bold text-slate-400 mt-2">Professional inquiry response within 24h.</p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-[#F8FAFC] border border-slate-100 group transition-all hover:bg-white hover:border-[#007DBA]/20">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-8 text-[#007DBA] group-hover:scale-110 transition-all duration-500">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Global Hub</h4>
              <p className="text-lg font-black text-slate-900 group-hover:text-[#007DBA] transition-colors">Las Vegas, NV</p>
              <p className="text-[11px] font-bold text-slate-400 mt-2">3140 Polaris Ave Ste 1, 89102, USA</p>
            </div>

            {/* HP Trust Module */}
            <div className="p-12 rounded-[3rem] bg-[#0F172A] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#007DBA]/10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-[#007DBA]/20 transition-colors duration-700" />
              <img src="/brands/hp.png" alt="HP" className="h-10 w-auto object-contain mb-8" />
              <h4 className="text-xl font-black mb-3">Certified Support.</h4>
              <p className="text-sm font-medium text-slate-400 leading-relaxed">Our experts are factory-trained by HP to provide absolute technical accuracy.</p>
            </div>
          </div>

          {/* Contact Form Stage */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3.5rem] border border-slate-100 p-8 md:p-16">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="h-24 w-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">Request Transmitted.</h2>
                  <p className="text-slate-400 font-medium text-sm mb-12">An authorized specialist has been assigned to your case and will respond shortly.</p>
                  <button onClick={() => setStatus(null)} className="px-12 py-5 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200">Submit New Inquiry</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                      <input
                        required type="text" placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-16 px-8 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                      <input
                        required type="email" placeholder="Email for correspondence"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-16 px-8 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                      <input
                        type="tel" placeholder="Mobile or Office number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-16 px-8 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Inquiry Subject</label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-16 px-8 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all appearance-none cursor-pointer"
                        >
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Order Tracking</option>
                          <option>Bulk Hardware Quotes</option>
                          <option>Warranty & RMA</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Detailed Message</label>
                    <textarea
                      required rows="6" placeholder="Please describe your technical request or inquiry in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-8 bg-[#F8FAFC] border border-slate-100 rounded-[2.5rem] focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : <><Send size={18} /> Transmit Message</>}
                  </button>
                  {status === 'error' && <p className="text-center text-red-500 text-xs font-bold uppercase tracking-widest">Transmission Failed. Please try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
