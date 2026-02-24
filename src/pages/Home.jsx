import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import FeaturedTabs from "@/components/FeaturedTabs";
import ProductAccordion from "@/components/ProductAccordion";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

export default function Home() {
  const [data, setData] = useState({
    printers: [],
    accessories: [],
    all: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const all = prodRes.data.filter(p => !p.name.toLowerCase().includes('laptop') && !p.name.toLowerCase().includes('macbook') && !p.name.toLowerCase().includes('notebook'));
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          setData({
            all,
            printers,
            accessories,
            laserPrinters: all.filter(p => p.name.toLowerCase().includes('laserjet') || p.name.toLowerCase().includes('laser')),
            categories: catRes.data.filter(c => !c.name.toLowerCase().includes('laptop')),
            brands: brandRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#F8FAFC] font-sans overflow-x-hidden text-slate-900">
            <SEO
              title="Authorized HP Partner | Premium Printers, Genuine Ink & Toner"
              description="Shop authorized HP printers, genuine ink, toner, and premium tech accessories at PrinteezMania. Your trusted partner for high-performance printing solutions in Lafayette, LA and nationwide."
              keywords="HP Authorized Partner, Buy HP Printers Online, Genuine HP Ink and Toner, HP LaserJet, HP OfficeJet, Printer Accessories, Business Printing Solutions, Lafayette Tech Store"
            />      
      {/* 1. HERO */}
      <Hero products={data.all} />

      {/* 2. CATEGORY SECTION */}
      <ShopByCategory categories={data.categories} />

      {/* 3. FEATURED PRODUCTS (TABS) - Moved here after Category */}
      <FeaturedTabs 
        printers={data.printers} 
        accessories={data.accessories} 
      />

      {/* 4. NEW ARRIVALS */}
      <SpotlightSection products={data.all} />

      {/* 5. INTERACTIVE ACCORDION */}
      <ProductAccordion 
        products={data.laserPrinters || []} 
        title="Laser" 
        subtitle="Archive." 
        categorySlug="laser-printers"
      />
    </div>
  );
}
