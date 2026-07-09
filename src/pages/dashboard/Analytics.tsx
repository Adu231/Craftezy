import DashboardLayout from '@/layouts/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { MOCK_ANALYTICS, STORE_STATS } from '@/services/mockData';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

const COLORS = ['hsl(16,57%,50%)', 'hsl(125,45%,33%)', 'hsl(40,79%,53%)', 'hsl(16,40%,70%)'];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Business performance overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Revenue" value={STORE_STATS.totalRevenue} prefix="$" change={+18} icon={<DollarSign className="w-5 h-5" />} color="primary" />
        <StatCard title="Orders" value={STORE_STATS.totalOrders} change={+12} icon={<ShoppingCart className="w-5 h-5" />} color="secondary" />
        <StatCard title="Customers" value={STORE_STATS.totalCustomers} change={+8} icon={<Users className="w-5 h-5" />} color="accent" />
        <StatCard title="Conv. Rate" value={`${STORE_STATS.conversionRate}%`} change={+0.5} icon={<TrendingUp className="w-5 h-5" />} color="default" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Revenue Trend</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly revenue performance</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16,57%,50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(16,57%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(16,57%,50%)" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Top Products by Revenue</h3>
          <p className="text-xs text-muted-foreground mb-5">Best performing items</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_ANALYTICS.topProducts} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="hsl(16,57%,50%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Order Status */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Orders by Status</h3>
          <p className="text-xs text-muted-foreground mb-5">Current order distribution</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={MOCK_ANALYTICS.ordersByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="count" paddingAngle={3}>
                  {MOCK_ANALYTICS.ordersByStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [v, 'Orders']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {MOCK_ANALYTICS.ordersByStatus.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{d.status}</span>
                  </div>
                  <span className="font-semibold">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Traffic Sources</h3>
          <p className="text-xs text-muted-foreground mb-5">Where your customers come from</p>
          <div className="space-y-4">
            {MOCK_ANALYTICS.trafficSources.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{s.source}</span>
                  <span className="font-semibold">{s.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
