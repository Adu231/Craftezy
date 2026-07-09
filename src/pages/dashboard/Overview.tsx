import { DollarSign, ShoppingCart, Package, Users, TrendingUp, Star, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants';
import { MOCK_ORDERS, MOCK_NOTIFICATIONS, STORE_STATS } from '@/services/mockData';
import { ORDER_STATUSES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const REVENUE_DATA = [
  { month: 'Sep', revenue: 2800 }, { month: 'Oct', revenue: 3200 }, { month: 'Nov', revenue: 4100 },
  { month: 'Dec', revenue: 5800 }, { month: 'Jan', revenue: 4200 }, { month: 'Feb', revenue: 4800 }, { month: 'Mar', revenue: 6200 },
];

export default function Overview() {
  const { user } = useAuth();
  const recentOrders = MOCK_ORDERS.slice(0, 4);
  const unreadNotifications = MOCK_NOTIFICATIONS.filter(n => !n.isRead);

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          Good morning, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={STORE_STATS.totalRevenue} prefix="$" change={+18} icon={<DollarSign className="w-5 h-5" />} color="primary" />
        <StatCard title="Total Orders" value={STORE_STATS.totalOrders} change={+12} icon={<ShoppingCart className="w-5 h-5" />} color="secondary" />
        <StatCard title="Products Listed" value={STORE_STATS.totalProducts} change={+4} icon={<Package className="w-5 h-5" />} color="accent" />
        <StatCard title="Total Customers" value={STORE_STATS.totalCustomers} change={+8} icon={<Users className="w-5 h-5" />} color="default" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-base">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground">Last 7 months</p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">
              <TrendingUp className="w-3 h-3" />
              +42% this month
            </div>
          </div>
          <div className="font-display font-bold text-3xl text-foreground mb-4">
            $6,200 <span className="text-sm font-normal text-muted-foreground font-sans">this month</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16,57%,50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(16,57%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(215,16%,47%)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid hsl(214,32%,91%)', fontSize: '12px' }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(16,57%,50%)" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-base mb-5">Store Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Average Rating', value: `${STORE_STATS.averageRating}/5`, icon: <Star className="w-4 h-4 text-accent" />, color: 'bg-accent/15' },
              { label: 'Conversion Rate', value: `${STORE_STATS.conversionRate}%`, icon: <TrendingUp className="w-4 h-4 text-secondary" />, color: 'bg-secondary/10' },
              { label: 'Monthly Orders', value: STORE_STATS.monthlyOrders, icon: <ShoppingCart className="w-4 h-4 text-primary" />, color: 'bg-primary/10' },
              { label: 'Monthly Revenue', value: `$${STORE_STATS.monthlyRevenue.toLocaleString()}`, icon: <DollarSign className="w-4 h-4 text-primary" />, color: 'bg-primary/10' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 ${m.color} rounded-lg flex items-center justify-center`}>{m.icon}</div>
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                </div>
                <span className="font-semibold text-sm">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-semibold">Recent Orders</h3>
            <Link to={ROUTES.DASHBOARD_ORDERS}>
              <Button variant="ghost" size="sm" className="text-primary text-xs rounded-lg gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map(order => {
              const statusConfig = ORDER_STATUSES[order.status];
              return (
                <div key={order.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <img src={order.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{order.product.title}</div>
                    <div className="text-xs text-muted-foreground">by {order.customer.name}</div>
                  </div>
                  <div className="text-sm font-semibold shrink-0">${order.totalPrice}</div>
                  <Badge className={`text-[10px] rounded-lg shrink-0 ${statusConfig.color}`}>{statusConfig.label}</Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="font-semibold">Notifications</h3>
            <Badge className="bg-primary/10 text-primary text-xs rounded-full">{unreadNotifications.length} new</Badge>
          </div>
          <div className="divide-y divide-border">
            {MOCK_NOTIFICATIONS.slice(0, 5).map(n => (
              <div key={n.id} className={`px-5 py-3.5 hover:bg-muted/30 transition-colors flex items-start gap-3 ${!n.isRead ? 'bg-primary/3' : ''}`}>
                <div className="shrink-0 mt-0.5">
                  {!n.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                  {n.isRead && <div className="w-2 h-2 bg-transparent rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.message}</div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    {new Date(n.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
