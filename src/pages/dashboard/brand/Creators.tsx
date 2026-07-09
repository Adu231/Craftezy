import { useState } from 'react';
import { Search, Star, Filter, UserPlus, X } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Creator {
  id: string;
  name: string;
  specialty: string;
  followers: string;
  avgEngagement: string;
  rating: number;
  completedCollabs: number;
  avatar: string;
  tags: string[];
}

const CREATORS: Creator[] = [
  { id: 'cr1', name: 'Emma Hartwell', specialty: 'Ceramics & Macramé', followers: '12.4K', avgEngagement: '8.2%', rating: 4.9, completedCollabs: 8, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', tags: ['sustainable', 'boho', 'home-decor'] },
  { id: 'cr2', name: 'James Rivera', specialty: 'Woodworking', followers: '9.8K', avgEngagement: '6.5%', rating: 4.8, completedCollabs: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', tags: ['rustic', 'furniture', 'upcycled'] },
  { id: 'cr3', name: 'Priya Nair', specialty: 'Jewelry Design', followers: '21.2K', avgEngagement: '11.4%', rating: 4.7, completedCollabs: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', tags: ['luxury', 'gemstone', 'fashion'] },
  { id: 'cr4', name: 'Marco Chen', specialty: 'Pottery & Ceramics', followers: '7.6K', avgEngagement: '9.1%', rating: 4.9, completedCollabs: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', tags: ['minimalist', 'functional', 'artisan'] },
];

const ALL_TAGS = ['sustainable', 'boho', 'home-decor', 'rustic', 'furniture', 'upcycled', 'luxury', 'gemstone', 'fashion', 'minimalist', 'functional', 'artisan'];

const CAMPAIGN_OPTIONS = [
  'Summer Craft Collection 2026',
  'Back to School DIY Kits',
  'Holiday Artisan Gift Guide',
  'Spring Botanical Crafts'
];

export default function BrandCreators() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Invite Modal State
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [campaign, setCampaign] = useState(CAMPAIGN_OPTIONS[0]);
  const [fee, setFee] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [deadline, setDeadline] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setShowFilterModal(false);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCreator || !fee || !deliverables || !deadline) {
      toast.error('Please fill in all details for the collaboration offer');
      return;
    }

    // Load current collabs from localStorage
    const savedCollabsStr = localStorage.getItem('craftezy_collabs');
    const currentCollabs = savedCollabsStr ? JSON.parse(savedCollabsStr) : [
      { id: 'col1', creator: 'Emma Hartwell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', specialty: 'Ceramics & Macramé', campaign: 'Summer Craft Collection', status: 'active', fee: '$450', deliverables: '3 posts + 2 stories', deadline: '2026-07-20' },
      { id: 'col2', creator: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', specialty: 'Jewelry', campaign: 'Summer Craft Collection', status: 'pending', fee: '$280', deliverables: '2 posts + reel', deadline: '2026-07-25' },
      { id: 'col3', creator: 'Marco Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', specialty: 'Pottery', campaign: 'Back to School DIY', status: 'invited', fee: '$320', deliverables: '2 posts', deadline: '2026-08-10' },
      { id: 'col4', creator: 'James Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', specialty: 'Woodworking', campaign: 'Spring Botanical', status: 'completed', fee: '$400', deliverables: '3 posts + tutorial', deadline: '2026-05-15' },
    ];

    const newCollab = {
      id: `col_${Date.now()}`,
      creator: selectedCreator.name,
      avatar: selectedCreator.avatar,
      specialty: selectedCreator.specialty,
      campaign,
      status: 'invited',
      fee: `$${fee}`,
      deliverables,
      deadline
    };

    localStorage.setItem('craftezy_collabs', JSON.stringify([newCollab, ...currentCollabs]));
    toast.success(`Collaboration invitation sent successfully to ${selectedCreator.name}!`);
    setSelectedCreator(null);
    setFee('');
    setDeliverables('');
    setDeadline('');
  };

  const filtered = CREATORS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.specialty.toLowerCase().includes(search.toLowerCase());
    const matchTags = selectedTags.length === 0 || selectedTags.every(t => c.tags.includes(t));
    return matchSearch && matchTags;
  });

  return (
    <BrandLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Discover Creators</h1><p className="text-muted-foreground text-sm mt-1">Find the perfect creators for your brand</p></div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search by name or specialty..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
        </div>
        <Button variant={selectedTags.length > 0 ? 'default' : 'outline'} className="rounded-xl gap-2 font-semibold" onClick={() => setShowFilterModal(true)}>
          <Filter className="w-4 h-4" /> Filter {selectedTags.length > 0 && `(${selectedTags.length})`}
        </Button>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-5 text-xs text-muted-foreground">
          <span>Active Filters:</span>
          {selectedTags.map(tag => (
            <Badge key={tag} className="bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold gap-1 px-2.5 rounded-full border-none">
              #{tag} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTag(tag)} />
            </Badge>
          ))}
          <button className="text-pink-600 hover:underline ml-1 font-semibold" onClick={() => setSelectedTags([])}>Clear All</button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map(creator => (
          <div key={creator.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-craft-lg transition-all hover:-translate-y-1 duration-300">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-14 h-14 shrink-0">
                <AvatarImage src={creator.avatar} />
                <AvatarFallback className="bg-pink-100 text-pink-800 font-bold text-lg">{creator.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">{creator.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-accent fill-current" />
                  <span className="text-xs font-semibold">{creator.rating}</span>
                  <span className="text-xs text-muted-foreground">· {creator.completedCollabs} collabs</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="bg-muted/40 rounded-xl p-2.5">
                <div className="font-bold text-sm">{creator.followers}</div>
                <div className="text-[10px] text-muted-foreground">Followers</div>
              </div>
              <div className="bg-muted/40 rounded-xl p-2.5">
                <div className="font-bold text-sm text-green-600">{creator.avgEngagement}</div>
                <div className="text-[10px] text-muted-foreground">Engagement</div>
              </div>
              <div className="bg-muted/40 rounded-xl p-2.5">
                <div className="font-bold text-sm">{creator.completedCollabs}</div>
                <div className="text-[10px] text-muted-foreground">Collabs</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {creator.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-[10px] rounded-full px-2 py-0.5 border-pink-200 text-pink-700">#{tag}</Badge>
              ))}
            </div>
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl h-9 text-sm gap-1 border-none font-semibold"
              onClick={() => setSelectedCreator(creator)}>
              <UserPlus className="w-4 h-4" /> Invite to Collaborate
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8 col-span-2">No creators match your search or filter tags</p>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground flex items-center gap-2">
              <Filter className="w-5 h-5 text-pink-600" /> Filter by Tags
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Refine creator search by lifestyle tags</p>

            <div className="flex flex-wrap gap-2 max-h-[40vh] overflow-y-auto p-1">
              {ALL_TAGS.map(tag => {
                const isSel = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full border transition-all font-medium',
                      isSel 
                        ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                        : 'border-border bg-white text-muted-foreground hover:text-foreground'
                    )}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-between gap-3 pt-3 border-t border-border">
              <button type="button" className="text-xs text-red-500 hover:underline font-semibold" onClick={handleClearFilters}>
                Clear All
              </button>
              <Button onClick={() => setShowFilterModal(false)} className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white border-none px-5">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleInviteSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-pink-600" /> Invite {selectedCreator.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Send a partnership proposal for your campaign</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="inv-camp">Select Campaign *</Label>
                <select id="inv-camp" value={campaign} onChange={e => setCampaign(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {CAMPAIGN_OPTIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="inv-fee">Offer Fee ($) *</Label>
                  <Input id="inv-fee" type="number" value={fee} onChange={e => setFee(e.target.value)} placeholder="350" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="inv-deadline">Submission Deadline *</Label>
                  <Input id="inv-deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="inv-dels">Required Deliverables *</Label>
                <textarea
                  id="inv-dels"
                  value={deliverables}
                  onChange={e => setDeliverables(e.target.value)}
                  className="w-full h-20 p-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g. 2 Instagram feed posts + 1 Reels video showcasing the DIY kit"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setSelectedCreator(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white border-none px-5">
                Send Invitation
              </Button>
            </div>
          </form>
        </div>
      )}
    </BrandLayout>
  );
}
