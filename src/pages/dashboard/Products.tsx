import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Package } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function Products() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const filtered = products.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product removed');
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} products in your store</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Stock</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Rating</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-muted">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-sm line-clamp-1">{product.title}</div>
                        <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-sm">${product.price}</div>
                    {product.originalPrice && (
                      <div className="text-xs text-muted-foreground line-through">${product.originalPrice}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={cn('text-sm font-medium', product.stock <= 3 ? 'text-destructive' : product.stock <= 10 ? 'text-amber-600' : 'text-foreground')}>
                      {product.stock} left
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-accent">★</span>
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={cn('text-[10px]', product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-muted">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-muted">
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(product.id)}
                      >
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
              <p className="text-sm text-muted-foreground">Try a different search or add a new product</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
