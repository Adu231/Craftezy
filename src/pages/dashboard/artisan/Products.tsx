import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Package, Star, Upload } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

const FILTERS = ['All', 'Active', 'Bestseller', 'Featured', 'Low Stock'];
const CATEGORIES = ['Pottery & Ceramics', 'Textile & Fiber Arts', 'Woodworking', 'Jewelry Making', 'Leather Crafting', 'Glassblowing'];

export default function ArtisanProducts() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Modal forms states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Image loaded successfully');
    }
  };

  const handleOpenAdd = () => {
    setTitle('');
    setCategory(CATEGORIES[0]);
    setPrice('');
    setStock('');
    setDescription('');
    setImageUrl('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setSelectedProduct(p);
    setTitle(p.title);
    setCategory(p.category);
    setPrice(p.price.toString());
    setStock(p.stock.toString());
    setDescription(p.description);
    setImageUrl(p.images[0]);
    setShowEditModal(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !stock) {
      toast.error('Please fill in all required fields');
      return;
    }
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      title,
      description: description || 'No description provided.',
      price: parseFloat(price),
      category,
      tags: [category.split(' ')[0]],
      artisan: { name: user?.name || 'Artisan', storeName: user?.storeName },
      rating: 5.0,
      reviewCount: 0,
      stock: parseInt(stock),
      isCustomOrderAvailable: true,
      createdAt: new Date().toISOString(),
      shippingDays: 3,
      images: [imageUrl || 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=400&fit=crop'],
    };
    setProducts(prev => [newProduct, ...prev]);
    toast.success('Product added successfully!');
    setShowAddModal(false);
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !title || !price || !stock) {
      toast.error('Please fill in all required fields');
      return;
    }
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? {
      ...p,
      title,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      images: [imageUrl || p.images[0]]
    } : p));
    toast.success('Product details updated!');
    setShowEditModal(false);
  };

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
        <Button className="btn-primary rounded-xl gap-2" onClick={handleOpenAdd}>
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
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => handleOpenEdit(p)}>
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleAddProduct} className="bg-white rounded-3xl p-6 max-w-lg w-full border border-border shadow-craft-lg relative max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Add New Product</h3>
            <p className="text-xs text-muted-foreground mb-4">Post a new handcrafted listing to your store inventory</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="add-title">Product Title *</Label>
                <Input id="add-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Handwoven Linen Scarf" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="add-price">Price ($) *</Label>
                  <Input id="add-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="45.00" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="add-stock">Stock Qty *</Label>
                  <Input id="add-stock" type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="add-category">Category</Label>
                <select id="add-category" value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="add-description">Description</Label>
                <textarea id="add-description" value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full h-24 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell customers about the materials, sizes, and craftsmanship..."
                />
              </div>

              <div className="space-y-2">
                <Label>Product Image *</Label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-24 h-24 border border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors shrink-0">
                    <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {imageUrl ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-border relative">
                      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImageUrl('')} className="absolute inset-0 bg-black/40 text-white font-bold text-xs flex items-center justify-center">Remove</button>
                    </div>
                  ) : (
                    <div className="text-[10px] text-muted-foreground">No image uploaded. (Default placeholder will be used if empty)</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Save Product
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleEditProduct} className="bg-white rounded-3xl p-6 max-w-lg w-full border border-border shadow-craft-lg relative max-h-[90vh] overflow-y-auto animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Product Details</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify existing product details of your store item</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-title">Product Title *</Label>
                <Input id="edit-title" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-price">Price ($) *</Label>
                  <Input id="edit-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-stock">Stock Qty *</Label>
                  <Input id="edit-stock" type="number" value={stock} onChange={e => setStock(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-category">Category</Label>
                <select id="edit-category" value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-description">Description</Label>
                <textarea id="edit-description" value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full h-24 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-24 h-24 border border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors shrink-0">
                    <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  {imageUrl ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-border relative">
                      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImageUrl('')} className="absolute inset-0 bg-black/40 text-white font-bold text-xs flex items-center justify-center">Remove</button>
                    </div>
                  ) : (
                    <div className="text-[10px] text-muted-foreground">No image.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
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
    </ArtisanLayout>
  );
}
