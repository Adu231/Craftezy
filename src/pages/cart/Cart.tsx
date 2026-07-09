import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, CreditCard } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to complete your checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your selected artisan treasures</p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-craft-sm max-w-2xl mx-auto">
              <div className="relative mb-6 inline-flex items-center justify-center p-6 bg-primary/10 rounded-full text-primary">
                <ShoppingBag className="w-16 h-16" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your Cart is Empty</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Looks like you haven't added any creative masterpieces to your cart yet.
              </p>
              <Link to="/marketplace">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-3 font-semibold shadow-md flex items-center justify-center gap-2 mx-auto">
                  <ArrowLeft className="w-4 h-4" />
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl border border-border p-4 flex flex-col sm:flex-row gap-4 items-center justify-between hover:shadow-craft-sm transition-all duration-300"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link to={`/marketplace/product/${item.product.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-sm sm:text-base leading-tight text-foreground line-clamp-1">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">by {item.product.artisan.name}</p>
                        <p className="text-sm font-bold text-primary mt-1.5">${item.product.price}</p>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-border/60">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-border rounded-xl bg-muted/30 overflow-hidden h-9 px-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          removeItem(item.product.id);
                          toast.success(`Removed "${item.product.title}" from cart`);
                        }}
                        className="text-muted-foreground hover:text-destructive p-2 rounded-xl hover:bg-destructive/5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-white rounded-3xl border border-border p-6 shadow-craft-sm h-fit space-y-6">
                <h3 className="font-semibold text-lg text-foreground pb-4 border-b border-border">Order Summary</h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items Total ({totalItems})</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-secondary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between font-bold text-base text-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-semibold text-base shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    <ArrowLeft className="w-3.5 h-3.5" /> Keep Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
