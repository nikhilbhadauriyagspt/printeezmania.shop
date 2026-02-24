import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Loader2, ShieldCheck, ArrowRight, Zap, Headphones, Truck, Phone, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          // Filter out laptops and show main categories
          const filtered = data.data.filter(c => !c.name.toLowerCase().includes('laptop')).slice(0, 5);
          setCategories(filtered);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white font-sans border-t border-slate-100">

      {/* --- TOP NEWSLETTER BAR --- */}
      <div className="bg-[#F8FAFC] border-b border-slate-100 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Stay updated with HP innovations.</h3>
              <p className="text-slate-500 font-medium">Join our mailing list for exclusive offers, new arrivals, and technical insights.</p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px] md:min-w-[450px]">
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-[#007DBA]/10 focus:border-[#007DBA] outline-none transition-all"
                />
              </div>
              <button
                disabled={loading}
                className="px-10 py-4 bg-[#007DBA] text-white rounded-xl font-bold text-sm hover:bg-[#006699] transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Subscribe <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- MAIN FOOTER LINKS --- */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Brand Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-6">
                <Link to="/" className="block">
                  <img src="/logo/PrinteezMania_logo.png" alt="PrinteezMania" className="h-10 md:h-12 object-contain" />
                </Link>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Your trusted authorized partner for premium HP printing solutions. We provide genuine hardware, consumables, and expert technical support for businesses and home offices nationwide.
                </p>
                <div className="pt-4 flex flex-col items-start gap-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">A subsidiary of</p>
                  <img src="/logo/primefixsolutions-logo.png" alt="Primefix Solutions" className="h-6 md:h-7 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex hidden items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#007DBA]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Support</p>
                    <p className="text-sm font-bold text-slate-900">+1 (800) 123-4567</p>
                  </div>
                </div>
                <div className="  flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#007DBA]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our Location</p>
                    <p className="text-sm font-bold text-slate-900">1327 Eraste Landry Rd, Lafayette, LA 70506, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Columns */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">Shop Index</h4>
              <ul className="space-y-2.5">
                {categories.map(cat => (
                  <React.Fragment key={cat.id}>
                    <li>
                      <Link to={`/shop?category=${cat.slug}`} className="text-sm font-bold text-slate-700 hover:text-[#007DBA] transition-colors">{cat.name}</Link>
                    </li>
                    {cat.children && cat.children.slice(0, 4).map(child => (
                      <li key={child.id} className="pl-3">
                        <Link to={`/shop?category=${child.slug}`} className="text-xs font-medium text-slate-500 hover:text-[#007DBA] transition-colors">{child.name}</Link>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
                <li className="pt-2">
                  <Link to="/shop" className="text-sm font-bold text-[#007DBA] hover:underline">Full Catalog</Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About PrinteezMania', path: '/about' },
                  { label: 'Contact Us', path: '/contact' },
                  { label: 'Frequently Asked Questions', path: '/faq' },
                  { label: 'Track Your Order', path: '/orders' },

                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm font-medium text-slate-500 hover:text-[#007DBA] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">Policies</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Privacy Policy', path: '/privacy-policy' },
                  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { label: 'Return & Refund Policy', path: '/return-policy' },
                  { label: 'Shipping & Delivery', path: '/shipping-policy' },
                  { label: 'Cookie Preferences', path: '/cookie-policy' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm font-medium text-slate-500 hover:text-[#007DBA] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* HP Verification */}
            <div className="lg:col-span-2 space-y-8 flex flex-col items-center md:items-start">
              <div className="p-6 bg-[#F8FAFC] border border-slate-100 rounded-3xl flex flex-col items-center text-center gap-4">
                <img src="/brands/hp.png" alt="HP Partner" className="h-12 w-auto object-contain" />
                <div>
                  <p className="text-xs font-black text-[#007DBA]">Authorised HP Partner</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- BOTTOM COMPLIANCE STRIP --- */}
      <div className="bg-[#0F172A] py-8 text-slate-400">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[11px] font-bold tracking-tight">
              <span>© 2026 PrinteezMania Solutions Group. All Rights Reserved.</span>
            </div>

            <div className="flex items-center gap-8 text-[11px] font-bold tracking-tight uppercase">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#007DBA]" /> <span>Verified Partner</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#007DBA]" /> <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[#007DBA]" /> <span>Nationwide Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
