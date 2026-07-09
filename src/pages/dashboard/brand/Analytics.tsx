import BrandLayout from '@/layouts/role/BrandLayout';
import { MOCK_ANALYTICS } from '@/services/mockData';
import { DollarSign, Eye, Heart, BarChart3 } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';

export default function BrandAnalytics() {
  const brandStats = {
    totalSpend: 15400,
    totalImpressions: 450000,
    activeCampaigns: 4,
    creatorPartners: 18,
    cpc: 0.12,
    ctr: 5.8,
  };

  const campaignPerformance = [
    { name: 'Boho Home Decor Co', reach: 120000, spend: 4000 },
    { name: 'Ceramics Showcase', reach: 95000, spend: 3200 },
    { name: 'Woodworking Collab', reach: 145000, spend: 5000 },
    { name: 'Natural Wax Promo', reach: 90000, spend: 3200 },
  ];

  return (
    <BrandLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Brand Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Campaign performance and influencer insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Campaign Spend', value: `$${brandStats.totalSpend.toLocaleString()}`, change: '+15%', icon: DollarSign },
          { title: 'Impressions', value: brandStats.totalImpressions.toLocaleString(), change: '+25%', icon: Eye },
          { title: 'Active Campaigns', value: brandStats.activeCampaigns, change: '+2', icon: BarChart3 },
          { title: 'Engagement Rate', value: `${brandStats.ctr}%`, change: '+0.5%', icon: Heart },
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
        {/* Spend Chart */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Monthly Marketing Spend</h3>
          <p className="text-xs text-muted-foreground mb-5">Monthly spend performance</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="ag-brand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(16,57%,50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(16,57%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${(v * 0.8).toLocaleString()}`, 'Spend']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(16,57%,50%)" strokeWidth={2} fill="url(#ag-brand)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign reach */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-1">Campaign Reach & Spend</h3>
          <p className="text-xs text-muted-foreground mb-5">By reach and budget size</p>
          <div className="space-y-4">
            {campaignPerformance.map((campaign, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.reach.toLocaleString()} reach</p>
                  </div>
                </div>
                <div className="font-bold">${campaign.spend.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrandLayout>
  );
}
