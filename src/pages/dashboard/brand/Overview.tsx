import { Megaphone, Users, TrendingUp, DollarSign, Plus, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLayout from '@/layouts/role/BrandLayout';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ACTIVE_CAMPAIGNS = [
  { id: 'cp1', name: 'Summer Craft Collection 2026', creators: 8, reach: '124K', status: 'active', budget: '$5,000', spent: '$3,240' },
  { id: 'cp2', name: 'Back to School DIY Kits', creators: 5, reach: '68K', status: 'draft', budget: '$3,000', spent: '$0' },
];

export default function BrandOverview() {
  const { user } = useAuth();
  return (
    <BrandLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Welcome, {user?.name?.split(' ')[0]}! </h1>
        <p className="text-muted-foreground text-sm mt-1">Your brand partnerships and campaigns</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Campaigns', value: '2', change: '+1', icon: Megaphone, color: 'text-pink-600 bg-pink-50' },
          { label: 'Collaborating Creators', value: '13', change: '+4', icon: Users, color: 'text-purple-600 bg-purple-50' },
          { label: 'Total Reach', value: '192K', change: '+28%', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
          { label: 'Campaign Spend', value: '$3,240', change: 'this month', icon: DollarSign, color: 'text-primary bg-primary/10' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xs text-pink-600 font-medium">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Active Campaigns */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Active Campaigns</h3>
            <Link to={ROUTES.BRAND_CAMPAIGNS} className="text-xs text-primary hover:underline flex items-center gap-0.5">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-4">
            {ACTIVE_CAMPAIGNS.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-sm">{c.name}</h4>
                  <Badge className={c.status === 'active' ? 'bg-green-100 text-green-800 text-[10px]' : 'bg-gray-100 text-gray-800 text-[10px]'} >{c.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{c.creators} creators</span>
                  <span>{c.reach} reach</span>
                  <span>${c.spent} / {c.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Brand Tools</h3>
          <div className="space-y-3">
            {[
              { label: 'Launch New Campaign', icon: Megaphone, href: ROUTES.BRAND_CAMPAIGNS },
              { label: 'Discover Creators', icon: Users, href: ROUTES.BRAND_CREATORS },
              { label: 'View Analytics', icon: TrendingUp, href: ROUTES.BRAND_ANALYTICS },
              { label: 'Manage Collaborations', icon: DollarSign, href: ROUTES.BRAND_COLLABORATIONS },
            ].map((a, i) => (
              <Link key={i} to={a.href}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/70 transition-colors cursor-pointer">
                  <a.icon className="w-4 h-4 text-pink-600" />
                  <span className="text-sm font-medium">{a.label}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BrandLayout>
  );
}
