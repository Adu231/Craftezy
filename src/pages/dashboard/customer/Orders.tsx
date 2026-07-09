import { useState } from 'react';
import { Search, MapPin, Package, Eye, Star } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MOCK_ORDERS } from '@/services/mockData';
import { ORDER_STATUSES } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Order } from '@/types';

const TABS = ['All', 'Active', 'Delivered', 'Cancelled'];

export default function CustomerOrders() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  
  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const filtered = MOCK_ORDERS.filter(o => {
    const matchSearch = !search || o.product.title.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === 'All' ||
      (tab === 'Active' && ['pending', 'confirmed', 'processing', 'shipped'].includes(o.status)) ||
      (tab === 'Delivered' && o.status === 'delivered') ||
      (tab === 'Cancelled' && o.status === 'cancelled');
    return matchSearch && matchTab;
  });

  return (
    <CustomerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">Track and manage your purchases</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all',
              tab === t ? 'bg-primary text-white shadow-craft' : 'bg-muted text-muted-foreground hover:text-foreground'
            )}>
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map(order => {
          const statusConfig = ORDER_STATUSES[order.status];
          return (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={order.product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm">{order.product.title}</h3>
                    <Badge className={cn('text-[10px] shrink-0', statusConfig.color)}>{statusConfig.label}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Order #{order.id} · Qty: {order.quantity}</p>
                  <p className="text-xs text-muted-foreground">Ordered: {new Date(order.createdAt).toLocaleDateString()}</p>
                  {order.trackingNumber && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-secondary font-medium">
                      <MapPin className="w-3 h-3" /> Tracking: {order.trackingNumber}
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-lg text-primary">${order.totalPrice}</div>
                  <div className="flex flex-col gap-1 mt-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg gap-1"
                      onClick={() => setSelectedOrder(order)}>
                      <Eye className="w-3 h-3" /> Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg animate-pulse"
                        onClick={() => setReviewOrder(order)}>
                        Write Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {/* Delivery progress */}
              {['pending','confirmed','processing','shipped'].includes(order.status) && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-2">
                    <span>Order Placed</span><span>Confirmed</span><span>Processing</span><span>Shipped</span><span>Delivered</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full">
                    <div className="h-full bg-primary rounded-full transition-all" style={{
                      width: order.status === 'pending' ? '10%' : order.status === 'confirmed' ? '30%' : order.status === 'processing' ? '55%' : '78%'
                    }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in fade-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground">Order Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border">
                  <img src={selectedOrder.product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{selectedOrder.product.title}</h4>
                  <p className="text-xs text-muted-foreground">Order #{selectedOrder.id}</p>
                </div>
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Status</span>
                  <span className="font-semibold capitalize text-foreground">{selectedOrder.status}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Date Ordered</span>
                  <span className="text-foreground">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Quantity</span>
                  <span className="text-foreground">{selectedOrder.quantity}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total Paid</span>
                  <span className="font-bold text-primary">${selectedOrder.totalPrice}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-foreground mb-1">Shipping Address</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  123 Creative Lane, Austin, TX 78701
                </p>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Tracking Info</p>
                  <p className="text-xs text-secondary font-medium">
                    Courier: USPS · Tracking Number: {selectedOrder.trackingNumber}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedOrder(null)} className="rounded-xl px-5">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in fade-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Write a Review</h3>
            <p className="text-xs text-muted-foreground mb-4">Share your feedback on "{reviewOrder.product.title}"</p>
            
            <div className="space-y-4">
              {/* Star selector */}
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1.5 block">Your Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={cn("w-6 h-6 transition-colors", star <= reviewRating ? 'text-[hsl(35,75%,42%)] fill-current' : 'text-muted-foreground/30')} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text area */}
              <div className="space-y-1.5">
                <Label htmlFor="review-comment" className="text-xs font-semibold">Your Review</Label>
                <textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  className="w-full h-28 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="What did you like or dislike about this product? Tell other makers about it..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setReviewOrder(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!reviewComment.trim()) {
                    toast.error('Please write a review comment');
                    return;
                  }
                  toast.success('Thank you! Your review has been submitted.');
                  setReviewOrder(null);
                  setReviewComment('');
                  setReviewRating(5);
                }}
                className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}
