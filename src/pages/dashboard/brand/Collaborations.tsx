import { Handshake, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';

interface Collab {
  id: string;
  creator: string;
  avatar: string;
  specialty: string;
  campaign: string;
  status: 'active' | 'pending' | 'invited' | 'completed';
  fee: string;
  deliverables: string;
  deadline: string;
}

const INITIAL_COLLABS: Collab[] = [
  { id: 'col1', creator: 'Emma Hartwell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', specialty: 'Ceramics & Macramé', campaign: 'Summer Craft Collection', status: 'active', fee: '$450', deliverables: '3 posts + 2 stories', deadline: '2026-07-20' },
  { id: 'col2', creator: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', specialty: 'Jewelry', campaign: 'Summer Craft Collection', status: 'pending', fee: '$280', deliverables: '2 posts + reel', deadline: '2026-07-25' },
  { id: 'col3', creator: 'Marco Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', specialty: 'Pottery', campaign: 'Back to School DIY', status: 'invited', fee: '$320', deliverables: '2 posts', deadline: '2026-08-10' },
  { id: 'col4', creator: 'James Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', specialty: 'Woodworking', campaign: 'Spring Botanical', status: 'completed', fee: '$400', deliverables: '3 posts + tutorial', deadline: '2026-05-15' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  invited: { label: 'Invited', color: 'bg-blue-100 text-blue-800', icon: Clock },
  completed: { label: 'Completed', color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
};

export default function BrandCollaborations() {
  const [collabs, setCollabs] = useState<Collab[]>(() => {
    const saved = localStorage.getItem('craftezy_collabs');
    return saved ? JSON.parse(saved) : INITIAL_COLLABS;
  });
  
  // Message Modal State
  const [messageCollab, setMessageCollab] = useState<Collab | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleConfirmDeal = (id: string, creatorName: string) => {
    setCollabs(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, status: 'active' as const } : c);
      localStorage.setItem('craftezy_collabs', JSON.stringify(updated));
      return updated;
    });
    toast.success(`Collaboration agreement confirmed with ${creatorName}!`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) {
      toast.error('Please enter a message note');
      return;
    }
    toast.success(`Message sent to ${messageCollab?.creator}: "${messageText}"`);
    setMessageCollab(null);
    setMessageText('');
  };

  return (
    <BrandLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Collaborations</h1><p className="text-muted-foreground text-sm mt-1">Manage creator partnerships</p></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active', value: collabs.filter(c => c.status === 'active').length, color: 'text-green-600' },
          { label: 'Pending', value: collabs.filter(c => c.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Completed', value: collabs.filter(c => c.status === 'completed').length, color: 'text-purple-600' },
          { label: 'Total Spend', value: `$${collabs.reduce((a,c) => a + parseFloat(c.fee.replace('$', '') || '0'), 0).toLocaleString()}`, color: 'text-pink-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className={`font-display font-bold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {collabs.map(collab => {
          const status = STATUS_CONFIG[collab.status];
          return (
            <div key={collab.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft duration-300">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 shrink-0">
                  <AvatarFallback className="bg-pink-100 text-pink-800 font-semibold">{collab.creator[0]}</AvatarFallback>
                  <img src={collab.avatar} className="w-full h-full object-cover rounded-full" />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-semibold">{collab.creator}</h3>
                      <p className="text-xs text-muted-foreground">{collab.specialty}</p>
                    </div>
                    <Badge className={`text-[10px] shrink-0 capitalize ${status.color}`}>{status.label}</Badge>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3 text-xs">
                    <div><p className="text-muted-foreground">Campaign</p><p className="font-medium">{collab.campaign}</p></div>
                    <div><p className="text-muted-foreground">Fee</p><p className="font-semibold text-primary">{collab.fee}</p></div>
                    <div><p className="text-muted-foreground">Deliverables</p><p className="font-medium">{collab.deliverables}</p></div>
                    <div><p className="text-muted-foreground">Deadline</p><p className="font-medium">{new Date(collab.deadline).toLocaleDateString()}</p></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="rounded-xl h-8 text-xs gap-1 font-semibold text-muted-foreground hover:text-foreground" onClick={() => setMessageCollab(collab)}>
                  <MessageSquare className="w-3 h-3" /> Message
                </Button>
                {collab.status === 'invited' && (
                  <Button size="sm" className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl h-8 text-xs font-semibold border-none" onClick={() => handleConfirmDeal(collab.id, collab.creator)}>
                    Confirm Deal
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Collab Modal */}
      {messageCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleSendMessage} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Message Partner</h3>
            <p className="text-xs text-muted-foreground mb-4">Send a collaboration note directly to {messageCollab.creator}</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="collab-msg">Write Message *</Label>
                <textarea
                  id="collab-msg"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  className="w-full h-28 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Inquire about milestones, post dates, drafts, or details..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setMessageCollab(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white border-none px-5">
                Send Note
              </Button>
            </div>
          </form>
        </div>
      )}
    </BrandLayout>
  );
}
