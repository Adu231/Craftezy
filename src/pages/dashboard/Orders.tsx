import { useState } from 'react';
import { Search, Filter, Eye, Package } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_ORDERS } from '@/services/mockData';
import { ORDER_STATUSES } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const STATUS_TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = MOCK_ORDERS.filter(o => {
    const matchesSearch = !search || o.product.title.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'All' || o.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{MOCK_ORDERS.length} total orders</p>
        </div>
        <Button variant="outline" className="rounded-xl gap-2">
          <Filter className="w-4 h-4" /> Export
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 pb-1">
        {STATUS_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              activeTab === tab ? 'bg-primary text-white shadow-craft' : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {tab}
            <span className="ml-1.5 text-xs opacity-70">
              {tab === 'All' ? MOCK_ORDERS.length : MOCK_ORDERS.filter(o => o.status.toLowerCase() === tab.toLowerCase()).length}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by product or customer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
        />
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No orders found</p>
          </div>
        ) : (
          filtered.map(order => {
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
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-lg text-primary">${order.totalPrice}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 text-xs rounded-lg gap-1"
                      onClick={() => toast.info('Order details coming soon')}
                    >
                      <Eye className="w-3 h-3" /> Details
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}
