import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ShoppingBag,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsSearching] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("System profile updated.");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Mismatch in credentials", "error");
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Protocol updated.");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFFEF7] pt-24 pb-20 font-snpro selection:bg-amber-500 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* --- DASHBOARD HEADER --- */}
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">Account Dashboard</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-[#4A3728] tracking-tight">
                Control <span className="text-amber-500 italic font-light">Panel.</span>
              </h1>
              <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-amber-100 shadow-sm">
                <ShieldCheck size={16} className="text-amber-500" />
                <div className="h-3 w-px bg-amber-100" />
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Authenticated session</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Modular Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] p-10 border border-amber-100 shadow-sm sticky top-32">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="h-20 w-20 rounded-full bg-[#4A3728] text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl shadow-amber-900/10">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-[#4A3728] capitalize">{user.name}</h2>
                <p className="text-[10px] font-bold text-amber-900/30 uppercase tracking-[0.2em] mt-1">{user.email}</p>
              </div>

              <div className="space-y-1.5">
                {[
                  { id: 'profile', label: 'Identity Settings', icon: User },
                  { id: 'orders', label: 'Procurement History', icon: Package },
                  { id: 'security', label: 'Access Protocols', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id
                      ? 'bg-[#4A3728] text-white shadow-lg translate-x-1'
                      : 'text-amber-900/40 hover:bg-amber-50 hover:text-amber-900'
                      }`}
                  >
                    <tab.icon size={16} strokeWidth={1.5} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-8"
                >
                  <LogOut size={16} strokeWidth={1.5} />
                  Terminate Session
                </button>
              </div>
            </div>
          </div>

          {/* Main Stage Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[3rem] p-8 md:p-12 border border-amber-100 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <User size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#4A3728]">Personal Identity.</h3>
                      <p className="text-[10px] font-bold text-amber-900/30 uppercase tracking-widest">Update your verified contact data</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Display Name</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Phone Link</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Deployment Address</label>
                      <textarea
                        rows="3" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full p-6 bg-amber-50/30 border border-amber-100 rounded-[2rem] focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-14 px-10 bg-[#4A3728] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg disabled:opacity-50"
                    >
                      {isUpdating ? "Syncing..." : "Apply Changes"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-[3rem] p-10 border border-amber-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <ShoppingBag size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#4A3728]">Orders.</h3>
                        <p className="text-[10px] font-bold text-amber-900/30 uppercase tracking-widest">{orders.length} active records</p>
                      </div>
                    </div>
                    <Link to="/shop" className="text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:underline">New Acquisition</Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-amber-100">
                      <Package size={40} className="text-amber-100 mx-auto mb-6" />
                      <p className="text-amber-900/30 font-bold uppercase text-[10px] tracking-widest">No procurement records found.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-[2.5rem] border border-amber-100 overflow-hidden group hover:border-amber-300 transition-all">
                        <div className="p-8 flex items-center justify-between border-b border-amber-50">
                          <div>
                            <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1">ID #PTP-{order.id}</p>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold text-[#4A3728]">${order.total_amount}</p>
                            <p className="text-[9px] font-bold text-amber-900/30 uppercase mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="p-6 bg-amber-50/20">
                          <Link to="/orders" className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:gap-4 transition-all">
                            Track Shipment <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[3rem] p-8 md:p-12 border border-amber-100 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="h-12 w-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                      <Lock size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#4A3728]">Access Protocols.</h3>
                      <p className="text-[10px] font-bold text-amber-900/30 uppercase tracking-widest">Manage your authentication layer</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">New Protocol Code</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"} required
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-14 pl-6 pr-14 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-200 hover:text-amber-500">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-amber-400 uppercase tracking-widest ml-2">Verify Protocol</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-14 px-6 bg-amber-50/30 border border-amber-100 rounded-xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-14 px-10 bg-[#4A3728] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Update Credentials"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
