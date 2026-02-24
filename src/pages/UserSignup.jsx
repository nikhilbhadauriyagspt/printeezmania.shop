import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans px-6 py-20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-slate-50 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] border border-slate-100 overflow-hidden relative z-10 shadow-2xl shadow-blue-900/5">

        {/* Left Side: Professional Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#0F172A] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,125,186,0.1),transparent)] pointer-events-none"></div>

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#007DBA] transition-all mb-16 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Back to Store</span>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#007DBA]">
                <Sparkles size={24} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">New Member</span>
              </div>
              <h2 className="text-5xl font-black leading-[1.1] tracking-tight text-white">
                Begin your <br /> <span className="text-[#007DBA]">Authorized</span> Hub.
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                Register to unlock exclusive corporate configurations and priority hardware support.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-[#007DBA]/20 flex items-center justify-center text-[#007DBA]">
                <CheckCircle2 size={24} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest">Instant Activation</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">2026 Ecosystem Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Register your professional identity</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Mobile Contact</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                  <input
                    required
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 pl-12 pr-4 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Security Phrase</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-14 pl-12 pr-12 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] outline-none text-sm font-semibold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={18} /></>}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Already verified?{' '}
              <Link to="/login" className="text-[#007DBA] font-black hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
