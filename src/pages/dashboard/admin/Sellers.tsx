import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface PendingSeller {
  id: string;
  name: string;
  email: string;
  avatar: string;
  specialty: string;
  submittedAt: string;
  docs: string[];
  status: string;
}

const PENDING_SELLERS: PendingSeller[] = [
  { id: 's1', name: 'Emma Wilson', email: 'ewilson@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', specialty: 'Pottery & Ceramics', submittedAt: '2026-07-09', docs: ['ID Verified', 'Portfolio Submitted', 'Store Setup'], status: 'pending' },
  { id: 's2', name: 'Carlos Mendez', email: 'carlos@artisan.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', specialty: 'Woodworking', submittedAt: '2026-07-08', docs: ['ID Verified', 'Store Setup'], status: 'pending' },
  { id: 's3', name: 'Yuki Tanaka', email: 'yuki@crafts.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', specialty: 'Jewelry Design', submittedAt: '2026-07-07', docs: ['ID Verified', 'Portfolio Submitted', 'Store Setup', 'Tax Form'], status: 'approved' },
  { id: 's4', name: 'Ahmed Hassan', email: 'ahmed@maker.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', specialty: 'Leather Craft', submittedAt: '2026-07-06', docs: ['ID Verified'], status: 'rejected' },
];

export default function AdminSellers() {
  const [sellers, setSellers] = useState<PendingSeller[]>(PENDING_SELLERS);
  
  // Review Modal State
  const [selectedSeller, setSelectedSeller] = useState<PendingSeller | null>(null);

  const updateStatus = (id: string, status: string) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast.success(`Seller application ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
    if (selectedSeller?.id === id) {
      setSelectedSeller(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">Seller Verification</h1><p className="text-muted-foreground text-sm mt-1">Review and approve new sellers</p></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending Review', value: sellers.filter(s => s.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Approved', value: sellers.filter(s => s.status === 'approved').length, color: 'text-green-600' },
          { label: 'Rejected', value: sellers.filter(s => s.status === 'rejected').length, color: 'text-red-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className={`font-display font-bold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {sellers.map(seller => (
          <div key={seller.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-craft duration-300">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 shrink-0"><AvatarImage src={seller.avatar} /><AvatarFallback>{seller.name[0]}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{seller.name}</h3>
                    <p className="text-xs text-muted-foreground">{seller.email} · {seller.specialty}</p>
                  </div>
                  <Badge className={`text-[10px] capitalize ${
                    seller.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : seller.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {seller.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {seller.docs.map(doc => (
                    <span key={doc} className="text-[10px] bg-muted px-2 py-0.5 rounded-full flex items-center gap-1 text-muted-foreground font-medium">
                      <CheckCircle className="w-3 h-3 text-green-600" /> {doc}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Submitted: {new Date(seller.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>
            {seller.status === 'pending' && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl h-9 text-sm gap-1 font-semibold" onClick={() => updateStatus(seller.id, 'approved')}>
                  <CheckCircle className="w-4 h-4" /> Approve
                </Button>
                <Button variant="outline" className="rounded-xl h-9 text-sm gap-1 text-red-500 hover:bg-red-50 font-semibold" onClick={() => updateStatus(seller.id, 'rejected')}>
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
                <Button variant="ghost" className="rounded-xl h-9 text-sm gap-1 text-muted-foreground hover:text-foreground font-semibold" onClick={() => setSelectedSeller(seller)}>
                  <Eye className="w-4 h-4" /> Full Review
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Seller Application Verification Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-4 text-foreground">Seller Credential Audit</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10"><AvatarImage src={selectedSeller.avatar} /><AvatarFallback>{selectedSeller.name[0]}</AvatarFallback></Avatar>
                <div>
                  <h4 className="font-semibold text-sm">{selectedSeller.name}</h4>
                  <p className="text-xs text-muted-foreground">{selectedSeller.email}</p>
                </div>
              </div>

              <div className="border-t border-border pt-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specialty</span>
                  <span className="font-medium text-foreground">{selectedSeller.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Application Date</span>
                  <span className="text-foreground">{new Date(selectedSeller.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-xs font-semibold text-foreground mb-2 font-display">Submitted Documents Checklist</p>
                <div className="space-y-2 bg-muted/30 p-4 rounded-xl border border-border">
                  {['Government issued ID', 'Artistic Portfolio Website', 'Store Setup Configuration', 'Tax Exemption form W-9'].map(doc => {
                    const isIncluded = selectedSeller.docs.some(d => doc.toLowerCase().includes(d.split(' ')[0].toLowerCase()));
                    return (
                      <div key={doc} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{doc}</span>
                        <Badge className={isIncluded ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {isIncluded ? 'Verified' : 'Missing'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setSelectedSeller(null)} className="rounded-xl">
                Close
              </Button>
              <Button className="rounded-xl bg-red-600 text-white hover:bg-red-700 border-none px-4" onClick={() => updateStatus(selectedSeller.id, 'rejected')}>
                Reject Seller
              </Button>
              <Button className="rounded-xl bg-secondary text-white hover:bg-secondary/90 border-none px-4" onClick={() => updateStatus(selectedSeller.id, 'approved')}>
                Verify & Approve
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
