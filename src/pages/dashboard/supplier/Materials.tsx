import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MATERIALS = [
  { id: 'm1', name: 'Natural Cotton Rope 3mm', category: 'Fiber', price: 18.99, stock: 240, unit: 'per 100m', status: 'active' },
  { id: 'm2', name: 'Beeswax Premium Blocks', category: 'Wax', price: 24.99, stock: 85, unit: 'per 500g', status: 'active' },
  { id: 'm3', name: 'Sterling Silver Wire 24G', category: 'Metal', price: 32.00, stock: 12, unit: 'per 10ft', status: 'low' },
  { id: 'm4', name: 'Merino Wool Roving', category: 'Fiber', price: 28.50, stock: 60, unit: 'per 250g', status: 'active' },
  { id: 'm5', name: 'Polymer Clay Set 12 Colors', category: 'Clay', price: 19.99, stock: 0, unit: 'per set', status: 'out' },
  { id: 'm6', name: 'Kraft Paper Roll', category: 'Paper', price: 12.00, stock: 180, unit: 'per 50m', status: 'active' },
];

export default function SupplierMaterials() {
  const [search, setSearch] = useState('');
  const [materials, setMaterials] = useState(MATERIALS);
  const filtered = materials.filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SupplierLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Materials Catalog</h1>
          <p className="text-muted-foreground text-sm mt-1">{materials.length} materials listed</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Add material form coming soon')}>
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
        <input type="text" placeholder="Search materials..." value={search} onChange={e => setSearch(e.target.value)}
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
                <td className="px-3 py-4">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => toast.info('Edit coming soon')}><Edit2 className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-red-400" onClick={() => { setMaterials(prev => prev.filter(x => x.id !== m.id)); toast.success('Material removed'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SupplierLayout>
  );
}
