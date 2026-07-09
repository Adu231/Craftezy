import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Flag } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { toast } from 'sonner';

const FLAGGED = [
  { id: 'f1', productId: 'p1', reason: 'Misleading description', flags: 3, status: 'pending' },
  { id: 'f2', productId: 'p3', reason: 'Fake reviews suspected', flags: 5, status: 'pending' },
];

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_PRODUCTS.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Products</h1><p className="text-muted-foreground text-sm mt-1">Monitor all marketplace listings</p></div>
      </div>

      {/* Flagged Items */}
      {FLAGGED.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2"><Flag className="w-4 h-4" /> Flagged Products ({FLAGGED.length})</h3>
          <div className="space-y-2">
            {FLAGGED.map(f => {
              const product = MOCK_PRODUCTS.find(p => p.id === f.productId);
              return product ? (
                <div key={f.id} className="flex items-center gap-3 bg-white rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0"><img src={product.images[0]} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium">{product.title}</p><p className="text-xs text-red-600">{f.reason} · {f.flags} reports</p></div>
                  <div className="flex gap-1.5">
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white rounded-lg h-7 text-xs" onClick={() => toast.success('Listing approved')}>Approve</Button>
                    <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs text-red-500" onClick={() => toast.success('Listing removed')}>Remove</Button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Product</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden md:table-cell">Seller</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Price</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden sm:table-cell">Status</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(p => {
              const isFlagged = FLAGGED.some(f => f.productId === p.id);
              return (
                <tr key={p.id} className={`hover:bg-muted/20 transition-colors ${isFlagged ? 'bg-red-50/30' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0"><img src={p.images[0]} alt="" className="w-full h-full object-cover" /></div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                        {isFlagged && <p className="text-[10px] text-red-600 flex items-center gap-1"><Flag className="w-2.5 h-2.5" /> Flagged</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 hidden md:table-cell"><span className="text-xs text-muted-foreground">{p.artisan.name}</span></td>
                  <td className="px-3 py-4"><span className="font-semibold text-sm">${p.price}</span></td>
                  <td className="px-3 py-4 hidden sm:table-cell">
                    <Badge className={p.isFeatured ? 'bg-primary/10 text-primary text-[10px]' : 'bg-green-100 text-green-800 text-[10px]'}>{p.isFeatured ? 'Featured' : 'Active'}</Badge>
                  </td>
                  <td className="px-3 py-4">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => toast.info('Product detail coming soon')}><Eye className="w-3.5 h-3.5" /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
