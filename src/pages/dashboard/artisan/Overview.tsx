import { DollarSign, ShoppingCart, Package, Star, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_ORDERS, MOCK_PRODUCTS, STORE_STATS, MOCK_ANALYTICS } from '@/services/mockData';
import { ROUTES } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { ORDER_STATUSES } from '@/constants';
import { cn } from '@/lib/utils';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function ArtisanOverview() {
  const { user } = useAuth();

  return (
    <ArtisanLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">
          Welcome, {user?.name?.split(' ')[0]}! 🎨
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Your store is performing great this month</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `$${STORE_STATS.totalRevenue.toLocaleString()}`, change: '+18%', icon: DollarSign, color: 'text-primary bg-primary/10' },
          { label: 'Total Orders', value: STORE_STATS.totalOrders, change: '+12%', icon: ShoppingCart, color: 'text-secondary bg-secondary/10' },
          { label: 'Products', value: STORE_STATS.totalProducts, change: '+3', icon: Package, color: 'text-[hsl(35,70%,42%)] bg-accent/15' },
          { label: 'Avg Rating', value: `${STORE_STATS.averageRating}★`, change: '+0.1', icon: Star, color: 'text-primary bg-primary/10' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xs text-secondary font-medium">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground">Last 8 months</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary text-lg">${STORE_STATS.monthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-secondary">This month</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16,57%,50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(16,57%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(16,57%,50%)" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent Orders</h3>
            <Link to={ROUTES.ARTISAN_ORDERS} className="text-xs text-primary hover:underline flex items-center gap-0.5">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_ORDERS.slice(0, 4).map(order => {
              const s = ORDER_STATUSES[order.status];
              return (
                <div key={order.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
                    <img src={order.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{order.customer.name}</p>
                    <p className="text-[10px] text-muted-foreground">${order.totalPrice}</p>
                  </div>
                  <Badge className={cn('text-[10px] shrink-0', s.color)}>{s.label}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-6 bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">Top Performing Products</h3>
          <Link to={ROUTES.ARTISAN_PRODUCTS} className="text-sm text-primary hover:underline">Manage Products</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.slice(0, 4).map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{p.title}</p>
                <p className="text-xs text-primary font-bold">${p.price}</p>
                <p className="text-[10px] text-muted-foreground">{p.reviewCount} reviews</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ArtisanLayout>
  );
}
