import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, HelpCircle, Search, Mail, MapPin, Plus, Minus, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on PrinteezMania?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on PrinteezMania secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell laptops, printers, and accessories from other trusted brands." },
      { q: "How can I choose the right hardware?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my hardware arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <SEO
        title="Knowledge Base | Technical FAQ"
        description="Find detailed answers to common questions about orders, authorized hardware, shipping, and certified HP support."
      />

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#F8FAFC] border-b border-slate-100 pt-12 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col gap-4">
              <nav className="flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
                <ChevronRight size={12} />
                <span className="text-slate-900">Support Center</span>
              </nav>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight">
                Knowledge <span className="text-[#007DBA]">Base.</span>
              </h1>
            </div>

            <div className="w-full max-w-2xl relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007DBA] transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search technical documentation or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-6 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-blue-900/5 focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-[#F8FAFC] rounded-[2.5rem] p-6 border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block ml-4">Departmental Index</span>
              <div className="space-y-1">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category);
                      setOpenIndex(0);
                    }}
                    className={`w-full text-left px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === cat.category
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-1'
                      : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:border-slate-100'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Assistance Module */}
            <div className="p-12 rounded-[3rem] bg-[#0F172A] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#007DBA]/10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-[#007DBA]/20 transition-colors duration-700" />
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-[#007DBA]" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Support</span>
              </div>
              <h4 className="text-2xl font-black mb-8 leading-tight text-white">Specific Technical <br /><span className="text-[#007DBA]">Questions?</span></h4>
              <div className="space-y-6">
                <a href="mailto:info@printeezmania.shop" className="flex items-center gap-4 group/link">
                  <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/link:bg-[#007DBA] transition-all"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Access</p>
                    <p className="text-sm font-bold text-white group-hover/link:text-[#007DBA] transition-colors">info@printeezmania.shop</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"><MapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authorized Hub</p>
                    <p className="text-sm font-bold text-white leading-none">Las Vegas, NV 89102</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-10 w-1 bg-[#007DBA] rounded-full" />
                  <h3 className="text-3xl font-black text-slate-900 leading-none">
                    {activeCategory}
                  </h3>
                </div>

                {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIndex === idx ? 'border-[#007DBA] shadow-xl shadow-blue-900/5' : 'border-slate-100 hover:border-slate-200'
                      }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                      className="w-full px-10 py-10 flex items-center justify-between text-left"
                    >
                      <span className={`text-lg font-bold leading-snug pr-12 transition-colors ${openIndex === idx ? 'text-[#007DBA]' : 'text-slate-900'
                        }`}>
                        {faq.q}
                      </span>
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${openIndex === idx ? 'bg-[#007DBA] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-[#007DBA] group-hover:text-white'
                        }`}>
                        {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <div className="px-10 pb-10">
                            <div className="bg-[#F8FAFC] rounded-3xl p-10 border border-slate-100">
                              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <Search size={48} className="text-slate-100 mx-auto mb-6" />
                    <h4 className="text-xl font-bold text-slate-900">No results found for your search</h4>
                    <p className="text-slate-400 font-medium mt-2">Adjust your keywords for broader technical results.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
