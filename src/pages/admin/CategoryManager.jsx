import { useState, useEffect } from 'react';
import { Plus, Trash2, FolderTree, ChevronRight } from 'lucide-react';
import API_BASE_URL from '../../config';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setCategories(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parent_id: parentId })
    });
    setName('');
    setParentId('');
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete category?')) {
      await fetch(`${API_BASE_URL}/categories/${id}`, { method: 'DELETE' });
      fetchCategories();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 ">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-lg mb-4">Add Category</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-wide mb-1">Name</label>
              <input
                className="w-full p-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
                value={name} onChange={e => setName(e.target.value)} required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-wide mb-1">Parent Category</label>
              <select
                className="w-full p-3 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 bg-white"
                value={parentId} onChange={e => setParentId(e.target.value)}
              >
                <option value="">None (Main Category)</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
              Create Category
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-lg">Category Hierarchy</h3>
          </div>
          <div className="p-6">
            {loading ? <p>Loading...</p> : (
              <div className="space-y-4">
                {categories.map(root => (
                  <div key={root.id} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <FolderTree size={18} className="text-blue-600" />
                        <span className="font-bold text-slate-900">{root.name}</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded capitalize">Main</span>
                      </div>
                      <button onClick={() => handleDelete(root.id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg"><Trash2 size={16} /></button>
                    </div>

                    {/* Children */}
                    {root.children && root.children.length > 0 && (
                      <div className="bg-white p-2 space-y-1">
                        {root.children.map(child => (
                          <div key={child.id} className="flex items-center justify-between p-3 ml-8 border-l-2 border-gray-100 hover:bg-gray-50 rounded-r-lg transition-colors">
                            <div className="flex items-center gap-2">
                              <ChevronRight size={14} className="text-gray-300" />
                              <span className="text-sm font-medium text-slate-700">{child.name}</span>
                            </div>
                            <button onClick={() => handleDelete(child.id)} className="p-1 hover:text-red-500 text-slate-300"><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
