import { useState, useEffect } from 'react';
import { Package, Users, ShoppingCart, AlertTriangle } from 'lucide-react';
import API_BASE_URL from '../../config';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, brands: 0, users: 0, low_stock: 0 });

  useEffect(() => {
    fetch(`${API_BASE_URL}/admin/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setStats(data.data);
      });
  }, []);

  const cards = [
    { title: "Total Products", value: stats.products, icon: Package, color: "bg-blue-500" },
    { title: "Active Users", value: stats.users, icon: Users, color: "bg-emerald-500" },
    { title: "Total Brands", value: stats.brands, icon: ShoppingCart, color: "bg-purple-500" },
    { title: "Low Stock", value: stats.low_stock, icon: AlertTriangle, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900  mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-bold capitalize tracking-wider mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-slate-900">{card.value}</h3>
            </div>
            <div className={`h-12 w-12 rounded-xl ${card.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/10`}>
              <card.icon size={24} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
