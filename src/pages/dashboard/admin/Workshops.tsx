import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Calendar, Monitor, MapPin } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PendingWorkshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  isOnline: boolean;
  price: number;
  status: string;
}

const INITIAL_PENDING: PendingWorkshop[] = [
  { id: 'pw1', title: 'Advanced Macramé Sculpture', instructor: 'Emma Hartwell', date: '2026-07-28', isOnline: true, price: 65, status: 'pending' },
  { id: 'pw2', title: 'Raku Firing Techniques', instructor: 'Marco Chen', date: '2026-08-05', isOnline: false, price: 145, status: 'pending' },
  { id: 'pw3', title: 'Natural Dyeing for Beginners', instructor: 'Priya Nair', date: '2026-08-12', isOnline: true, price: 55, status: 'pending' },
];

export default function AdminWorkshops() {
  const [pending, setPending] = useState<PendingWorkshop[]>(INITIAL_PENDING);
  
  // Details Modal State
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof MOCK_WORKSHOPS[0] | null>(null);

  const updateStatus = (id: string, status: string) => {
    setPending(p => p.filter(w => w.id !== id));
    toast.success(`Workshop proposal has been successfully ${status === 'approved' ? 'approved & published' : 'rejected'}`);
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
              <div key={w.id} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-sm">{w.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>by {w.instructor}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(w.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">{w.isOnline ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}{w.isOnline ? 'Online' : 'In-Person'}</span>
                      <span className="font-semibold text-primary">${w.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl h-8 text-xs gap-1 font-semibold" onClick={() => updateStatus(w.id, 'approved')}>
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </Button>
                    <Button variant="outline" className="rounded-xl h-8 text-xs gap-1 text-red-500 hover:bg-red-50 font-semibold" onClick={() => updateStatus(w.id, 'rejected')}>
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
          <div key={w.id} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4 hover:shadow-craft duration-300">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0"><img src={w.thumbnail} alt="" className="w-full h-full object-cover" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{w.title}</p>
              <p className="text-xs text-muted-foreground">by {w.instructor.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-100 text-green-800 text-[10px] border-none">Active</Badge>
                <span className="text-xs text-muted-foreground">{w.enrolledCount}/{w.maxParticipants} enrolled</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg shrink-0" onClick={() => setSelectedWorkshop(w)}>
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Workshop Inspection Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground">Workshop Details</h3>
            
            <div className="space-y-4 text-sm">
              <div className="w-full h-40 rounded-2xl overflow-hidden border border-border">
                <img src={selectedWorkshop.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="font-semibold text-base text-foreground leading-snug">{selectedWorkshop.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">Instructor: {selectedWorkshop.instructor.name} ({selectedWorkshop.instructor.specialty})</p>
                <p className="text-xs text-primary font-semibold mt-1">${selectedWorkshop.price} per participant</p>
              </div>

              <div className="border-t border-border pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium text-foreground capitalize">{selectedWorkshop.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground">{new Date(selectedWorkshop.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Mode</span>
                  <span className="font-medium text-foreground">{selectedWorkshop.isOnline ? 'Online via Zoom' : 'Offline Studio'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attendance</span>
                  <span className="font-medium text-foreground">{selectedWorkshop.enrolledCount} / {selectedWorkshop.maxParticipants} students</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedWorkshop(null)} className="rounded-xl px-5">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
