import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { CreditCard, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Workshop } from '@/types';

export default function Checkout() {
  const location = useLocation();
  const checkoutState = location.state as { type: 'workshop'; item: Workshop } | null;

  const { items: cartItems, totalPrice: cartTotalPrice, clearCart } = useCart();

  const items = checkoutState?.type === 'workshop' 
    ? [{ 
        product: { 
          id: checkoutState.item.id,
          title: checkoutState.item.title, 
          price: checkoutState.item.price, 
          images: [checkoutState.item.thumbnail],
          artisan: { name: checkoutState.item.instructor.name } 
        }, 
        quantity: 1 
      }] 
    : cartItems;

  const totalPrice = checkoutState?.type === 'workshop' 
    ? checkoutState.item.price 
    : cartTotalPrice;

  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [address, setAddress] = useState('123 Creative Lane');
  const [city, setCity] = useState('Austin');
  const [zip, setZip] = useState('78701');
  const [cardName, setCardName] = useState(user?.name || '');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const isWorkshop = checkoutState?.type === 'workshop';
    if (isWorkshop) {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
        toast.error('Please complete all card payment fields');
        return;
      }
    } else {
      if (!address || !city || !zip || !cardName || !cardNumber || !cardExpiry || !cardCvc) {
        toast.error('Please complete all form fields');
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success('Payment completed successfully!');
    }, 2500);
  };

  if (isSuccess) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-cream to-white px-4">
          <div className="text-center max-w-md mx-auto bg-white rounded-3xl border border-border p-8 shadow-craft-lg">
            <div className="relative mb-6 inline-flex items-center justify-center p-4 bg-green-50 text-green-500 rounded-full">
              <CheckCircle2 className="w-16 h-16" />
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Thank you for supporting independent artisans. Your payment was processed successfully. You will receive an email confirmation shortly.
            </p>
            <div className="space-y-3">
              <Link to={checkoutState?.type === 'workshop' ? '/dashboard/learner/workshops' : '/dashboard/customer/orders'}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-semibold">
                  {checkoutState?.type === 'workshop' ? 'View My Workshops' : 'Track My Orders'}
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" className="w-full border-border rounded-xl h-12 font-semibold">
                  Return to Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to={checkoutState?.type === 'workshop' ? `/workshops/${checkoutState.item.id}` : "/cart"} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to {checkoutState?.type === 'workshop' ? 'Workshop Details' : 'Cart'}
            </Link>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground">Secure Checkout</h1>
            <p className="text-muted-foreground text-sm mt-1">Complete your order with encrypted card payment</p>
          </div>

          <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left columns: forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              {checkoutState?.type !== 'workshop' && (
                <div className="bg-white rounded-3xl border border-border p-6 shadow-craft-sm space-y-4">
                  <h3 className="font-semibold text-lg text-foreground pb-2 border-b border-border">Shipping Address</h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="shipping-address">Street Address</Label>
                      <Input
                        id="shipping-address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="h-11 rounded-xl border-border bg-white"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="shipping-city">City</Label>
                        <Input
                          id="shipping-city"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="h-11 rounded-xl border-border bg-white"
                          placeholder="Austin"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="shipping-zip">Zip Code</Label>
                        <Input
                          id="shipping-zip"
                          value={zip}
                          onChange={e => setZip(e.target.value)}
                          className="h-11 rounded-xl border-border bg-white"
                          placeholder="78701"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Details */}
              <div className="bg-white rounded-3xl border border-border p-6 shadow-craft-sm space-y-4">
                <h3 className="font-semibold text-lg text-foreground pb-2 border-b border-border">Payment Method</h3>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input
                      id="card-name"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      className="h-11 rounded-xl border-border bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="h-11 rounded-xl border-border bg-white pr-10"
                      />
                      <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="h-11 rounded-xl border-border bg-white"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="card-cvc">CVC Code</Label>
                      <Input
                        id="card-cvc"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="h-11 rounded-xl border-border bg-white"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: checkout summary */}
            <div className="bg-white rounded-3xl border border-border p-6 shadow-craft-sm h-fit space-y-6">
              <h3 className="font-semibold text-lg text-foreground pb-4 border-b border-border">Your Order</h3>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-xs">
                    <div className="min-w-0 flex-1 pr-4">
                      <p className="font-semibold text-foreground truncate">{item.product.title}</p>
                      <p className="text-muted-foreground">{item.quantity} x ${item.product.price}</p>
                    </div>
                    <span className="font-bold text-foreground shrink-0">${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Summary calculations */}
              <div className="space-y-3.5 text-sm pt-4 border-t border-border/60">
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-secondary font-medium">Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes & Fees</span>
                  <span>$0.00</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between font-bold text-base text-foreground">
                  <span>Total Amount</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing || items.length === 0}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-13 font-semibold text-base shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Confirm & Pay ${totalPrice}
                  </>
                )}
              </Button>

              <div className="text-[10px] text-muted-foreground text-center flex items-center gap-1 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                Your transaction is protected with 256-bit SSL encryption.
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
