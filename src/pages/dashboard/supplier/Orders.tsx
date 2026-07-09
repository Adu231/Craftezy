import { useState } from 'react';
import { Search, Package, Truck, Eye } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SupplyOrder {
  id: string;
  buyer: string;
  email: string;
  items: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  date: string;
  tracking: string | null;
}

const INITIAL_ORDERS: SupplyOrder[] = [
  { id: 'so1', buyer: 'Emma Hartwell', email: 'emma@example.com', items: 'Cotton Rope 3mm per 100m × 2', amount: 38, status: 'shipped', date: '2026-07-08', tracking: 'TRK8812312' },
  { id: 'so2', buyer: 'James Rivera', email: 'james@example.com', items: 'Beeswax Premium Blocks per 500g × 1', amount: 25, status: 'processing', date: '2026-07-07', tracking: null },
  { id: 'so3', buyer: 'Priya Nair', email: 'priya@example.com', items: 'Sterling Silver Wire 24G per 10ft × 3', amount: 96, status: 'delivered', date: '2026-07-05', tracking: 'TRK8812311' },
  { id: 'so4', buyer: 'Marco Chen', email: 'marco@example.com', items: 'Polymer Clay Set 12 Colors per set × 2', amount: 40, status: 'pending', date: '2026-07-09', tracking: null },
  { id: 'so5', buyer: 'Lily Zhang', email: 'lily@example.com', items: 'Merino Wool Roving per 250g × 4', amount: 114, status: 'confirmed', date: '2026-07-08', tracking: null },
];

const STATUSES = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800'
};
const TABS = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

export default function SupplierOrders() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [orders, setOrders] = useState<SupplyOrder[]>(INITIAL_ORDERS);
  
  // Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<SupplyOrder | null>(null);

  const handleDispatch = (id: string) => {
    const trk = `TRK88${Math.floor(100000 + Math.random() * 900000)}`;
    setOrders(prev => prev.map(o => o.id === id ? {
      ...o,
      status: 'shipped',
      tracking: trk
    } : o));
    toast.success(`Order #${id} dispatched successfully! Tracking reference: ${trk}`);
  };

  const filtered = orders.filter(o => {
    const matchSearch = !search || o.buyer.toLowerCase().includes(search.toLowerCase()) || o.items.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === 'All' || o.status.toLowerCase() === tab.toLowerCase();
    return matchSearch && matchTab;
  });

  return (
    <SupplierLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Supply Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{orders.length} total orders</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize',
              tab === t ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground')}>
            {t === 'All' ? `All (${orders.length})` : t}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search buyer or items..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="space-y-3">
        {filtered.map(order => (
          <div key={order.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-sm">{order.buyer}</h3>
                    <p className="text-xs text-muted-foreground">{order.items}</p>
                  </div>
                  <Badge className={`text-[10px] shrink-0 capitalize ${STATUSES[order.status]}`}>{order.status}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span>Order #{order.id}</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  {order.tracking && <span className="flex items-center gap-1 text-secondary font-medium"><Truck className="w-3 h-3 text-secondary" />{order.tracking}</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-lg text-primary">${order.amount}</div>
                {order.status === 'confirmed' ? (
                  <Button size="sm" className="mt-2 h-7 text-xs rounded-lg btn-primary font-semibold" onClick={() => handleDispatch(order.id)}>
                    <Truck className="w-3 h-3 mr-1" /> Dispatch
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs rounded-lg gap-1 font-semibold text-muted-foreground hover:text-foreground" onClick={() => setSelectedOrder(order)}>
                    <Eye className="w-3 h-3" /> View
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">No supply orders found</p>
        )}
      </div>

      {/* Supply Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground">Supply Order Details</h3>
            <div className="space-y-4 text-sm">
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Order Reference</span>
                  <span className="font-semibold text-foreground">#{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Buyer Name</span>
                  <span className="font-semibold text-foreground">{selectedOrder.buyer}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Buyer Email</span>
                  <span className="text-foreground">{selectedOrder.email}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Order Date</span>
                  <span className="text-foreground">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Status</span>
                  <span className="font-semibold capitalize text-foreground">{selectedOrder.status}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-foreground mb-1.5 font-display">Items Ordered</p>
                <div className="bg-muted/40 p-3 rounded-xl border border-border text-xs leading-relaxed text-foreground">
                  {selectedOrder.items}
                </div>
              </div>

              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-muted-foreground">Total Paid Amount</span>
                <span className="font-bold text-lg text-primary">${selectedOrder.amount}</span>
              </div>

              {selectedOrder.tracking && (
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Shipping Details</p>
                  <p className="text-xs text-secondary font-medium">
                    Courier: DHL Express · Airway Bill: {selectedOrder.tracking}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedOrder(null)} className="rounded-xl px-5">
                Close Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </SupplierLayout>
  );
}
