import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  product: Product;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: Props) {
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart');
      navigate('/login');
      return;
    }
    addItem(product);
    toast.success(`Added "${product.title}" to cart`);
    navigate('/cart');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your wishlist');
      navigate('/login');
      return;
    }
    toggle(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link to={`/marketplace/product/${product.id}`} className="group block">
      <div className={cn(
        'bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-craft-lg',
        variant === 'compact' ? '' : ''
      )}>
        {/* Image */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isBestseller && (
              <Badge className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-md">Bestseller</Badge>
            )}
            {product.isFeatured && !product.isBestseller && (
              <Badge className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-md">Featured</Badge>
            )}
            {product.originalPrice && (
              <Badge className="bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-md font-semibold">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
              inWishlist
                ? 'bg-primary text-white'
                : 'bg-white/90 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white'
            )}
          >
            <Heart className={cn('w-4 h-4', inWishlist ? 'fill-current' : '')} />
          </button>
          {/* Custom Order */}
          {product.isCustomOrderAvailable && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-semibold text-foreground">Custom Orders</span>
            </div>
          )}
          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-xl btn-primary shadow-craft h-9 text-sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">by {product.artisan.name}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-accent fill-current" />
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
