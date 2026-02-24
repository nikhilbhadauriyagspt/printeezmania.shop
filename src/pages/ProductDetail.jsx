import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  CheckCircle,
  Zap,
  Sparkles,
  CheckCircle2,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;

          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin h-12 w-12 text-[#007DBA] mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Verifying Hardware...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Device Not Found</h2>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm">Return to Catalog</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600";

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />
      
      <div className="container mx-auto px-4 lg:px-6 mt-8">

        {/* --- MINIMALIST BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-12">
          <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#007DBA] transition-colors">Catalog</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left Stage: Visual Gallery */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="aspect-square bg-[#F8FAFC] rounded-[3rem] border border-slate-100 flex items-center justify-center p-12 overflow-hidden relative group"
            >
              <img
                src={mainImage} alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-1000"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-8 right-8 h-12 w-12 rounded-full flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'bg-white border border-slate-100 text-slate-300 hover:text-red-500 hover:border-red-100 shadow-sm'}`}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </motion.div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={`h-24 w-24 rounded-2xl border-2 flex-shrink-0 flex items-center justify-center p-4 transition-all bg-white ${activeImage === idx ? 'border-[#007DBA]' : 'border-slate-50 hover:border-slate-200'}`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Stage: Tech Specs & Control */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-blue-50 text-[#007DBA] text-[10px] font-bold uppercase tracking-widest rounded-lg border border-blue-100">
                  {product.brand_name || 'AUTHENTIC'}
                </span>
                <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6">
                <span className="text-5xl font-black text-slate-900 leading-none">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-400 line-through">MSRP ${product.sale_price}</span>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Limited Offer</span>
                  </div>
                )}
              </div>

              {product.description && (
                <div className="relative pt-8 mt-8 border-t border-slate-100">
                  <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* Controller Module */}
            <div className="space-y-10">
              <div className="flex flex-wrap gap-4">
                <div className="h-14 px-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-8">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 rounded-xl bg-white text-slate-600 flex items-center justify-center hover:text-[#007DBA] transition-all">
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-black text-slate-900 w-6 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-xl bg-white text-slate-600 flex items-center justify-center hover:text-[#007DBA] transition-all">
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart} disabled={isAdded}
                  className={`flex-grow h-14 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-70 ${isAdded ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-900 text-white hover:bg-[#007DBA] shadow-slate-200'}`}
                >
                  {isAdded ? <><CheckCircle2 size={20} strokeWidth={3} /> Added to Cart</> : <><ShoppingCart size={20} /> Purchase Now</>}
                </button>

                <button className="h-14 w-14 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-white transition-all">
                  <Share2 size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-100">
                {[
                  { icon: Truck, label: "Fast Shipping" },
                  { icon: ShieldCheck, label: "HP Warranty" },
                  { icon: RefreshCcw, label: "30-Day Policy" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-3 group p-4 rounded-3xl hover:bg-slate-50 transition-all">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#007DBA] group-hover:scale-110 transition-all">
                      <item.icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED HARDWARE (Spotlight Style) --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-slate-100">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-10 w-1 bg-[#007DBA] rounded-full" />
              <div className="space-y-0.5">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Discovery</h2>
                <p className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-widest">Recommended hardware configurations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="group flex flex-col" onClick={() => window.scrollTo(0, 0)}>
                  <div className="aspect-square bg-white rounded-[2.5rem] border border-slate-100 transition-all duration-500 flex items-center justify-center p-6 relative overflow-hidden group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] group-hover:border-blue-100 group-hover:-translate-y-1">
                    <img src={getImagePath(p.images)} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="mt-5 px-2 space-y-1 text-center">
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#007DBA] transition-colors leading-snug line-clamp-1 capitalize">{p.name}</h4>
                    <span className="text-sm font-black text-slate-900">${p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
