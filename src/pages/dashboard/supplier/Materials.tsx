import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface MaterialItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  status: 'active' | 'low' | 'out';
}

const INITIAL_MATERIALS: MaterialItem[] = [
  { id: 'm1', name: 'Natural Cotton Rope 3mm', category: 'Fiber', price: 18.99, stock: 240, unit: 'per 100m', status: 'active' },
  { id: 'm2', name: 'Beeswax Premium Blocks', category: 'Wax', price: 24.99, stock: 85, unit: 'per 500g', status: 'active' },
  { id: 'm3', name: 'Sterling Silver Wire 24G', category: 'Metal', price: 32.00, stock: 12, unit: 'per 10ft', status: 'low' },
  { id: 'm4', name: 'Merino Wool Roving', category: 'Fiber', price: 28.50, stock: 60, unit: 'per 250g', status: 'active' },
  { id: 'm5', name: 'Polymer Clay Set 12 Colors', category: 'Clay', price: 19.99, stock: 0, unit: 'per set', status: 'out' },
  { id: 'm6', name: 'Kraft Paper Roll', category: 'Paper', price: 12.00, stock: 180, unit: 'per 50m', status: 'active' },
];

const CATEGORIES = ['Fiber', 'Wax', 'Metal', 'Clay', 'Paper', 'Glass', 'Wood'];

export default function SupplierMaterials() {
  const [search, setSearch] = useState('');
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('');

  const getStatus = (stockNum: number) => {
    if (stockNum === 0) return 'out';
    if (stockNum < 20) return 'low';
    return 'active';
  };

  const handleOpenAdd = () => {
    setName('');
    setCategory(CATEGORIES[0]);
    setPrice('');
    setStock('');
    setUnit('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (m: MaterialItem) => {
    setSelectedMaterial(m);
    setName(m.name);
    setCategory(m.category);
    setPrice(m.price.toString());
    setStock(m.stock.toString());
    setUnit(m.unit);
    setShowEditModal(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock || !unit) {
      toast.error('Please enter all required fields');
      return;
    }
    const stockNum = parseInt(stock);
    const newMaterial: MaterialItem = {
      id: `m_${Date.now()}`,
      name,
      category,
      price: parseFloat(price),
      stock: stockNum,
      unit,
      status: getStatus(stockNum)
    };
    setMaterials(prev => [newMaterial, ...prev]);
    toast.success(`Material "${name}" added to catalog successfully!`);
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial || !name || !price || !stock || !unit) {
      toast.error('Please enter all required fields');
      return;
    }
    const stockNum = parseInt(stock);
    setMaterials(prev => prev.map(m => m.id === selectedMaterial.id ? {
      ...m,
      name,
      category,
      price: parseFloat(price),
      stock: stockNum,
      unit,
      status: getStatus(stockNum)
    } : m));
    toast.success('Material details updated successfully!');
    setShowEditModal(false);
  };

  const filtered = materials.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SupplierLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Materials Catalog</h1>
          <p className="text-muted-foreground text-sm mt-1">{materials.length} materials listed</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2 font-semibold" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4" /> Add Material
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active Listings', value: materials.filter(m => m.status === 'active').length },
          { label: 'Low Stock', value: materials.filter(m => m.status === 'low').length },
          { label: 'Out of Stock', value: materials.filter(m => m.status === 'out').length },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-primary">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search materials or category..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Material</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden md:table-cell">Category</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Price</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden sm:table-cell">Stock</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Status</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center"><Package className="w-4 h-4 text-primary" /></div>
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 hidden md:table-cell"><span className="text-xs text-muted-foreground">{m.category}</span></td>
                <td className="px-3 py-4"><span className="font-semibold text-sm">${m.price}</span></td>
                <td className="px-3 py-4 hidden sm:table-cell">
                  <span className={`text-sm font-medium ${m.stock === 0 ? 'text-red-500' : m.stock < 20 ? 'text-yellow-600' : 'text-foreground'}`}>{m.stock}</span>
                </td>
                <td className="px-3 py-4">
                  <Badge className={m.status === 'active' ? 'bg-green-100 text-green-800 text-[10px]' : m.status === 'low' ? 'bg-yellow-100 text-yellow-800 text-[10px]' : 'bg-red-100 text-red-800 text-[10px]'}>
                    {m.status === 'active' ? 'Active' : m.status === 'low' ? 'Low Stock' : 'Out of Stock'}
                  </Badge>
                </td>
                <td className="px-3 py-4 text-right">
                  <div className="flex gap-1 justify-end mr-4">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => handleOpenEdit(m)}><Edit2 className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50" onClick={() => { setMaterials(prev => prev.filter(x => x.id !== m.id)); toast.success('Material removed'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-xs text-muted-foreground py-8">No materials found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Add Material</h3>
            <p className="text-xs text-muted-foreground mb-4">Post a new raw material item to your supply catalog</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="m-name">Material Name *</Label>
                <Input id="m-name" value={name} onChange={e => setName(e.target.value)} placeholder="Organic Jute Twine 4mm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="m-price">Price ($) *</Label>
                  <Input id="m-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="14.50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="m-stock">Stock Qty *</Label>
                  <Input id="m-stock" type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="150" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="m-unit">Unit Metric *</Label>
                  <Input id="m-unit" value={unit} onChange={e => setUnit(e.target.value)} placeholder="per 100m" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="m-cat">Category</Label>
                  <select id="m-cat" value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Add Material
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Material Modal */}
      {showEditModal && selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Material Details</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify pricing or stock details for your catalog item</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="me-name">Material Name *</Label>
                <Input id="me-name" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="me-price">Price ($) *</Label>
                  <Input id="me-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="me-stock">Stock Qty *</Label>
                  <Input id="me-stock" type="number" value={stock} onChange={e => setStock(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="me-unit">Unit Metric *</Label>
                  <Input id="me-unit" value={unit} onChange={e => setUnit(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="me-cat">Category</Label>
                  <select id="me-cat" value={category} onChange={e => setCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </SupplierLayout>
  );
}
