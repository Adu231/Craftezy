import { Plus, Megaphone, Users, TrendingUp, Edit2, Eye, Trash2 } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

const CAMPAIGNS = [
  { id: 'cp1', name: 'Summer Craft Collection 2026', goal: 'Brand Awareness', creators: 8, reach: '124K', status: 'active', budget: 5000, spent: 3240, startDate: '2026-07-01', endDate: '2026-07-31' },
  { id: 'cp2', name: 'Back to School DIY Kits', goal: 'Product Launch', creators: 5, reach: '68K', status: 'draft', budget: 3000, spent: 0, startDate: '2026-08-01', endDate: '2026-08-31' },
  { id: 'cp3', name: 'Holiday Artisan Gift Guide', goal: 'Sales', creators: 12, reach: '0', status: 'planning', budget: 8000, spent: 0, startDate: '2026-11-01', endDate: '2026-12-25' },
  { id: 'cp4', name: 'Spring Botanical Crafts', goal: 'Engagement', creators: 6, reach: '89K', status: 'completed', budget: 2500, spent: 2480, startDate: '2026-04-01', endDate: '2026-05-31' },
];

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800', draft: 'bg-gray-100 text-gray-800',
  planning: 'bg-blue-100 text-blue-800', completed: 'bg-purple-100 text-purple-800'
};

export default function BrandCampaigns() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  return (
    <BrandLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Campaigns</h1><p className="text-muted-foreground text-sm mt-1">Manage your brand campaigns</p></div>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl gap-2" onClick={() => toast.info('Campaign builder coming soon')}>
          <Plus className="w-4 h-4" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Campaigns', value: campaigns.length },
          { label: 'Active', value: campaigns.filter(c => c.status === 'active').length },
          { label: 'Total Reach', value: '281K' },
          { label: 'Total Spend', value: '$5,720' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-pink-600">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {campaigns.map(c => (
          <div key={c.id} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{c.name}</h3>
                  <Badge className={`text-[10px] ${STATUS_COLORS[c.status]}`}>{c.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Goal: {c.goal}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs gap-1" onClick={() => toast.info('Edit coming soon')}><Edit2 className="w-3 h-3" /> Edit</Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl text-red-400" onClick={() => { setCampaigns(p => p.filter(x => x.id !== c.id)); toast.success('Campaign removed'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
              <div><p className="text-muted-foreground text-xs">Creators</p><p className="font-semibold">{c.creators}</p></div>
              <div><p className="text-muted-foreground text-xs">Reach</p><p className="font-semibold">{c.reach || 'TBD'}</p></div>
              <div><p className="text-muted-foreground text-xs">Budget</p><p className="font-semibold">${c.budget.toLocaleString()}</p></div>
              <div><p className="text-muted-foreground text-xs">Spent</p><p className="font-semibold">${c.spent.toLocaleString()}</p></div>
            </div>
            {c.budget > 0 && (
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>Budget Used</span><span>{Math.round((c.spent / c.budget) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${(c.spent / c.budget) * 100}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </BrandLayout>
  );
}
