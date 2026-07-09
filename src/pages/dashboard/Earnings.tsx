import DashboardLayout from '@/layouts/DashboardLayout';
import StatCard from '@/components/features/StatCard';
import { DollarSign, TrendingUp, CreditCard, ArrowDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TRANSACTIONS = [
  { id: 'txn_001', type: 'Product Sale', item: 'Stoneware Mug Set', amount: 68, date: '2024-03-16', status: 'completed' },
  { id: 'txn_002', type: 'Workshop Fee', item: 'Live Macramé Workshop', amount: 35, date: '2024-03-15', status: 'completed' },
  { id: 'txn_003', type: 'Product Sale', item: 'Floating Shelf Set', amount: 145, date: '2024-03-14', status: 'completed' },
  { id: 'txn_004', type: 'Course Sale', item: 'Beginner Macramé Course', amount: 49, date: '2024-03-13', status: 'pending' },
  { id: 'txn_005', type: 'Custom Order', item: 'Custom Wall Hanging', amount: 165, date: '2024-03-12', status: 'completed' },
  { id: 'txn_006', type: 'Withdrawal', item: 'Bank Transfer', amount: -2000, date: '2024-03-10', status: 'completed' },
];

const MONTHLY_DATA = [
  { month: 'Oct', products: 2100, courses: 400, workshops: 300 },
  { month: 'Nov', products: 2800, courses: 600, workshops: 700 },
  { month: 'Dec', products: 4200, courses: 800, workshops: 800 },
  { month: 'Jan', products: 3100, courses: 700, workshops: 400 },
  { month: 'Feb', products: 3400, courses: 900, workshops: 500 },
  { month: 'Mar', products: 4500, courses: 1100, workshops: 600 },
];

export default function Earnings() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Earnings</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your revenue across all income streams</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Earnings" value={38420} prefix="$" change={+18} icon={<DollarSign className="w-5 h-5" />} color="primary" />
        <StatCard title="This Month" value={6200} prefix="$" change={+42} icon={<TrendingUp className="w-5 h-5" />} color="secondary" />
        <StatCard title="Available" value={4200} prefix="$" icon={<CreditCard className="w-5 h-5" />} color="accent" />
        <StatCard title="Withdrawn" value={34220} prefix="$" icon={<ArrowDownLeft className="w-5 h-5" />} color="default" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Breakdown */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Revenue Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-5">Products, courses & workshop income</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_DATA}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
              <Bar dataKey="products" name="Products" fill="hsl(16,57%,50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="courses" name="Courses" fill="hsl(125,45%,33%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="workshops" name="Workshops" fill="hsl(40,79%,53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payout */}
        <div className="bg-card rounded-2xl border border-border p-6 flex flex-col">
          <h3 className="font-semibold mb-1">Payout Balance</h3>
          <p className="text-xs text-muted-foreground mb-5">Available for withdrawal</p>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="font-display font-bold text-5xl text-secondary mb-2">$4,200</div>
            <p className="text-sm text-muted-foreground mb-6">Available balance</p>
            <Button className="w-full btn-secondary rounded-xl h-11 font-semibold">Withdraw Funds</Button>
            <p className="text-xs text-muted-foreground mt-3">Processed in 1-3 business days</p>
          </div>
          <div className="mt-4 p-4 bg-muted/50 rounded-xl">
            <div className="text-xs text-muted-foreground mb-1">Pending clearance</div>
            <div className="font-semibold text-sm">$2,000</div>
            <div className="text-xs text-muted-foreground">Clears in 5 days</div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-semibold">Recent Transactions</h3>
          <Button variant="ghost" size="sm" className="text-xs rounded-lg">View All</Button>
        </div>
        <div className="divide-y divide-border">
          {TRANSACTIONS.map(txn => (
            <div key={txn.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${txn.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {txn.amount > 0
                  ? <DollarSign className="w-4 h-4 text-green-600" />
                  : <ArrowDownLeft className="w-4 h-4 text-red-500" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{txn.item}</div>
                <div className="text-xs text-muted-foreground">{txn.type} · {new Date(txn.date).toLocaleDateString()}</div>
              </div>
              <div className={`font-semibold text-sm ${txn.amount > 0 ? 'text-secondary' : 'text-destructive'}`}>
                {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount)}
              </div>
              <Badge className={`text-[10px] ${txn.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {txn.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
