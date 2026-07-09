import { useState } from 'react';
import { Flag, CheckCircle, XCircle, Eye, Search } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ContentFlag {
  id: string;
  type: string;
  title: string;
  reporter: string;
  reason: string;
  flags: number;
  date: string;
  status: string;
}

const CONTENT_FLAGS: ContentFlag[] = [
  { id: 'cf1', type: 'product', title: 'Handmade Silver Ring', reporter: 'alice@example.com', reason: 'Suspected fake reviews', flags: 5, date: '2026-07-09', status: 'pending' },
  { id: 'cf2', type: 'community', title: 'Post: "Best suppliers for cheap materials"', reporter: 'bob@example.com', reason: 'Spam / promotional content', flags: 3, date: '2026-07-08', status: 'pending' },
  { id: 'cf3', type: 'workshop', title: 'Advanced Ceramics Masterclass', reporter: 'carol@example.com', reason: 'Misleading price', flags: 2, date: '2026-07-07', status: 'reviewed' },
  { id: 'cf4', type: 'profile', title: 'Seller: FakeArtisans123', reporter: 'admin@craftezy.com', reason: 'Fake seller account', flags: 8, date: '2026-07-06', status: 'removed' },
];

const TYPE_COLORS: Record<string, string> = { 
  product: 'bg-primary/10 text-primary', 
  community: 'bg-blue-100 text-blue-800', 
  workshop: 'bg-green-100 text-green-800', 
  profile: 'bg-red-100 text-red-800' 
};

export default function AdminContent() {
  const [flags, setFlags] = useState<ContentFlag[]>(CONTENT_FLAGS);
  const [search, setSearch] = useState('');
  
  // Details Modal State
  const [selectedFlag, setSelectedFlag] = useState<ContentFlag | null>(null);

  const filtered = flags.filter(f => !search || f.title.toLowerCase().includes(search.toLowerCase()) || f.reason.toLowerCase().includes(search.toLowerCase()));

  const update = (id: string, status: string) => { 
    setFlags(p => p.map(f => f.id === id ? { ...f, status } : f)); 
    toast.success(`Content status updated to "${status}"`);
    if (selectedFlag?.id === id) {
      setSelectedFlag(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Content Moderation</h1><p className="text-muted-foreground text-sm mt-1">Review flagged content and reports</p></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending Review', value: flags.filter(f => f.status === 'pending').length, color: 'text-red-600' },
          { label: 'Reviewed', value: flags.filter(f => f.status === 'reviewed').length, color: 'text-yellow-600' },
          { label: 'Resolved', value: flags.filter(f => f.status === 'removed').length, color: 'text-green-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className={`font-display font-bold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search flagged content or reasons..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="space-y-4">
        {filtered.map(flag => (
          <div key={flag.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0"><Flag className="w-5 h-5 text-red-600" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-[10px] capitalize ${TYPE_COLORS[flag.type]}`}>{flag.type}</Badge>
                      <span className="text-xs text-red-500 font-semibold">{flag.flags} reports</span>
                    </div>
                    <h3 className="font-semibold text-sm">{flag.title}</h3>
                    <p className="text-xs text-muted-foreground">Reason: {flag.reason}</p>
                  </div>
                  <Badge className={`text-[10px] capitalize ${
                    flag.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : flag.status === 'reviewed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {flag.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Reported by: {flag.reporter} · {new Date(flag.date).toLocaleDateString()}</p>
              </div>
            </div>
            {flag.status === 'pending' && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl h-8 text-xs gap-1 font-semibold" onClick={() => update(flag.id, 'reviewed')}>
                  <CheckCircle className="w-3.5 h-3.5" /> Approve Content
                </Button>
                <Button variant="outline" className="rounded-xl h-8 text-xs gap-1 text-red-500 hover:bg-red-50 font-semibold" onClick={() => update(flag.id, 'removed')}>
                  <XCircle className="w-3.5 h-3.5" /> Remove Content
                </Button>
                <Button variant="ghost" className="rounded-xl h-8 text-xs gap-1 font-semibold text-muted-foreground hover:text-foreground" onClick={() => setSelectedFlag(flag)}>
                  <Eye className="w-3.5 h-3.5" /> Review
                </Button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">No reported flags found</p>
        )}
      </div>

      {/* Flag Moderation Details Modal */}
      {selectedFlag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-600" /> Moderation Case File
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target Title</span>
                  <span className="font-semibold text-foreground">{selectedFlag.title}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Item Type</span>
                  <span className="font-semibold capitalize text-foreground">{selectedFlag.type}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Reporter Email</span>
                  <span className="text-foreground">{selectedFlag.reporter}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>File Date</span>
                  <span className="text-foreground">{new Date(selectedFlag.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current Flags Count</span>
                  <span className="font-semibold text-red-600">{selectedFlag.flags} reports</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-foreground mb-1.5 font-display">Reported Infraction</p>
                <div className="bg-red-50/50 p-3 rounded-xl border border-red-100 text-xs leading-relaxed text-red-900">
                  {selectedFlag.reason}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button variant="ghost" onClick={() => setSelectedFlag(null)} className="rounded-xl">
                Close
              </Button>
              <Button className="rounded-xl bg-red-600 text-white hover:bg-red-700 border-none px-4" onClick={() => update(selectedFlag.id, 'removed')}>
                Dismiss & Delete Item
              </Button>
              <Button className="rounded-xl bg-secondary text-white hover:bg-secondary/90 border-none px-4" onClick={() => update(selectedFlag.id, 'reviewed')}>
                Approve Listing
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
