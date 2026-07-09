import { useState } from 'react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { DollarSign, TrendingUp, CreditCard, ArrowDownToLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_ANALYTICS, STORE_STATS } from '@/services/mockData';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'sale', description: 'Stoneware Mug Set — Alice Johnson', amount: 68, date: '2026-07-08' },
  { id: 't2', type: 'sale', description: 'Floating Shelf Set — Bob Williams', amount: 145, date: '2026-07-07' },
  { id: 't3', type: 'sale', description: 'Macramé Wall Hanging — Carol Davis', amount: 95, date: '2026-07-06' },
  { id: 't4', type: 'payout', description: 'Weekly payout to bank account', amount: -580, date: '2026-07-05' },
  { id: 't5', type: 'sale', description: 'Lavender Candle x3 — David Lee', amount: 114, date: '2026-07-04' },
  { id: 't6', type: 'sale', description: 'Abstract Canvas — Eve Martinez', amount: 220, date: '2026-07-03' },
];

export default function ArtisanEarnings() {
  const [pendingPayout, setPendingPayout] = useState(1240);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  
  // Payout modals state
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showEarlyPayoutModal, setShowEarlyPayoutModal] = useState(false);

  const handleConfirmPayout = () => {
    if (pendingPayout <= 0) {
      toast.error('No pending payout balance');
      return;
    }
    const newTx: Transaction = {
      id: `t_${Date.now()}`,
      type: 'payout',
      description: 'Standard payout to bank account',
      amount: -pendingPayout,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTx, ...prev]);
    toast.success(`Payout request for $${pendingPayout.toLocaleString()} submitted! Funds will arrive in 2-3 business days.`);
    setPendingPayout(0);
    setShowPayoutModal(false);
  };

  const handleConfirmEarlyPayout = () => {
    if (pendingPayout <= 0) {
      toast.error('No pending payout balance');
      return;
    }
    const fee = parseFloat((pendingPayout * 0.01).toFixed(2));
    const netPayout = pendingPayout - fee;
    const newTx: Transaction = {
      id: `t_${Date.now()}`,
      type: 'payout',
      description: 'Immediate early payout (1% fee applied)',
      amount: -netPayout,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTx, ...prev]);
    toast.success(`Early payout request completed! $${netPayout.toLocaleString()} has been sent to your Chase bank account.`);
    setPendingPayout(0);
    setShowEarlyPayoutModal(false);
  };

  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Earnings</h1>
          <p className="text-muted-foreground text-sm mt-1">Track your revenue and payouts</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => setShowPayoutModal(true)}>
          <ArrowDownToLine className="w-4 h-4" /> Request Payout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earned', value: `$${STORE_STATS.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-primary' },
          { label: 'This Month', value: `$${STORE_STATS.monthlyRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-secondary' },
          { label: 'Pending Payout', value: `$${pendingPayout.toLocaleString()}`, icon: CreditCard, color: 'text-accent' },
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
            <div className="font-display font-bold text-3xl text-primary mb-1">${pendingPayout.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Scheduled: July 15, 2026</p>
            <Button className="btn-primary w-full rounded-xl mt-4" onClick={() => setShowEarlyPayoutModal(true)}>
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
          {transactions.map(t => (
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
                {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Request Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Confirm Payout</h3>
            <p className="text-xs text-muted-foreground mb-4">Transfer your earnings to your linked bank account</p>

            <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payout Amount:</span>
                <span className="font-bold text-foreground">${pendingPayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transfer Fee:</span>
                <span className="font-medium text-secondary">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium text-foreground">Chase Bank (****4521)</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowPayoutModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleConfirmPayout} className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Confirm Payout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Request Early Payout Modal */}
      {showEarlyPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Request Early Payout</h3>
            <p className="text-xs text-muted-foreground mb-4">Request payout immediately. An early processing fee of 1% applies.</p>

            <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payout Amount:</span>
                <span className="font-bold text-foreground">${pendingPayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Fee (1%):</span>
                <span className="font-semibold text-red-500">-${(pendingPayout * 0.01).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border/80 pt-2 font-bold text-base">
                <span>Net Transfer Amount:</span>
                <span className="text-primary">${(pendingPayout - pendingPayout * 0.01).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowEarlyPayoutModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleConfirmEarlyPayout} className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Request Immediate Payout
              </Button>
            </div>
          </div>
        </div>
      )}
    </ArtisanLayout>
  );
}
