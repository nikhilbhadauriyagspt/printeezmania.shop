import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import API_BASE_URL from '../config';

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
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
        body: JSON.stringify({ type: 'admin', identifier, password })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('admin_user', JSON.stringify({ ...data.data, role: 'admin' }));
        navigate('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 font-urbanist px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 ">PrinteezMania<span className="text-blue-600">.</span></h2>
          <p className="text-sm font-bold text-slate-400 capitalize tracking-widest mt-2">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-500 text-sm font-bold rounded-xl text-center">{error}</div>}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Admin Username"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 transition-all"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-blue-500/30 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
