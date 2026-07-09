import { useState } from 'react';
import { Search, Filter, Eye, Package } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_ORDERS } from '@/services/mockData';
import { ORDER_STATUSES } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Order } from '@/types';

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function ArtisanOrders() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  
  // Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = MOCK_ORDERS.filter(o => {
    const matchSearch = !search || o.product.title.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'All' || o.status.toLowerCase() === activeTab.toLowerCase();
    return matchSearch && matchTab;
  });

  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{MOCK_ORDERS.length} total orders</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2" onClick={() => toast.info('Export functionality coming soon')}>
          <Filter className="w-4 h-4" /> Export
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1">
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn('shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              activeTab === tab ? 'bg-primary text-white shadow-craft' : 'bg-muted text-muted-foreground hover:text-foreground')}>
            {tab}
            <span className="ml-1.5 text-xs opacity-70">
              {tab === 'All' ? MOCK_ORDERS.length : MOCK_ORDERS.filter(o => o.status.toLowerCase() === tab.toLowerCase()).length}
            </span>
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search by product or customer..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No orders found</p>
          </div>
        ) : filtered.map(order => {
          const statusConfig = ORDER_STATUSES[order.status];
          return (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={order.product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-sm">{order.product.title}</h3>
                      <p className="text-xs text-muted-foreground">by {order.customer.name}</p>
                    </div>
                    <Badge className={cn('text-[10px] shrink-0', statusConfig.color)}>{statusConfig.label}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span>Order #{order.id}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span>Qty: {order.quantity}</span>
                    {order.trackingNumber && <span>Track: {order.trackingNumber}</span>}
                    {order.isCustomOrder && <Badge className="bg-primary/10 text-primary text-[10px]">Custom</Badge>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-lg text-primary">${order.totalPrice}</div>
                  <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs rounded-lg gap-1"
                    onClick={() => setSelectedOrder(order)}>
                    <Eye className="w-3 h-3" /> Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground">Artisan Order Details</h3>
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
                  <span>Buyer</span>
                  <span className="font-semibold text-foreground">{selectedOrder.customer.name}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Buyer Email</span>
                  <span className="text-foreground">{selectedOrder.customer.email || 'customer@craftezy.com'}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Status</span>
                  <span className="font-semibold capitalize text-foreground">{selectedOrder.status}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Quantity Ordered</span>
                  <span className="text-foreground">{selectedOrder.quantity}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total Revenue</span>
                  <span className="font-bold text-primary">${selectedOrder.totalPrice}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-foreground mb-1">Destination Address</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  123 Creative Lane, Austin, TX 78701
                </p>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Shipping Details</p>
                  <p className="text-xs text-secondary font-medium">
                    Courier: USPS · Tracking Reference: {selectedOrder.trackingNumber}
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
    </ArtisanLayout>
  );
}
