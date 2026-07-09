import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { DollarSign, TrendingUp, CreditCard, ArrowDownToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_ANALYTICS, STORE_STATS } from '@/services/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { toast } from 'sonner';

const TRANSACTIONS = [
  { id: 't1', type: 'sale', description: 'Stoneware Mug Set — Alice Johnson', amount: 68, date: '2026-07-08' },
  { id: 't2', type: 'sale', description: 'Floating Shelf Set — Bob Williams', amount: 145, date: '2026-07-07' },
  { id: 't3', type: 'sale', description: 'Macramé Wall Hanging — Carol Davis', amount: 95, date: '2026-07-06' },
  { id: 't4', type: 'payout', description: 'Weekly payout to bank account', amount: -580, date: '2026-07-05' },
  { id: 't5', type: 'sale', description: 'Lavender Candle x3 — David Lee', amount: 114, date: '2026-07-04' },
  { id: 't6', type: 'sale', description: 'Abstract Canvas — Eve Martinez', amount: 220, date: '2026-07-03' },
];

export default function ArtisanEarnings() {
  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Earnings</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your revenue and payouts</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Payout processing coming soon')}>
          <ArrowDownToLine className="w-4 h-4" /> Request Payout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earned', value: `$${STORE_STATS.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-primary' },
          { label: 'This Month', value: `$${STORE_STATS.monthlyRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-secondary' },
          { label: 'Pending Payout', value: '$1,240', icon: CreditCard, color: 'text-accent' },
          { label: 'Platform Fee', value: '2%', icon: DollarSign, color: 'text-muted-foreground' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className={`font-display font-bold text-2xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16,57%,50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(16,57%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Earnings']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(16,57%,50%)" strokeWidth={2} fill="url(#eg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payout Info */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-5">
            <h3 className="font-semibold text-sm mb-1">Next Payout</h3>
            <div className="font-display font-bold text-3xl text-primary mb-1">$1,240</div>
            <p className="text-xs text-muted-foreground">Scheduled: July 15, 2026</p>
            <Button className="btn-primary w-full rounded-xl mt-4" onClick={() => toast.info('Payout processing coming soon')}>
              Request Early Payout
            </Button>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-sm mb-3">Payout Method</h3>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Bank Account</p>
                <p className="text-xs text-muted-foreground">****4521 — Chase Bank</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="mt-6 bg-card rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold">Transaction History</h3>
        </div>
        <div className="divide-y divide-border">
          {TRANSACTIONS.map(t => (
            <div key={t.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.type === 'sale' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                  {t.type === 'sale' ? <TrendingUp className="w-4 h-4" /> : <ArrowDownToLine className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${t.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                {t.amount > 0 ? '+' : ''}${Math.abs(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ArtisanLayout>
  );
}
