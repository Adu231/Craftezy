import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function CustomerWishlist() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(MOCK_PRODUCTS.slice(0, 5));

  const removeItem = (id: string) => {
    setWishlist(prev => prev.filter(p => p.id !== id));
    toast.success('Removed from wishlist');
  };

  return (
    <CustomerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Wishlist</h1>
          <p className="text-muted-foreground text-sm mt-1">{wishlist.length} saved items</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2 text-sm" onClick={() => toast.info('Share wishlist coming soon')}>
          Share Wishlist
        </Button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground text-sm mb-6">Browse the marketplace and save items you love</p>
          <Link to={ROUTES.MARKETPLACE}>
            <Button className="btn-primary rounded-xl">Browse Marketplace</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map(product => (
            <div key={product.id} className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-craft-lg transition-all hover:-translate-y-1 duration-300">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                {product.isBestseller && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Bestseller</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</p>
                <p className="text-xs text-muted-foreground mb-2">by {product.artisan.name}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 text-accent fill-current" />
                  <span className="text-xs font-semibold">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-primary">${product.price}</span>
                    {product.originalPrice && <span className="text-xs text-muted-foreground line-through ml-1.5">${product.originalPrice}</span>}
                  </div>
                  <Button size="sm" className="btn-primary rounded-xl h-8 text-xs gap-1"
                    onClick={() => {
                      addItem(product);
                      toast.success(`"${product.title}" added to cart`);
                      navigate('/cart');
                    }}>
                    <ShoppingBag className="w-3 h-3" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomerLayout>
  );
}
