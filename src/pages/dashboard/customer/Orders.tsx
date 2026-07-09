import { useState } from 'react';
import { Search, MapPin, Package, Eye } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_ORDERS } from '@/services/mockData';
import { ORDER_STATUSES } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TABS = ['All', 'Active', 'Delivered', 'Cancelled'];

export default function CustomerOrders() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');

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
                      onClick={() => toast.info('Order details coming soon')}>
                      <Eye className="w-3 h-3" /> Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
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
    </CustomerLayout>
  );
}
