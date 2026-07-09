import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Flag } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { toast } from 'sonner';

interface FlaggedRecord {
  id: string;
  productId: string;
  reason: string;
  flags: number;
  status: string;
}

const INITIAL_FLAGGED: FlaggedRecord[] = [
  { id: 'f1', productId: 'p1', reason: 'Misleading description', flags: 3, status: 'pending' },
  { id: 'f2', productId: 'p3', reason: 'Fake reviews suspected', flags: 5, status: 'pending' },
];

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  
  // State for products and flags
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [flagged, setFlagged] = useState<FlaggedRecord[]>(INITIAL_FLAGGED);
  
  // Details Modal State
  const [selectedProduct, setSelectedProduct] = useState<typeof MOCK_PRODUCTS[0] | null>(null);

  const handleApproveFlagged = (productId: string) => {
    setFlagged(prev => prev.filter(f => f.productId !== productId));
    toast.success('Listing approved. Flags dismissed.');
  };

  const handleRemoveFlagged = (productId: string) => {
    setFlagged(prev => prev.filter(f => f.productId !== productId));
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast.success('Flagged listing removed from marketplace.');
  };

  const toggleFeatured = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const next = !p.isFeatured;
        toast.success(next ? 'Product is now featured!' : 'Product removed from featured.');
        return { ...p, isFeatured: next };
      }
      return p;
    }));
  };

  const handleDelistProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setFlagged(prev => prev.filter(f => f.productId !== productId));
    toast.success('Product successfully delisted.');
    setSelectedProduct(null);
  };

  const filtered = products.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.artisan.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Products</h1><p className="text-muted-foreground text-sm mt-1">Monitor all marketplace listings</p></div>
      </div>

      {/* Flagged Items */}
      {flagged.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2 font-display"><Flag className="w-4 h-4" /> Flagged Products ({flagged.length})</h3>
          <div className="space-y-2">
            {flagged.map(f => {
              const product = products.find(p => p.id === f.productId);
              return product ? (
                <div key={f.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-red-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0"><img src={product.images[0]} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate text-foreground">{product.title}</p><p className="text-[11px] text-red-600 font-medium">{f.reason} · {f.flags} reports</p></div>
                  <div className="flex gap-1.5 shrink-0">
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white rounded-lg h-7 text-xs font-semibold" onClick={() => handleApproveFlagged(product.id)}>Approve</Button>
                    <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs text-red-500 hover:bg-red-50 font-semibold" onClick={() => handleRemoveFlagged(product.id)}>Remove</Button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search products or artisans..." value={search} onChange={e => setSearch(e.target.value)}
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
              const isFlagged = flagged.some(f => f.productId === p.id);
              return (
                <tr key={p.id} className={`hover:bg-muted/20 transition-colors ${isFlagged ? 'bg-red-50/30' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0"><img src={p.images[0]} alt="" className="w-full h-full object-cover" /></div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                        {isFlagged && <p className="text-[10px] text-red-600 flex items-center gap-1 mt-0.5"><Flag className="w-2.5 h-2.5" /> Flagged</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 hidden md:table-cell"><span className="text-xs text-muted-foreground">{p.artisan.name}</span></td>
                  <td className="px-3 py-4"><span className="font-semibold text-sm">${p.price}</span></td>
                  <td className="px-3 py-4 hidden sm:table-cell">
                    <Badge className={p.isFeatured ? 'bg-primary/10 text-primary text-[10px] border-none' : 'bg-green-100 text-green-800 text-[10px] border-none'}>
                      {p.isFeatured ? 'Featured' : 'Active'}
                    </Badge>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg mr-2" onClick={() => setSelectedProduct(p)}><Eye className="w-3.5 h-3.5" /></Button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-xs text-muted-foreground py-8">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Product Details & Moderation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground">Product Inspection</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-border">
                  <img src={selectedProduct.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground leading-tight">{selectedProduct.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Artisan: {selectedProduct.artisan.name}</p>
                  <p className="text-xs font-semibold text-primary mt-1">${selectedProduct.price}</p>
                </div>
              </div>

              <div className="border-t border-border pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{selectedProduct.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium text-foreground">{selectedProduct.rating} / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sales Count</span>
                  <span className="font-medium text-foreground">{selectedProduct.salesCount} sold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Promo Status</span>
                  <span className="font-medium text-foreground">{selectedProduct.isFeatured ? 'Featured' : 'Standard'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-border">
              <Button variant="ghost" onClick={() => setSelectedProduct(null)} className="rounded-xl">
                Close
              </Button>
              <Button variant="outline" className="rounded-xl border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleDelistProduct(selectedProduct.id)}>
                Delist Product
              </Button>
              <Button className="rounded-xl bg-primary text-white hover:bg-primary/90 border-none px-4" onClick={() => { toggleFeatured(selectedProduct.id); setSelectedProduct(null); }}>
                {selectedProduct.isFeatured ? 'Unfeature' : 'Feature Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
