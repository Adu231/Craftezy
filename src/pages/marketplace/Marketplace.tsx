import { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowLeft, Star, ShoppingBag, Zap, Heart, Shield, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/services/mockData';
import MainLayout from '@/layouts/MainLayout';
import ProductCard from '@/components/features/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function Marketplace() {
  const { id } = useParams<{ id?: string }>();
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const selectedCategory = searchParams.get('category') || 'All';
  const setSelectedCategory = (val: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (val === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', val);
    }
    setSearchParams(nextParams);
  };
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  const allTags = ['All', ...Array.from(new Set(MOCK_PRODUCTS.flatMap(p => p.tags)))];

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.artisan.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesTag = selectedTag === 'All' || product.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const selectedProduct = MOCK_PRODUCTS.find(p => p.id === id);

  if (selectedProduct) {
    const inWishlist = isInWishlist(selectedProduct.id);
    const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4);

    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 border border-border shadow-craft-sm mb-16">
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {selectedProduct.images.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-muted border border-border cursor-pointer hover:opacity-85">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-semibold text-xs px-2.5 py-1">
                      {selectedProduct.category}
                    </Badge>
                    {selectedProduct.isBestseller && (
                      <Badge className="bg-mustard text-white border-none font-semibold text-xs px-2.5 py-1">
                        Bestseller
                      </Badge>
                    )}
                  </div>

                  <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4 leading-tight">
                    {selectedProduct.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-mustard fill-current" />
                      <span className="font-semibold text-base">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground text-sm">{selectedProduct.reviewCount} verified reviews</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-4xl font-bold text-foreground">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">${selectedProduct.originalPrice}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-8">
                    {selectedProduct.description}
                  </p>

                  {/* Materials */}
                  {selectedProduct.materials && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-sm text-foreground mb-2.5">Materials:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.materials.map(m => (
                          <span key={m} className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full border border-border">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artisan Info */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border mb-8">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img src={selectedProduct.artisan.avatar} alt={selectedProduct.artisan.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Created by</p>
                      <h5 className="font-semibold text-sm text-foreground">{selectedProduct.artisan.name}</h5>
                      <p className="text-[10px] text-muted-foreground">{selectedProduct.artisan.storeName}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error('Please sign in to add items to your cart');
                          navigate('/login');
                          return;
                        }
                        addItem(selectedProduct);
                        toast.success(`Added "${selectedProduct.title}" to cart`);
                        navigate('/cart');
                      }}
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-14 font-semibold text-base shadow-lg"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error('Please sign in to add items to your wishlist');
                          navigate('/login');
                          return;
                        }
                        toggle(selectedProduct);
                        toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
                      }}
                      size="lg"
                      variant="outline"
                      className={`w-14 h-14 rounded-xl border-border flex items-center justify-center p-0 ${
                        inWishlist ? 'bg-primary/10 border-primary text-primary' : 'bg-white text-muted-foreground'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground justify-center py-2">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-primary" /> Secure checkout
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-primary" /> Ships in {selectedProduct.shippingDays} days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-6">More from this Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
              Artisan <span className="text-primary">Marketplace</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore one-of-a-kind handcrafted treasures, sourced directly from verified global makers.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, materials, or artisans..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-11 pr-4 h-12 rounded-xl border-border w-full bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2.5 items-center">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-1 hidden sm:inline" />
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="h-12 border border-border bg-white rounded-xl px-4 text-sm font-medium focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={selectedTag}
                  onChange={e => setSelectedTag(e.target.value)}
                  className="h-12 border border-border bg-white rounded-xl px-4 text-sm font-medium focus:outline-none"
                >
                  <option value="All">All Tags</option>
                  {allTags.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-border">
              <p className="text-muted-foreground text-lg mb-2">No products found matching your criteria.</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedTag('All'); }}
                className="text-primary font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
