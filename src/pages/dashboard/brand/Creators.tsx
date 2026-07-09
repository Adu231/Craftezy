import { useState } from 'react';
import { Search, Star, Users, Filter, UserPlus } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CREATORS = [
  { id: 'cr1', name: 'Emma Hartwell', specialty: 'Ceramics & Macramé', followers: '12.4K', avgEngagement: '8.2%', rating: 4.9, completedCollabs: 8, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', tags: ['sustainable', 'boho', 'home-decor'] },
  { id: 'cr2', name: 'James Rivera', specialty: 'Woodworking', followers: '9.8K', avgEngagement: '6.5%', rating: 4.8, completedCollabs: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', tags: ['rustic', 'furniture', 'upcycled'] },
  { id: 'cr3', name: 'Priya Nair', specialty: 'Jewelry Design', followers: '21.2K', avgEngagement: '11.4%', rating: 4.7, completedCollabs: 6, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', tags: ['luxury', 'gemstone', 'fashion'] },
  { id: 'cr4', name: 'Marco Chen', specialty: 'Pottery & Ceramics', followers: '7.6K', avgEngagement: '9.1%', rating: 4.9, completedCollabs: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', tags: ['minimalist', 'functional', 'artisan'] },
];

export default function BrandCreators() {
  const [search, setSearch] = useState('');
  const filtered = CREATORS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.specialty.toLowerCase().includes(search.toLowerCase()));

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
        <Button variant="outline" className="rounded-xl gap-2" onClick={() => toast.info('Filters coming soon')}><Filter className="w-4 h-4" /> Filter</Button>
      </div>

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
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl h-9 text-sm gap-1"
              onClick={() => toast.success(`Collaboration invite sent to ${creator.name}!`)}>
              <UserPlus className="w-4 h-4" /> Invite to Collaborate
            </Button>
          </div>
        ))}
      </div>
    </BrandLayout>
  );
}
