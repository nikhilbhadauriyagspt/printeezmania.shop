import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function BrandMarquee() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setBrands(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching brands:", err);
        setLoading(false);
      });
  }, []);

  if (loading || brands.length === 0) return null;

  // Duplicate brands for seamless loop
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-white border-b border-slate-100 h-14 lg:h-20 flex items-center overflow-hidden">
      {/* Fixed Label - Adds structure */}
      <div className="hidden lg:flex px-10 h-full items-center border-r border-slate-100 bg-slate-50/20 z-20">
        <span className="text-[10px] font-bold capitalize tracking-[0.3em] text-slate-400 whitespace-nowrap">
          Our Partners
        </span>
      </div>

      {/* Scrolling Ticker Area */}
      <div className="flex-1 overflow-hidden relative group h-full pause-on-hover cursor-pointer">
        {/* Gradients for smooth entrance/exit */}
        <div className="absolute inset-y-0 left-0 w-12 lg:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 lg:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee h-full items-center">
          {marqueeBrands.map((brand, idx) => (
            <Link
              key={idx}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="flex-shrink-0 mx-6 lg:mx-10 flex items-center justify-center h-full transition-all duration-500 cursor-pointer"
            >
              <img
                src={brand.logo.startsWith('http') ? brand.logo : `/${brand.logo}`}
                alt={brand.name}
                className="h-6 lg:h-10 w-auto object-contain transition-all duration-500 hover:scale-110 opacity-90 hover:opacity-100"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
