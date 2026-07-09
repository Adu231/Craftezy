import { useState } from 'react';
import { Search, Package, Truck, Eye } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ORDERS = [
  { id: 'so1', buyer: 'Emma Hartwell', email: 'emma@craftezy.com', items: 'Cotton Rope 500m × 2', amount: 96, status: 'shipped', date: '2026-07-08', tracking: 'TRK8812312' },
  { id: 'so2', buyer: 'James Rivera', items: 'Wood Stain Kit × 1', amount: 32, status: 'processing', date: '2026-07-07', tracking: null },
  { id: 'so3', buyer: 'Priya Nair', items: 'Silver Wire 24G × 3', amount: 85, status: 'delivered', date: '2026-07-05', tracking: 'TRK8812311' },
  { id: 'so4', buyer: 'Marco Chen', items: 'Polymer Clay Set × 2', amount: 40, status: 'pending', date: '2026-07-09', tracking: null },
  { id: 'so5', buyer: 'Lily Zhang', items: 'Merino Wool Roving × 4', amount: 114, status: 'confirmed', date: '2026-07-08', tracking: null },
];

const STATUSES = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800', processing: 'bg-indigo-100 text-indigo-800', shipped: 'bg-purple-100 text-purple-800', delivered: 'bg-green-100 text-green-800' };
const TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

export default function SupplierOrders() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');

  const filtered = ORDERS.filter(o => {
    const matchSearch = !search || o.buyer.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === 'All' || o.status.toLowerCase() === tab.toLowerCase();
    return matchSearch && matchTab;
  });

  return (
    <SupplierLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Supply Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{ORDERS.length} total orders</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              tab === t ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground')}>
            {t}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search buyer..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="space-y-3">
        {filtered.map(order => (
          <div key={order.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft transition-all">
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
                  <Badge className={`text-[10px] shrink-0 ${STATUSES[order.status as keyof typeof STATUSES]}`}>{order.status}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                  <span>Order #{order.id}</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                  {order.tracking && <span className="flex items-center gap-1"><Truck className="w-3 h-3" />{order.tracking}</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-lg text-primary">${order.amount}</div>
                {order.status === 'confirmed' && (
                  <Button size="sm" className="mt-2 h-7 text-xs rounded-lg btn-primary" onClick={() => toast.success('Order dispatched!')}>
                    <Truck className="w-3 h-3 mr-1" /> Dispatch
                  </Button>
                )}
                {order.status !== 'confirmed' && (
                  <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs rounded-lg gap-1" onClick={() => toast.info('Details coming soon')}>
                    <Eye className="w-3 h-3" /> View
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SupplierLayout>
  );
}
