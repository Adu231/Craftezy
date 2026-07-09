import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Plus, Calendar, Monitor, MapPin } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PENDING_WORKSHOPS = [
  { id: 'pw1', title: 'Advanced Macramé Sculpture', instructor: 'Emma Hartwell', date: '2026-07-28', isOnline: true, price: 65, status: 'pending' },
  { id: 'pw2', title: 'Raku Firing Techniques', instructor: 'Marco Chen', date: '2026-08-05', isOnline: false, price: 145, status: 'pending' },
  { id: 'pw3', title: 'Natural Dyeing for Beginners', instructor: 'Priya Nair', date: '2026-08-12', isOnline: true, price: 55, status: 'pending' },
];

export default function AdminWorkshops() {
  const [pending, setPending] = useState(PENDING_WORKSHOPS);

  const updateStatus = (id: string, status: string) => {
    setPending(p => p.filter(w => w.id !== id));
    toast.success(`Workshop ${status === 'approved' ? 'approved' : 'rejected'}`);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Workshops</h1><p className="text-muted-foreground text-sm mt-1">Approve and manage workshop listings</p></div>
      </div>

      {/* Pending Approvals */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" /> Pending Approval ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map(w => (
              <div key={w.id} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{w.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>by {w.instructor}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(w.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">{w.isOnline ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}{w.isOnline ? 'Online' : 'In-Person'}</span>
                      <span>${w.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl h-8 text-xs gap-1" onClick={() => updateStatus(w.id, 'approved')}>
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </Button>
                    <Button variant="outline" className="rounded-xl h-8 text-xs gap-1 text-red-500" onClick={() => updateStatus(w.id, 'rejected')}>
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Workshops */}
      <h2 className="font-semibold mb-4">All Approved Workshops</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_WORKSHOPS.map(w => (
          <div key={w.id} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0"><img src={w.thumbnail} alt="" className="w-full h-full object-cover" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{w.title}</p>
              <p className="text-xs text-muted-foreground">by {w.instructor.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-100 text-green-800 text-[10px]">Active</Badge>
                <span className="text-xs text-muted-foreground">{w.enrolledCount}/{w.maxParticipants} enrolled</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => toast.info('Workshop detail coming soon')}>
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
