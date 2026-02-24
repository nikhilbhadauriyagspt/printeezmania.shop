import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import API_BASE_URL from '../../config';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sale_price: '',
    quantity: '',
    sku: '',
    description: '',
    status: 'published',
    brand_id: ''
  });

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    // Fetch Brands
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => { if (data.status === 'success') setBrands(data.data); });

    // If Edit, Fetch Product Data
    if (isEdit) {
      fetch(`${API_BASE_URL}/products?id=${id}`) // Assuming the index/api can handle single ID or we add a getOne
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            // Find the specific product from the list (simple way for now)
            const product = data.data.find(p => p.id == id);
            if (product) setFormData(product);
          }
          setFetching(false);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isEdit ? `${API_BASE_URL}/products/${id}` : `${API_BASE_URL}/products`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status === 'success') {
        alert(isEdit ? 'Product updated!' : 'Product added!');
        navigate('/admin/products');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/products" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 ">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-widest mb-2">Product Title</label>
              <input
                type="text" required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all"
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-widest mb-2">Description</label>
              <textarea
                rows="6"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 font-medium transition-all"
                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-widest mb-2">Regular Price ($)</label>
              <input
                type="number" required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all"
                value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-widest mb-2">Inventory (Stock)</label>
              <input
                type="number" required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all"
                value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-widest mb-2">Brand</label>
              <select
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all appearance-none"
                value={formData.brand_id} onChange={e => setFormData({ ...formData, brand_id: e.target.value })}
              >
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 capitalize tracking-widest mb-2">Status</label>
              <select
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all appearance-none"
                value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
            {isEdit ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
          </button>
        </div>
      </form>
    </div>
  );
}
