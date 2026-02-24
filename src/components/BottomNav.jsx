import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();
  const { cartCount, openCartDrawer, openSearch } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Store', path: '/shop', icon: ShoppingBag },
    { name: 'Search', type: 'button', onClick: openSearch, icon: Search },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Account', path: '/login', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.type === 'button') {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-1 w-full"
              >
                <div className="relative text-slate-400">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-bold capitalize text-slate-400 tracking-tighter">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 w-full relative"
            >
              <div className={`relative ${isActive ? 'text-[#007DBA]' : 'text-slate-400'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.name === 'Store' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-4 w-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-bold capitalize tracking-tighter ${isActive ? 'text-[#003B5C]' : 'text-slate-400'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
