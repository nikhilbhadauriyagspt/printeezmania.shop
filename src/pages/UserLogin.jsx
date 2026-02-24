import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
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
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-slate-50 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] border border-slate-100 overflow-hidden relative z-10 shadow-2xl shadow-blue-900/5">

        {/* Left Side: Professional Message */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#F8FAFC] relative overflow-hidden border-r border-slate-100">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#007DBA] transition-all mb-16 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Back to Store</span>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#007DBA]">
                <Sparkles size={24} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Access Point</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Premium <br /> Partner <span className="text-[#007DBA]">Portal.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xs">
                Secure access to your authorized hardware configurations and order history.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white rounded-[2rem] border border-slate-100 flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#007DBA]">
                <ShieldCheck size={24} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">End-to-End Secure</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">256-Bit SSL Encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Sign In</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Enter your credentials to authenticate</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 pl-14 pr-6 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Phrase</label>
                  <Link to="#" className="text-[10px] font-bold text-[#007DBA] hover:underline">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007DBA] transition-colors" size={18} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-16 pl-14 pr-14 bg-[#F8FAFC] border border-slate-100 rounded-2xl focus:bg-white focus:border-[#007DBA] focus:ring-4 focus:ring-[#007DBA]/5 outline-none text-sm font-semibold transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-[#007DBA] transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>Authenticate <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Need a professional account?{' '}
              <Link to="/signup" className="text-[#007DBA] font-black hover:underline ml-1">Create Access</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
