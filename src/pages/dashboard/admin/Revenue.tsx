import AdminLayout from '@/layouts/role/AdminLayout';
import { DollarSign, TrendingUp, CreditCard, ArrowDownToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MOCK_ANALYTICS } from '@/services/mockData';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminRevenue() {
  return (
    <AdminLayout>
      <div className="mb-6"><h1 className="font-display font-bold text-2xl sm:text-3xl">Revenue</h1><p className="text-muted-foreground text-sm mt-1">Platform revenue and fee tracking</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Platform Revenue', value: '$184,200', color: 'text-red-600 bg-red-50' },
          { label: 'Transaction Fees', value: '$82,400', color: 'text-primary bg-primary/10' },
          { label: 'Subscription Revenue', value: '$48,200', color: 'text-secondary bg-secondary/10' },
          { label: 'This Month', value: '$18,400', color: 'text-blue-600 bg-blue-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><DollarSign className="w-5 h-5" /></div>
            <div className={`font-display font-bold text-xl ${s.color.split(' ')[0]}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Monthly Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={MOCK_ANALYTICS.revenueByMonth}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="hsl(0,72%,51%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-red-50 to-primary/5 rounded-2xl border border-red-200 p-6">
            <h3 className="font-semibold mb-1">Revenue by Type</h3>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Transaction Fees (2-5%)', value: '$82,400', pct: 45 },
                { label: 'Subscriptions (Artisan + Studio)', value: '$48,200', pct: 26 },
                { label: 'Workshop Commissions (15%)', value: '$32,100', pct: 17 },
                { label: 'Featured Listings & Ads', value: '$21,500', pct: 12 },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1"><span>{r.label}</span><span className="font-semibold">{r.value}</span></div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
