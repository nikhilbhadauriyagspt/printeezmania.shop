import React, { useState, useEffect } from 'react';
import { Mail, Search, Download, Trash2, Loader2, Calendar, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../../config';

export default function NewsletterManager() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`);
      const data = await response.json();
      if (data.status === 'success') setEmails(data.data);
    } catch (err) {
      console.error("Error fetching newsletter emails:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter(e =>
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900  capitalize">Newsletter Subscribers</h1>
          <p className="text-sm font-bold text-slate-500 capitalize tracking-widest mt-1">Manage your marketing mailing list</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="SEARCH EMAILS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 h-14 w-full md:w-80 bg-white border border-gray-200 rounded-2xl focus:border-blue-600 outline-none text-xs font-bold capitalize transition-all"
            />
          </div>
          <button className="h-14 px-6 bg-slate-900 text-white rounded-2xl flex items-center gap-3 text-[10px] font-bold capitalize tracking-widest hover:bg-blue-600 transition-all shadow-xl">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
            <Mail size={24} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 capitalize tracking-widest mb-1">Total Subscribers</p>
          <h3 className="text-3xl font-bold text-slate-900">{emails.length}</h3>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
            <UserCheck size={24} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 capitalize tracking-widest mb-1">Active Status</p>
          <h3 className="text-3xl font-bold text-slate-900">{emails.filter(e => e.status === 'active').length}</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 capitalize tracking-widest">Email Address</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 capitalize tracking-widest">Date Subscribed</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 capitalize tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="3" className="py-20 text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <p className="text-[10px] font-bold text-slate-400 capitalize tracking-widest">Loading List...</p>
                  </td>
                </tr>
              ) : filteredEmails.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-20 text-center text-slate-400 font-bold capitalize text-xs tracking-widest">
                    No subscribers found
                  </td>
                </tr>
              ) : filteredEmails.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                        <Mail size={18} />
                      </div>
                      <span className="text-sm font-bold text-slate-900 lowercase">{item.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Calendar size={14} />
                      <span className="text-[10px] font-bold capitalize tracking-widest">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="h-10 w-10 rounded-xl bg-gray-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all ml-auto">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
