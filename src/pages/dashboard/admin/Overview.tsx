import { Users, ShoppingCart, DollarSign, Package, TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/layouts/role/AdminLayout';
import { ROUTES } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { MOCK_ANALYTICS } from '@/services/mockData';

const PENDING_ACTIONS = [
  { id: 'a1', type: 'seller', text: 'Emma Wilson applied for seller verification', time: '5m ago', urgent: true },
  { id: 'a2', type: 'content', text: 'Product listing flagged for review: "Handmade Silver Ring"', time: '12m ago', urgent: true },
  { id: 'a3', type: 'workshop', text: 'New workshop pending approval: "Advanced Macramé"', time: '1h ago', urgent: false },
  { id: 'a4', type: 'content', text: 'Community post reported by 3 users', time: '2h ago', urgent: false },
];

export default function AdminOverview() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Admin Dashboard ⚙️</h1>
        <p className="text-muted-foreground text-sm mt-1">Platform overview and management</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: '52,480', change: '+840 today', icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Orders', value: '18,420', change: '+124 today', icon: ShoppingCart, color: 'text-primary bg-primary/10' },
          { label: 'Platform Revenue', value: '$184K', change: '+12% MoM', icon: DollarSign, color: 'text-green-600 bg-green-50' },
          { label: 'Active Listings', value: '2.1M', change: '+2.4K today', icon: Package, color: 'text-purple-600 bg-purple-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xs text-secondary font-medium">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Platform Revenue</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="adg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0,72%,51%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(0,72%,51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(0,72%,51%)" strokeWidth={2} fill="url(#adg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3">
          {[
            { label: 'Pending Verifications', value: '5', icon: Clock, color: 'text-yellow-600 bg-yellow-50', href: ROUTES.ADMIN_SELLERS },
            { label: 'Content Flags', value: '8', icon: AlertTriangle, color: 'text-red-600 bg-red-50', href: ROUTES.ADMIN_CONTENT },
            { label: 'Pending Workshops', value: '3', icon: CheckCircle, color: 'text-blue-600 bg-blue-50', href: ROUTES.ADMIN_WORKSHOPS },
          ].map((s, i) => (
            <Link key={i} to={s.href}>
              <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3 hover:shadow-craft transition-all cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}><s.icon className="w-5 h-5" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{s.label}</p><p className="text-xs text-muted-foreground">Needs action</p></div>
                <span className="font-bold text-lg text-red-600">{s.value}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pending Actions */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Pending Actions</h3>
          <Link to={ROUTES.ADMIN_CONTENT} className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="space-y-3">
          {PENDING_ACTIONS.map(action => (
            <div key={action.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
              <div className={`w-2 h-2 rounded-full shrink-0 ${action.urgent ? 'bg-red-500' : 'bg-yellow-500'}`} />
              <p className="text-sm flex-1">{action.text}</p>
              <span className="text-xs text-muted-foreground shrink-0">{action.time}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
