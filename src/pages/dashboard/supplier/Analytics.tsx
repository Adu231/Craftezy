import SupplierLayout from '@/layouts/role/SupplierLayout';
import { MOCK_ANALYTICS, STORE_STATS } from '@/services/mockData';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';

const COLORS = ['hsl(16,57%,50%)', 'hsl(125,45%,33%)', 'hsl(40,79%,53%)', 'hsl(16,40%,70%)'];

export default function SupplierAnalytics() {
  const supplierStats = {
    totalRevenue: 54120,
    totalOrders: 489,
    totalProducts: 45,
    totalCustomers: 184,
    monthlyRevenue: 8900,
    monthlyOrders: 78,
    averageRating: 4.8,
    conversionRate: 4.2,
  };

  const topMaterials = [
    { name: 'Organic Cotton Rope', sales: 240, revenue: 4800 },
    { name: 'Natural Clay 10kg', sales: 180, revenue: 3600 },
    { name: 'Pure Beeswax 1kg', sales: 150, revenue: 3000 },
    { name: 'Macramé Dowel Rods', sales: 320, revenue: 1600 },
    { name: 'Stoneware Natural Glaze', sales: 90, revenue: 1800 },
  ];

  return (
    <SupplierLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Supplier Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Raw material sales and customer insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Revenue', value: `$${supplierStats.totalRevenue.toLocaleString()}`, change: '+22%', icon: DollarSign },
          { title: 'Orders Placed', value: supplierStats.totalOrders, change: '+15%', icon: ShoppingCart },
          { title: 'Artisan Buyers', value: supplierStats.totalCustomers, change: '+10%', icon: Users },
          { title: 'Conv. Rate', value: `${supplierStats.conversionRate}%`, change: '+0.8%', icon: TrendingUp },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-muted-foreground">{s.title}</div>
              <div className="text-xs text-secondary font-medium">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Monthly Supply Revenue</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly performance trend</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="ag-supplier" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16,57%,50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(16,57%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(16,57%,50%)" strokeWidth={2} fill="url(#ag-supplier)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top selling materials */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Top Materials sold</h3>
          <p className="text-xs text-muted-foreground mb-5">By units and revenue share</p>
          <div className="space-y-4">
            {topMaterials.map((product, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <div className="font-bold">${product.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SupplierLayout>
  );
}
