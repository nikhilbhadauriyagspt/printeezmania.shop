import { useState, useEffect } from 'react';
import { Search, Trash2, Loader2, User, Mail, Phone, Calendar } from 'lucide-react';
import API_BASE_URL from '../../config';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setUsers(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.status === 'success') {
          fetchUsers(); // Refresh list
        } else {
          alert('Delete failed: ' + data.message);
        }
      } catch (err) {
        alert('Server error');
      }
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 ">Registered Users</h1>
          <p className="text-sm font-medium text-slate-500">Manage customer accounts and access levels ({users.length} users)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-slate-500 font-bold capitalize tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                  <Loader2 className="animate-spin mx-auto h-8 w-8 mb-2 opacity-20" />
                  Loading user directory...
                </td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">No users found matching your search.</td></tr>
              ) : filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {u.name.charAt(0).touppercase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{u.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 capitalize tracking-widest">ID: #{u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <Mail size={14} className="text-slate-400" />
                        {u.email}
                      </div>
                      {u.phone && (
                        <div className="flex items-center gap-2 text-slate-600 font-medium">
                          <Phone size={14} className="text-slate-400" />
                          {u.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-bold">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(u.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-2.5 hover:bg-red-50 text-red-500 rounded-xl transition-colors inline-flex items-center gap-2 font-bold text-xs"
                    >
                      <Trash2 size={16} />
                      <span className="hidden group-hover:block">Remove User</span>
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
