import { Plus, Megaphone, Users, TrendingUp, Edit2, Eye, Trash2 } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

interface Campaign {
  id: string;
  name: string;
  goal: string;
  creators: number;
  reach: string;
  status: 'active' | 'draft' | 'planning' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 'cp1', name: 'Summer Craft Collection 2026', goal: 'Brand Awareness', creators: 8, reach: '124K', status: 'active', budget: 5000, spent: 3240, startDate: '2026-07-01', endDate: '2026-07-31' },
  { id: 'cp2', name: 'Back to School DIY Kits', goal: 'Product Launch', creators: 5, reach: '68K', status: 'draft', budget: 3000, spent: 0, startDate: '2026-08-01', endDate: '2026-08-31' },
  { id: 'cp3', name: 'Holiday Artisan Gift Guide', goal: 'Sales', creators: 12, reach: '0', status: 'planning', budget: 8000, spent: 0, startDate: '2026-11-01', endDate: '2026-12-25' },
  { id: 'cp4', name: 'Spring Botanical Crafts', goal: 'Engagement', creators: 6, reach: '89K', status: 'completed', budget: 2500, spent: 2480, startDate: '2026-04-01', endDate: '2026-05-31' },
];

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800', draft: 'bg-gray-100 text-gray-800',
  planning: 'bg-blue-100 text-blue-800', completed: 'bg-purple-100 text-purple-800'
};
const GOALS = ['Brand Awareness', 'Product Launch', 'Sales', 'Engagement'];
const STATUSES = ['active', 'draft', 'planning', 'completed'] as const;

export default function BrandCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(GOALS[0]);
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState<'active' | 'draft' | 'planning' | 'completed'>('active');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOpenAdd = () => {
    setName('');
    setGoal(GOALS[0]);
    setBudget('');
    setStatus('active');
    setStartDate('');
    setEndDate('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (c: Campaign) => {
    setSelectedCampaign(c);
    setName(c.name);
    setGoal(c.goal);
    setBudget(c.budget.toString());
    setStatus(c.status);
    setStartDate(c.startDate);
    setEndDate(c.endDate);
    setShowEditModal(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !budget || !startDate || !endDate) {
      toast.error('Please enter all required fields');
      return;
    }
    const newCamp: Campaign = {
      id: `camp_${Date.now()}`,
      name,
      goal,
      budget: parseFloat(budget),
      status,
      startDate,
      endDate,
      creators: 0,
      reach: '0',
      spent: 0
    };
    setCampaigns(prev => [newCamp, ...prev]);
    toast.success(`Campaign "${name}" created successfully!`);
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign || !name || !budget || !startDate || !endDate) {
      toast.error('Please enter all required fields');
      return;
    }
    setCampaigns(prev => prev.map(c => c.id === selectedCampaign.id ? {
      ...c,
      name,
      goal,
      budget: parseFloat(budget),
      status,
      startDate,
      endDate
    } : c));
    toast.success('Campaign parameters updated successfully!');
    setShowEditModal(false);
  };

  return (
    <BrandLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Campaigns</h1><p className="text-muted-foreground text-sm mt-1">Manage your brand campaigns</p></div>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl gap-2 font-semibold" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Campaigns', value: campaigns.length },
          { label: 'Active', value: campaigns.filter(c => c.status === 'active').length },
          { label: 'Total Reach', value: `${(campaigns.reduce((a,c) => a + parseFloat(c.reach.replace('K', '') || '0'), 0)).toFixed(0)}K` },
          { label: 'Total Spend', value: `$${campaigns.reduce((a,c) => a + c.spent, 0).toLocaleString()}` },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-pink-600">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {campaigns.map(c => (
          <div key={c.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-craft duration-300">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{c.name}</h3>
                  <Badge className={`text-[10px] capitalize ${STATUS_COLORS[c.status]}`}>{c.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium">Goal: {c.goal} · {new Date(c.startDate).toLocaleDateString()} to {new Date(c.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs gap-1 font-semibold" onClick={() => handleOpenEdit(c)}><Edit2 className="w-3 h-3" /> Edit</Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl text-red-400 hover:bg-red-50" onClick={() => { setCampaigns(p => p.filter(x => x.id !== c.id)); toast.success('Campaign removed'); }}><Trash2 className="w-3.5 h-3.5" /></Button>
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
        {campaigns.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">No campaigns created yet</p>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">New Campaign</h3>
            <p className="text-xs text-muted-foreground mb-4">Launch a new creator engagement project</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="cp-name">Campaign Name *</Label>
                <Input id="cp-name" value={name} onChange={e => setName(e.target.value)} placeholder="Summer Linen Launch 2026" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cp-budget">Budget ($) *</Label>
                  <Input id="cp-budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="2500" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cp-goal">Goal</Label>
                  <select id="cp-goal" value={goal} onChange={e => setGoal(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {GOALS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cp-start">Start Date *</Label>
                  <Input id="cp-start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cp-end">End Date *</Label>
                  <Input id="cp-end" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cp-status">Status</Label>
                <select id="cp-status" value={status} onChange={e => setStatus(e.target.value as 'active' | 'draft' | 'planning' | 'completed')}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {STATUSES.map(s => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white border-none px-5">
                Create Campaign
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {showEditModal && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Campaign Details</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify timing parameters or goal directions</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="cpe-name">Campaign Name *</Label>
                <Input id="cpe-name" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cpe-budget">Budget ($) *</Label>
                  <Input id="cpe-budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cpe-goal">Goal</Label>
                  <select id="cpe-goal" value={goal} onChange={e => setGoal(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {GOALS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cpe-start">Start Date *</Label>
                  <Input id="cpe-start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cpe-end">End Date *</Label>
                  <Input id="cpe-end" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cpe-status">Status</Label>
                <select id="cpe-status" value={status} onChange={e => setStatus(e.target.value as 'active' | 'draft' | 'planning' | 'completed')}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {STATUSES.map(s => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white border-none px-5">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </BrandLayout>
  );
}
