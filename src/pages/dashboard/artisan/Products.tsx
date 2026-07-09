import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package, Star } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const FILTERS = ['All', 'Active', 'Bestseller', 'Featured', 'Low Stock'];

export default function ArtisanProducts() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' ||
      (filter === 'Bestseller' && p.isBestseller) ||
      (filter === 'Featured' && p.isFeatured) ||
      (filter === 'Low Stock' && p.stock < 5) ||
      filter === 'Active';
    return matchSearch && matchFilter;
  });

  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} listings in your store</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Add product form coming soon')}>
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Products', value: products.length },
          { label: 'Bestsellers', value: products.filter(p => p.isBestseller).length },
          { label: 'Low Stock (< 5)', value: products.filter(p => p.stock < 5).length },
          { label: 'Custom Orders', value: products.filter(p => p.isCustomOrderAvailable).length },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-primary">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                filter === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground')}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Product</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden md:table-cell">Category</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Price</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden sm:table-cell">Stock</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden lg:table-cell">Rating</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Status</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium line-clamp-1">{p.title}</p>
                  </div>
                </td>
                <td className="px-3 py-4 hidden md:table-cell">
                  <span className="text-xs text-muted-foreground">{p.category}</span>
                </td>
                <td className="px-3 py-4">
                  <span className="font-semibold text-sm">${p.price}</span>
                </td>
                <td className="px-3 py-4 hidden sm:table-cell">
                  <span className={cn('text-sm font-medium', p.stock < 5 ? 'text-red-500' : 'text-foreground')}>{p.stock}</span>
                </td>
                <td className="px-3 py-4 hidden lg:table-cell">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-current" />
                    <span className="text-xs">{p.rating}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-wrap gap-1">
                    {p.isBestseller && <Badge className="bg-primary/10 text-primary text-[10px] rounded-md">Bestseller</Badge>}
                    {p.isFeatured && <Badge className="bg-secondary/10 text-secondary text-[10px] rounded-md">Featured</Badge>}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => toast.info('Edit product coming soon')}>
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-red-400 hover:text-red-600"
                      onClick={() => { setProducts(prev => prev.filter(x => x.id !== p.id)); toast.success('Product removed'); }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No products found</p>
          </div>
        )}
      </div>
    </ArtisanLayout>
  );
}
