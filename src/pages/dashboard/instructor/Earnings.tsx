import { useState } from 'react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { DollarSign, TrendingUp, Users, ArrowDownToLine, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { toast } from 'sonner';

const EARNINGS_DATA = [
  { month: 'Jan', courses: 800, workshops: 200 }, { month: 'Feb', courses: 1200, workshops: 300 },
  { month: 'Mar', courses: 1600, workshops: 420 }, { month: 'Apr', courses: 1400, workshops: 380 },
  { month: 'May', courses: 2100, workshops: 540 }, { month: 'Jun', courses: 2600, workshops: 680 },
  { month: 'Jul', courses: 3100, workshops: 720 },
];

export default function InstructorEarnings() {
  const [pendingPayout, setPendingPayout] = useState(1820);
  const [showPayoutModal, setShowPayoutModal] = useState(false);

  const handleConfirmPayout = () => {
    if (pendingPayout <= 0) {
      toast.error('No pending balance to request payout');
      return;
    }
    toast.success(`Payout of $${pendingPayout.toLocaleString()} requested! Funds will reach Chase Bank (****4521) in 2-3 business days.`);
    setPendingPayout(0);
    setShowPayoutModal(false);
  };

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Earnings</h1>
          <p className="text-muted-foreground text-sm mt-1">Teaching revenue breakdown</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => setShowPayoutModal(true)}>
          <ArrowDownToLine className="w-4 h-4" /> Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earned', value: '$14,280', icon: DollarSign, color: 'text-secondary' },
          { label: 'This Month', value: '$3,820', icon: TrendingUp, color: 'text-primary' },
          { label: 'From Courses', value: '$11,480', icon: Users, color: 'text-blue-600' },
          { label: 'From Workshops', value: `$${(2800).toLocaleString()}`, icon: DollarSign, color: 'text-accent' },
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

      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <h3 className="font-semibold mb-5">Monthly Earnings by Source</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={EARNINGS_DATA}>
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(125,45%,33%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(125,45%,33%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(40,79%,53%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(40,79%,53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
            <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`]} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="courses" name="Courses" stroke="hsl(125,45%,33%)" strokeWidth={2} fill="url(#cg)" />
            <Area type="monotone" dataKey="workshops" name="Workshops" stroke="hsl(40,79%,53%)" strokeWidth={2} fill="url(#wg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl border border-secondary/20 p-6">
          <h3 className="font-semibold text-sm mb-1">Pending Payout</h3>
          <div className="font-display font-bold text-4xl text-secondary mb-1">${pendingPayout.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mb-4">Available July 15, 2026</p>
          <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl w-full" onClick={() => setShowPayoutModal(true)}>Request Payout</Button>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4">Revenue Split</h3>
          <div className="space-y-4">
            {[
              { label: 'Courses', value: '$11,480', percent: 80, color: 'bg-secondary' },
              { label: 'Workshops', value: '$2,800', percent: 20, color: 'bg-accent' },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2"><span>{s.label}</span><span className="font-semibold">{s.value}</span></div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Confirm Payout</h3>
            <p className="text-xs text-muted-foreground mb-4">Transfer your instructor earnings to Chase bank</p>

            <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payout Amount:</span>
                <span className="font-bold text-foreground">${pendingPayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transfer Method:</span>
                <span className="font-medium text-foreground">Chase Bank (****4521)</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowPayoutModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleConfirmPayout} className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Confirm Payout
              </Button>
            </div>
          </div>
        </div>
      )}
    </InstructorLayout>
  );
}
