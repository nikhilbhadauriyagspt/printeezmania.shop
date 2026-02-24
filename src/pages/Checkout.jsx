import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Loader2, Navigation, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = total;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod' // default
  });

  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data.address) {
            const addr = data.address;
            const streetAddress = [
              addr.house_number,
              addr.road,
              addr.suburb,
              addr.neighbourhood
            ].filter(Boolean).join(', ');

            setFormData(prev => ({
              ...prev,
              address: streetAddress || data.display_name,
              city: addr.city || addr.town || addr.village || addr.state || '',
              zipCode: addr.postcode || ''
            }));
          }
        } catch (err) {
          console.error("Location detection error:", err);
          alert("Could not detect address. Please enter it manually.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        setDetectingLocation(false);
        alert("Location access denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (via printeezmania.shop)`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails,
        source: 'printeezmania.shop',
        notes: `Order from printeezmania.shop | ${formData.notes || ''}`
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-sans">
        <h2 className="text-3xl font-black text-slate-900 mb-4">No hardware in session.</h2>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#007DBA] transition-all">Back to Catalog</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-sans text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="h-24 w-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-xl shadow-emerald-100"
        >
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </motion.div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Purchase Confirmed!</h1>
        <p className="text-slate-400 font-medium text-sm mb-12">Your authorized hardware is scheduled for immediate dispatch.</p>
        <div className="bg-[#F8FAFC] p-10 rounded-[3rem] border border-slate-100 mb-12 max-w-md w-full">
          <p className="text-[10px] font-bold text-[#007DBA] uppercase tracking-widest mb-2">Order Reference</p>
          <p className="text-2xl font-black text-slate-900">#PTP-{orderId || 'PENDING'}</p>
        </div>
        <Link to="/" className="px-12 py-5 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-12 pb-20 font-sans">
      <div className="container mx-auto px-4 lg:px-6">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-slate-100 pb-10">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#007DBA] transition-colors mb-4 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">
              Secure <span className="text-[#007DBA]">Checkout.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${step >= 1 ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-300'}`}>1</div>
            <div className={`h-0.5 w-10 transition-all ${step >= 2 ? 'bg-slate-900' : 'bg-slate-100'}`} />
            <div className={`h-11 w-11 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${step >= 2 ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-300'}`}>2</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">

          {/* Main Module */}
          <div className="lg:col-span-8 space-y-10">

            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[#007DBA]">
                    <Mail size={20} strokeWidth={2.5} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Contact Information</h3>
                  </div>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email address for order updates" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-[#007DBA]">
                      <MapPin size={20} strokeWidth={2.5} />
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Shipping Details</h3>
                    </div>
                    <button
                      type="button" onClick={detectLocation} disabled={detectingLocation}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#007DBA] rounded-xl text-[10px] font-bold uppercase border border-blue-100 hover:bg-[#007DBA] hover:text-white transition-all disabled:opacity-50"
                    >
                      {detectingLocation ? <Loader2 className="animate-spin" size={14} /> : <Navigation size={14} />}
                      {detectingLocation ? 'Locating...' : 'Auto-Detect Address'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all" />
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all" />
                  </div>
                  <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete Street Address" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City / Region" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all" />
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Postal Code" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all" />
                  </div>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Mobile Phone Number" className="w-full h-14 px-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all" />
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-[#007DBA]">
                    <CreditCard size={20} strokeWidth={2.5} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Payment Selection</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-[#007DBA] bg-blue-50/30' : 'border-slate-100 bg-[#F8FAFC] hover:border-slate-200'}`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-[#007DBA]' : 'border-slate-200'}`}>
                          {formData.paymentMethod === 'cod' && <div className="h-3 w-3 rounded-full bg-[#007DBA]" />}
                        </div>
                        <Truck size={28} className={formData.paymentMethod === 'cod' ? 'text-[#007DBA]' : 'text-slate-300'} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">Cash on Delivery</h4>
                      <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Pay upon hardware arrival</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-[#007DBA] bg-blue-50/30' : 'border-slate-100 bg-[#F8FAFC] hover:border-slate-200'}`}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'paypal' ? 'border-[#007DBA]' : 'border-slate-200'}`}>
                          {formData.paymentMethod === 'paypal' && <div className="h-3 w-3 rounded-full bg-[#007DBA]" />}
                        </div>
                        <div className="text-[#007DBA] font-black text-xl italic tracking-tighter">PayPal</div>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">PayPal Express</h4>
                      <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Instant encrypted payment</p>
                    </div>
                  </div>

                  {formData.paymentMethod === 'paypal' && (
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                      <div className="p-8 bg-[#0F172A] rounded-[2.5rem] text-white text-center border border-white/5">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-slate-500">Secured with SSL Encryption.</p>
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase border border-white/10">
                          <ShieldCheck size={16} className="text-[#007DBA]" /> Protected Checkout
                        </div>
                      </div>
                      <div className="relative z-0 px-4 md:px-10">
                        <PayPalButtons
                          style={{ layout: "vertical", shape: "rect", height: 55 }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [{
                                amount: { value: finalTotal.toString() },
                                description: `HP Hardware Procurement - ${cartCount} Units`,
                              }],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            await handleOrderSuccess(details);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex gap-4 pt-6">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="px-10 h-16 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Back</button>
              )}
              {formData.paymentMethod === 'cod' || step === 1 ? (
                <button
                  type="submit" disabled={loading}
                  className="flex-1 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Finalizing Order...' : (step === 1 ? 'Go to Payment' : 'Complete Purchase')}
                  {!loading && <ArrowRight size={18} />}
                </button>
              ) : null}
            </div>
          </div>

          {/* Summary Module */}
          <div className="lg:col-span-4">
            <div className="bg-[#F8FAFC] rounded-[3rem] p-10 border border-slate-100 sticky top-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#007DBA] block mb-10">Order Contents</span>

              <div className="space-y-6 mb-10 max-h-80 overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center border border-slate-100 shrink-0 group-hover:border-[#007DBA]/30 transition-all">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#007DBA] transition-colors leading-tight">{item.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">{item.quantity} x ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-8">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Delivery</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                  <span className="text-sm font-black uppercase tracking-widest text-slate-900">Total</span>
                  <span className="text-3xl font-black text-[#007DBA]">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 opacity-20 group">
                <Lock size={14} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Hardware-Secured Transaction</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
