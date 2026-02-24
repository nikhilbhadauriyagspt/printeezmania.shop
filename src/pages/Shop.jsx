import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  ShoppingBag,
  Heart,
  X,
  Loader2,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Filter,
  ShoppingCart,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Filters
  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(c => !c.name.toLowerCase().includes('laptop'));
          setCategories(filtered);
        }
      });
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => setBrands(d.data));
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p =>
            !p.name.toLowerCase().includes('laptop') &&
            !p.name.toLowerCase().includes('macbook') &&
            !p.name.toLowerCase().includes('notebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (pathCategory && !newParams.get('category')) newParams.set('category', pathCategory);
    if (pathBrand && !newParams.get('brand')) newParams.set('brand', pathBrand);

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0]}`;
      }
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <SEO
        title="Hardware Catalog | PrinteezMania Authorized Store"
        description="Browse our complete authorized catalog of high-performance HP printers and genuine supplies."
      />

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#F8FAFC] border-b border-slate-100 pt-12 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-slate-900">Inventory Catalog</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight capitalize">
                  {category ? category.replace('-', ' ') : brand || 'Full Inventory'}
                </h1>
                <p className="text-slate-500 font-medium max-w-xl">
                  Explore our selection of {total} certified models and authentic supplies.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 size={16} className="text-[#007DBA]" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Authorized HP Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- SIDEBAR FILTERS --- */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
            
            {/* Departments */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Departments</h3>
              </div>
              
              <div className="space-y-1">
                <button
                  onClick={() => updateFilter('category', '')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${!category ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Collections
                </button>
                {categories.map(cat => (
                  <div key={cat.id} className="space-y-1">
                    <div className={`flex items-center justify-between group rounded-xl transition-all ${category === cat.slug ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                      <button
                        onClick={() => updateFilter('category', cat.slug)}
                        className={`flex-1 text-left px-4 py-3 text-sm font-semibold transition-colors ${category === cat.slug ? 'text-[#007DBA]' : 'text-slate-600 group-hover:text-slate-900'}`}
                      >
                        {cat.name}
                      </button>
                      {cat.children && cat.children.length > 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCategory(cat.id); }}
                          className="p-3 text-slate-300 hover:text-[#007DBA] transition-colors"
                        >
                          {expandedCategories[cat.id] ? <Minus size={14} /> : <Plus size={14} />}
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedCategories[cat.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l border-slate-100 ml-6 space-y-1 py-1">
                            {cat.children.map(sub => (
                              <button
                                key={sub.id}
                                onClick={() => updateFilter('category', sub.slug)}
                                className={`block w-full text-left px-4 py-2 text-xs font-semibold rounded-lg transition-all ${category === sub.slug ? 'text-[#007DBA] bg-blue-50/50' : 'text-slate-500 hover:text-[#007DBA] hover:bg-slate-50'}`}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Manufacturers */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Manufacturers</h3>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                {brands
                  .filter(b => products.some(p => p.brand_name === b.name) || brand === b.name)
                  .map(b => (
                  <label key={b.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className={`h-5 w-5 rounded-lg border-2 flex items-center justify-center transition-all ${brand === b.name ? 'bg-[#007DBA] border-[#007DBA]' : 'border-slate-200 bg-white group-hover:border-[#007DBA]'}`}>
                      {brand === b.name && <Check size={12} className="text-white" strokeWidth={4} />}
                    </div>
                    <button
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={`text-sm font-semibold transition-colors ${brand === b.name ? 'text-[#007DBA]' : 'text-slate-500 group-hover:text-slate-900'}`}
                    >
                      {b.name}
                    </button>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="flex-1 space-y-8">
            
            {/* Control Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4 px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Showing <span className="text-slate-900">{total}</span> Results
                </span>
                <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                    <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                    <List size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search model or type..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-[#007DBA]/10 focus:border-[#007DBA] outline-none transition-all"
                  />
                </div>
                
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2.5 rounded-xl text-xs font-bold text-slate-600 focus:ring-4 focus:ring-[#007DBA]/10 outline-none cursor-pointer shadow-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Name: A - Z</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all"
            >
              <SlidersHorizontal size={18} /> Refine Your Selection
            </button>

            {/* Products Display */}
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-50">
                <Loader2 className="h-12 w-12 animate-spin text-[#007DBA] mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Updating Hardware Index...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                <div className="inline-flex h-24 w-24 bg-slate-50 rounded-full items-center justify-center mb-6 text-slate-200">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No hardware matches your search</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">Try adjusting your filters or search keywords to find the right configuration.</p>
                <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200">Reset All Filters</button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className={`group relative bg-white rounded-3xl border border-slate-100 hover:border-[#007DBA]/20 transition-all duration-500 overflow-hidden flex ${viewMode === 'list' ? 'flex-row items-center p-6 gap-10' : 'flex-col p-5'}`}
                  >
                    {/* Visual Area */}
                    <Link 
                      to={`/product/${p.slug}`} 
                      className={`relative block overflow-hidden rounded-2xl bg-[#F8FAFC] group-hover:bg-blue-50/30 transition-colors duration-500 ${viewMode === 'list' ? 'w-56 h-56 shrink-0' : 'aspect-square mb-5'}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 group-hover:scale-110">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-opacity"
                        />
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md border border-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-[#007DBA]">
                          {p.brand_name || 'AUTHENTIC'}
                        </span>
                      </div>
                    </Link>

                    {/* Meta & Content */}
                    <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 py-4' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category_name || 'Printer'}</span>
                        <button
                          onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                          className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'bg-red-500 text-white' : 'text-slate-300 hover:text-red-500'}`}
                        >
                          <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                      
                      <Link to={`/product/${p.slug}`} className="block mb-4">
                        <h3 className={`font-bold text-slate-900 group-hover:text-[#007DBA] transition-colors leading-snug ${viewMode === 'list' ? 'text-2xl mb-2' : 'text-sm line-clamp-2'}`}>
                          {p.name}
                        </h3>
                        {viewMode === 'list' && (
                          <p className="text-slate-500 text-sm line-clamp-2 max-w-xl">
                            High-performance authorized hardware with professional features and security protocols.
                          </p>
                        )}
                      </Link>

                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Sale Price</p>
                          <p className="text-xl font-black text-slate-900 leading-none">${parseFloat(p.price).toLocaleString()}</p>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          disabled={addedItems[p.id]}
                          className={`h-11 px-5 rounded-xl flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg ${addedItems[p.id] ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-[#007DBA] shadow-slate-200'}`}
                        >
                          {addedItems[p.id] ? <Check size={16} strokeWidth={3} /> : (
                            <>
                              <ShoppingCart size={16} />
                              <span className={viewMode === 'list' ? 'inline' : 'hidden md:inline'}>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE REFINEMENT DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/40 z-[200] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white z-[210] flex flex-col lg:hidden border-l border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-900">Filter Selection</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-white rounded-full text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Departments</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={`text-left py-3 px-4 text-sm font-semibold rounded-xl transition-all ${category === cat.slug ? 'bg-[#007DBA] text-white' : 'bg-slate-50 text-slate-600'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100">
                <button
                  onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm active:scale-95 transition-all shadow-xl"
                >
                  Reset All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
