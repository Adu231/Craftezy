import AdminLayout from '@/layouts/role/AdminLayout';
import { DollarSign, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { MOCK_ANALYTICS, STORE_STATS } from '@/services/mockData';

const COLORS = ['hsl(16,57%,50%)', 'hsl(125,45%,33%)', 'hsl(40,79%,53%)', 'hsl(0,72%,51%)'];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="mb-6"><h1 className="font-display font-bold text-2xl sm:text-3xl">Platform Analytics</h1><p className="text-muted-foreground text-sm mt-1">Marketplace-wide performance metrics</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Platform Revenue', value: '$184K', icon: DollarSign, change: '+12%' },
          { label: 'GMV', value: '$2.4M', icon: ShoppingCart, change: '+18%' },
          { label: 'Active Users', value: '52.4K', icon: Users, change: '+8%' },
          { label: 'Take Rate', value: '7.8%', icon: TrendingUp, change: '+0.3%' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-3"><s.icon className="w-5 h-5 text-red-600" /></div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xs text-secondary font-medium">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="adag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0,72%,51%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(0,72%,51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(0,72%,51%)" strokeWidth={2} fill="url(#adag)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Top Product Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_ANALYTICS.topProducts} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="hsl(0,72%,51%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Orders by Status</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart><Pie data={MOCK_ANALYTICS.ordersByStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="count" paddingAngle={3}>
                {MOCK_ANALYTICS.ordersByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie></PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {MOCK_ANALYTICS.ordersByStatus.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} /><span className="text-muted-foreground">{d.status}</span></div>
                  <span className="font-semibold">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Traffic Sources</h3>
          <div className="space-y-4">
            {MOCK_ANALYTICS.trafficSources.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1.5"><span>{s.source}</span><span className="font-semibold">{s.percentage}%</span></div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
