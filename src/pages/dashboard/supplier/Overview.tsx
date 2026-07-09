import { Package, ShoppingCart, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const SUPPLY_ORDERS = [
  { id: 'so1', buyer: 'Emma Hartwell', items: 'Cotton Rope 500m', amount: 48, status: 'shipped', date: '2026-07-08' },
  { id: 'so2', buyer: 'James Rivera', items: 'Wood Stain Kit', amount: 32, status: 'processing', date: '2026-07-07' },
  { id: 'so3', buyer: 'Priya Nair', items: 'Silver Wire 24 Gauge', amount: 85, status: 'delivered', date: '2026-07-05' },
];

const MONTHLY_ORDERS = [
  { month: 'Apr', orders: 120 }, { month: 'May', orders: 145 }, { month: 'Jun', orders: 198 }, { month: 'Jul', orders: 234 },
];

export default function SupplierOverview() {
  const { user } = useAuth();
  return (
    <SupplierLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Welcome, {user?.name?.split(' ')[0]}! 📦</h1>
        <p className="text-muted-foreground text-sm mt-1">Your supply business at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: '$42,800', change: '+22%', icon: DollarSign, color: 'text-primary bg-primary/10' },
          { label: 'Active Orders', value: '234', change: '+18%', icon: ShoppingCart, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Materials Listed', value: '89', change: '+5', icon: Package, color: 'text-blue-600 bg-blue-50' },
          { label: 'Avg Order Value', value: '$183', change: '+8%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
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

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Monthly Order Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_ORDERS}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [v, 'Orders']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="orders" fill="hsl(35,70%,55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Recent Orders</h3>
            <Link to={ROUTES.SUPPLIER_ORDERS} className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {SUPPLY_ORDERS.map(o => (
              <div key={o.id} className="p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors">
                <p className="text-xs font-medium">{o.buyer}</p>
                <p className="text-[10px] text-muted-foreground">{o.items}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-primary">${o.amount}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${o.status === 'delivered' ? 'bg-green-100 text-green-800' : o.status === 'shipped' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SupplierLayout>
  );
}
