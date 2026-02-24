import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search, User, Heart, ShoppingCart, Menu, X, ChevronDown,
  Package, Loader2, Monitor, Printer,
  Laptop, Cpu, MousePointer2, Smartphone, CheckCircle2, ChevronRight, Headset
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchCat, setSelectedSearchCat] = useState('all');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const catRef = useRef(null);

  const isActive = (path, category = null) => {
    if (category) {
      return location.pathname === path && new URLSearchParams(location.search).get('category') === category;
    }
    // For Shop All, make it active if we're on /shop and no category is set
    if (path === '/shop') {
      return location.pathname === '/shop' && !new URLSearchParams(location.search).get('category');
    }
    return location.pathname === path;
  };

    const navItemClass = (path, category = null) => {
      const active = isActive(path, category);
      return `text-sm font-semibold transition-all relative px-4 py-2 rounded-lg inline-flex items-center justify-center z-10 ${
        active ? 'text-white shadow-sm' : 'text-slate-600 hover:text-[#007DBA] hover:bg-slate-50'
      }`;
    };

  const activeIndicator = (path, category = null) => {
    if (!isActive(path, category)) return null;
    return (
      <motion.div
        layoutId="activeNav"
        className="absolute inset-0 bg-[#007DBA] rounded-lg -z-10"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    );
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filtered = data.data.filter(c => !c.name.toLowerCase().includes('laptop'));
          setCategories(filtered);
          if (filtered.length > 0) setActiveCategoryTab(filtered[0].id);
        }
      }).catch(err => console.error(err));

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (event) => {
      if (catRef.current && !catRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedSearchCat !== 'all') url += `&category=${selectedSearchCat}`;
      navigate(url);
      setSearchQuery('');
      setSuggestions({ products: [], categories: [] });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          let url = `${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=50`;
          if (selectedSearchCat !== 'all') url += `&category=${selectedSearchCat}`;

          const pRes = await fetch(url);
          const pData = await pRes.json();

          // Flatten categories to search for matched ones
          const allCats = categories.flatMap(c => [c, ...(c.children || [])]);
          const matchedCats = allCats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3);

          setSuggestions({
            products: pData.status === 'success' ? pData.data : [],
            categories: matchedCats
          });
        } catch (err) { console.error(err); } finally { setIsSearching(false); }
      } else { setSuggestions({ products: [], categories: [] }); }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories, selectedSearchCat]);

  const getCategoryIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('laptop')) return <Laptop size={16} strokeWidth={1.5} />;
    if (n.includes('printer')) return <Printer size={16} strokeWidth={1.5} />;
    if (n.includes('accessor')) return <MousePointer2 size={16} strokeWidth={1.5} />;
    if (n.includes('monitor')) return <Monitor size={16} strokeWidth={1.5} />;
    if (n.includes('component')) return <Cpu size={16} strokeWidth={1.5} />;
    if (n.includes('phone')) return <Smartphone size={16} strokeWidth={1.5} />;
    return <Package size={16} strokeWidth={1.5} />;
  };

  const activeParent = categories.find(c => c.id === activeCategoryTab);

  return (
    <header className="w-full fixed top-0 left-0 z-[150] bg-white font-sans transition-all duration-300">
      {/* Announcement Strip */}
      <div className="bg-slate-900 border-b border-white/5 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-[11px] font-medium text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90"><CheckCircle2 size={12} className="text-[#007DBA]" /> HP Authorized Partner</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-500 font-bold border-l border-slate-700 pl-6 uppercase tracking-wider">A subsidiary of Primefix Solutions</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-[#007DBA]" /> Free Express Shipping Over $150</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
            <Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className={`container mx-auto px-4 py-4 md:py-6 flex items-center justify-between gap-6 md:gap-12 transition-all ${scrolled ? 'md:py-3 shadow-sm' : ''}`}>
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/logo/PrinteezMania_logo.png" alt="PrinteezMania" className={`object-contain transition-all duration-300 ${scrolled ? 'h-8' : 'h-10 md:h-12'}`} />
        </Link>

        {/* Improved Search Bar with Category Select */}
        <div className="hidden md:flex flex-1 max-w-3xl relative">
          <form onSubmit={handleSearch} className="flex w-full items-center bg-slate-100 rounded-xl p-1 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#007DBA]/10 transition-all border border-transparent focus-within:border-slate-200">
            <select
              value={selectedSearchCat}
              onChange={(e) => setSelectedSearchCat(e.target.value)}
              className="bg-white border-none rounded-lg text-xs font-semibold text-slate-600 px-4 py-2 outline-none cursor-pointer hover:bg-slate-50 transition-colors max-w-[160px] truncate"
            >
              <option value="all">All Departments</option>
              {categories.map(cat => (
                <optgroup key={cat.id} label={cat.name}>
                  <option value={cat.slug}>{cat.name}</option>
                  {cat.children && cat.children.map(child => (
                    <option key={child.id} value={child.slug}>
                      &nbsp;&nbsp;{child.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <div className="h-4 w-px bg-slate-200 mx-2" />

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="What are you looking for today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-sm font-medium outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <button type="submit" className="bg-[#007DBA] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#006699] transition-all group">
              {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} strokeWidth={2.5} />}
              <span className="text-xs font-bold">Search</span>
            </button>
          </form>

          {/* Search Results Overlay */}
          <AnimatePresence>
            {(suggestions.products.length > 0 || suggestions.categories.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[200]"
              >
                <div className="max-h-[70vh] overflow-y-auto">
                  {suggestions.categories.length > 0 && (
                    <div className="p-4 bg-slate-50/50 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Matched Departments</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.categories.map(cat => (
                          <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setSearchQuery('')} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 hover:border-[#007DBA] hover:text-[#007DBA] rounded-lg text-xs font-bold transition-all">
                            {cat.name} <ChevronRight size={12} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-3">
                    {suggestions.products.map(p => (
                      <Link
                        key={p.id} to={`/product/${p.slug}`}
                        onClick={() => setSearchQuery('')}
                        className="flex items-center gap-5 p-3 hover:bg-slate-50 rounded-xl transition-all group"
                      >
                        <div className="w-14 h-14 bg-white border border-slate-100 rounded-lg flex items-center justify-center p-1.5 shrink-0 group-hover:border-[#007DBA]/20 transition-all">
                          <img
                            src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''}
                            alt={p.name} className="max-w-full max-h-full object-contain"
                            onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate group-hover:text-[#007DBA] transition-colors">{p.name}</p>
                          <p className="text-xs font-bold text-[#007DBA] mt-1">${p.price}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-[#007DBA] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-7">
          <div className="group relative">
            <Link to={user ? "/profile" : "/login"} className="flex items-center gap-3 text-slate-600 hover:text-[#007DBA] transition-all">
              <div className="h-10 w-10 flex items-center justify-center bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors">
                <User size={22} strokeWidth={1.5} />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] font-bold text-slate-400 leading-none mb-1">Account</p>
                <p className="text-xs font-bold text-slate-700 truncate max-w-[80px]">
                  {user ? user.name.split(' ')[0] : 'Sign In'}
                </p>
              </div>
            </Link>
            {user && (
              <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[200] p-2">
                <Link to="/profile" className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007DBA] rounded-lg transition-all">My Profile</Link>
                <Link to="/orders" className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007DBA] rounded-lg transition-all">Order History</Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all mt-1">Sign Out</button>
              </div>
            )}
          </div>

          <Link to="/wishlist" className="flex items-center justify-center h-10 w-10 text-slate-600 hover:bg-slate-50 hover:text-[#007DBA] transition-all relative rounded-full">
            <Heart size={22} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button onClick={openCartDrawer} className="flex items-center justify-center h-10 w-10 bg-slate-900 text-white hover:bg-[#007DBA] transition-all relative rounded-full shadow-lg active:scale-95">
            <ShoppingCart size={20} strokeWidth={2} />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden h-10 w-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Navigation & Mega Menu Categories Bar */}
      <div className="bg-white border-t border-slate-100 hidden lg:block shadow-sm">
        <div className="container mx-auto px-0 flex items-center justify-between">
          <div
            ref={catRef}
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}

          >
            <button
              className="bg-slate-900 text-white px-8 py-3.5 flex items-center gap-3 font-bold text-xs hover:bg-[#007DBA] transition-all rounded-t-sm"
            >
              <Menu size={16} /> All Collections
            </button>

            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute top-full left-0 right-0 w-full bg-white shadow-xl border-t border-slate-100 z-[200] overflow-hidden"
                >
                  <div className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                      <div className="mb-8 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-400 tracking-wider">Explore All Departments</h3>
                        <Link to="/shop" onClick={() => setIsCategoryOpen(false)} className="text-xs font-bold text-[#007DBA] hover:underline">View All Collections</Link>
                      </div>

                      <div className="category-slider-container">
                        <Swiper
                          modules={[Autoplay, FreeMode]}
                          spaceBetween={40}
                          slidesPerView={'auto'}
                          freeMode={{
                            enabled: true,
                            momentum: false,
                          }}
                          speed={6000}
                          autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                          }}
                          loop={true}
                          className="marquee-swiper"
                        >
                          {categories.flatMap(cat => [cat, ...(cat.children || [])]).map((c, idx) => (
                            <SwiperSlide key={`${c.id}-${idx}`} className="!w-auto">
                              <Link
                                to={`/shop?category=${c.slug}`}
                                onClick={() => setIsCategoryOpen(false)}
                                className="flex flex-col items-center gap-4 group"
                              >
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden group-hover:border-[#007DBA] group-hover:shadow-lg transition-all duration-500 ring-4 ring-transparent group-hover:ring-[#007DBA]/5">
                                  {c.image ? (
                                    <img
                                      src={`/${c.image}`}
                                      alt={c.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&background=f8fafc&color=007dba&bold=true`; }}
                                    />
                                  ) : (
                                    <div className="flex flex-col items-center text-slate-300 group-hover:text-[#007DBA] transition-colors">
                                      {getCategoryIcon(c.name)}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[11px] font-bold text-slate-600 tracking-tight group-hover:text-[#007DBA] transition-colors">{c.name}</span>
                              </Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex items-center gap-2">
            <Link to="/" className={navItemClass('/')}>
              Home
              {activeIndicator('/')}
            </Link>
            <Link to="/shop" className={navItemClass('/shop')}>
              Shop All
              {activeIndicator('/shop')}
            </Link>
            <Link to="/shop?category=printers" className={navItemClass('/shop', 'printers')}>
              Printers
              {activeIndicator('/shop', 'printers')}
            </Link>
            <Link to="/shop?category=printer-accessories" className={navItemClass('/shop', 'printer-accessories')}>
              Ink & Supplies
              {activeIndicator('/shop', 'printer-accessories')}
            </Link>
            <Link to="/about" className={navItemClass('/about')}>
              About Us
              {activeIndicator('/about')}
            </Link>
            <Link to="/contact" className={navItemClass('/contact')}>
              Contact
              {activeIndicator('/contact')}
            </Link>
            <Link to="/faq" className={navItemClass('/faq')}>
              FAQ
              {activeIndicator('/faq')}
            </Link>
          </nav>

          <div className="hidden xl:flex items-center self-stretch">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-3.5 bg-[#007DBA] text-white text-xs font-bold hover:bg-[#006699] transition-all duration-300 rounded-t-sm"
            >
              <Headset size={16} />
              Support Center
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Refined with Sub-categories) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[210] md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <img src="/logo/PrinteezMania_logo.png" alt="Logo" className="h-7 object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Mobile Search */}
                <div className="p-6 border-b border-slate-100">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search printers, ink..."
                      className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#007DBA]/20 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={18} /></button>
                  </form>
                </div>

                <div className="p-6">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Store Departments</h3>
                  <div className="space-y-6">
                    {categories.map(cat => (
                      <div key={cat.id} className="space-y-3">
                        <Link to={`/shop?category=${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-slate-900 font-bold text-sm uppercase tracking-wide">
                          {cat.name}
                        </Link>
                        <div className="grid grid-cols-1 gap-2 pl-4 border-l border-slate-100">
                          {cat.children && cat.children.map(child => (
                            <Link key={child.id} to={`/shop?category=${child.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-semibold text-slate-500 hover:text-[#007DBA]">
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 space-y-3">
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-3 px-4 bg-slate-50 text-slate-700 font-bold text-sm rounded-xl text-center">My Account</Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-red-50 text-red-500 font-bold text-sm rounded-xl">Sign Out</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 bg-slate-900 text-white text-center font-bold text-sm rounded-xl shadow-lg">Sign In to Account</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
