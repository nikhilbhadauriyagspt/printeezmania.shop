import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, MapPin, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Placed', icon: Clock, desc: 'We have received your order' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your items are being prepared' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Package has left our facility' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Courier is on the way' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF7] pt-40 pb-20 font-snpro px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Package size={32} className="text-amber-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-[#4A3728] tracking-tight mb-4">Track Your Order.</h1>
          <p className="text-amber-900/40 font-bold uppercase tracking-widest text-[10px] mb-12">Login to see your full history or enter your guest email below.</p>

          <form onSubmit={handleGuestSearch} className="flex flex-col sm:flex-row gap-4 mb-12">
            <input
              type="email" required
              placeholder="ENTER GUEST EMAIL"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="flex-1 h-16 px-6 bg-white border border-amber-100 rounded-2xl focus:bg-white focus:border-amber-400 outline-none text-xs font-bold uppercase transition-all placeholder:text-amber-900/20 shadow-sm"
            />
            <button className="h-16 px-10 bg-[#4A3728] text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg">
              Find Order
            </button>
          </form>

          <div className="pt-8 border-t border-amber-100">
            <Link to="/login" className="text-amber-600 font-bold text-[10px] uppercase tracking-widest hover:underline">Or Login to your account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7] pt-24 pb-20 font-snpro selection:bg-amber-500 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* --- DASHBOARD HEADER --- */}
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-900/40">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight size={10} />
              <span className="text-amber-900">Order Management</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-[#4A3728] tracking-tight">
                Procurement <span className="text-amber-500 italic font-light">History.</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-900/40 pb-1">{orders.length} Total Units Tracked</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border border-amber-50 shadow-sm">
            <Loader2 className="animate-spin h-10 w-10 text-amber-500 mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-900/40">Retrieving Records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-amber-200 shadow-sm">
            <Package size={48} className="text-amber-100 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-[#4A3728]">No History Detected.</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-900/30 mt-2 mb-10">You haven't initiated any hardware acquisitions yet.</p>
            <Link to="/shop" className="px-10 py-4 bg-[#4A3728] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 shadow-lg">Begin Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                key={order.id}
                className="bg-white rounded-[3rem] border border-amber-100 overflow-hidden group hover:shadow-xl hover:shadow-amber-900/5 transition-all"
              >
                <div className="p-8 border-b border-amber-50 flex flex-wrap items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                      <Package size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1">RECORD #PTP-{order.id}</p>
                      <h3 className="text-sm font-bold text-[#4A3728]">System Acquisition</h3>
                    </div>
                  </div>

                  <div className="flex gap-12">
                    <div>
                      <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar size={10} /> Stamp
                      </p>
                      <p className="text-[11px] font-bold text-[#4A3728]">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <CreditCard size={10} /> Protocol
                      </p>
                      <p className="text-[11px] font-bold text-[#4A3728] uppercase">{order.payment_method}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1">Valuation</p>
                    <p className="text-2xl font-bold text-[#4A3728]">${order.total_amount}</p>
                  </div>
                </div>

                <div className="p-8 bg-amber-50/10">
                  <div className="space-y-4">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-white border border-amber-100 flex items-center justify-center text-[10px] font-bold text-[#4A3728]">
                            {item.quantity}x
                          </div>
                          <p className="text-[12px] font-bold text-amber-900/60 capitalize line-clamp-1 max-w-[400px]">{item.product_name}</p>
                        </div>
                        <p className="text-[12px] font-bold text-[#4A3728]">${item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-amber-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[9px] font-bold text-amber-900/30 uppercase tracking-widest">
                      <Truck size={12} /> Link to: <span className="text-[#4A3728] ml-1">{order.address}, {order.city}</span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Track Live <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- TRACKING MODAL --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-[#4A3728]/20 backdrop-blur-sm z-[1000]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-[3.5rem] z-[1001] shadow-2xl p-12 border border-amber-100 font-snpro"
              >
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-[#4A3728] tracking-tight">Track Session.</h2>
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mt-1">#PTP-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-900 hover:bg-amber-100 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="relative space-y-10">
                  <div className="absolute left-6 top-2 bottom-2 w-[1px] bg-amber-100" />

                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const isActive = selectedOrder.status === step.key;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-10 group">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 border ${isCompleted ? 'bg-[#4A3728] border-transparent text-white shadow-lg shadow-amber-900/10' : 'bg-white border-amber-50 text-amber-200'}`}>
                          <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                        </div>

                        <div className="flex-1 py-1">
                          <h4 className={`text-sm font-bold uppercase tracking-wider ${isCompleted ? 'text-[#4A3728]' : 'text-amber-900/20'}`}>
                            {step.label}
                          </h4>
                          <p className={`text-[11px] font-medium mt-1 leading-relaxed ${isCompleted ? 'text-amber-900/60' : 'text-amber-900/20'}`}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <motion.div
                              layoutId="status-pill"
                              className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[8px] font-bold uppercase tracking-widest border border-amber-100 shadow-sm"
                            >
                              <div className="h-1 w-1 rounded-full bg-amber-500 animate-ping" /> Synchronized
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-16 pt-8 border-t border-amber-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1">Fleet Carrier</p>
                      <p className="text-xs font-bold text-[#4A3728] uppercase tracking-wider">PrinteezMania Logistics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest mb-1">Expected Arrival</p>
                      <p className="text-xs font-bold text-[#4A3728] uppercase tracking-wider">2-3 Business Days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
