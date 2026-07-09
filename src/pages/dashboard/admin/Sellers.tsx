import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const PENDING_SELLERS = [
  { id: 's1', name: 'Emma Wilson', email: 'ewilson@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', specialty: 'Pottery & Ceramics', submittedAt: '2026-07-09', docs: ['ID Verified', 'Portfolio Submitted', 'Store Setup'], status: 'pending' },
  { id: 's2', name: 'Carlos Mendez', email: 'carlos@artisan.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', specialty: 'Woodworking', submittedAt: '2026-07-08', docs: ['ID Verified', 'Store Setup'], status: 'pending' },
  { id: 's3', name: 'Yuki Tanaka', email: 'yuki@crafts.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', specialty: 'Jewelry Design', submittedAt: '2026-07-07', docs: ['ID Verified', 'Portfolio Submitted', 'Store Setup', 'Tax Form'], status: 'approved' },
  { id: 's4', name: 'Ahmed Hassan', email: 'ahmed@maker.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', specialty: 'Leather Craft', submittedAt: '2026-07-06', docs: ['ID Verified'], status: 'rejected' },
];

export default function AdminSellers() {
  const [sellers, setSellers] = useState(PENDING_SELLERS);

  const updateStatus = (id: string, status: string) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast.success(`Seller ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
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
          <div key={seller.id} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 shrink-0"><AvatarImage src={seller.avatar} /><AvatarFallback>{seller.name[0]}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-semibold">{seller.name}</h3>
                    <p className="text-xs text-muted-foreground">{seller.email} · {seller.specialty}</p>
                  </div>
                  <Badge className={seller.status === 'pending' ? 'bg-yellow-100 text-yellow-800 text-[10px]' : seller.status === 'approved' ? 'bg-green-100 text-green-800 text-[10px]' : 'bg-red-100 text-red-800 text-[10px]'}>
                    {seller.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {seller.docs.map(doc => (
                    <span key={doc} className="text-[10px] bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" /> {doc}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Submitted: {new Date(seller.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>
            {seller.status === 'pending' && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-xl h-9 text-sm gap-1" onClick={() => updateStatus(seller.id, 'approved')}>
                  <CheckCircle className="w-4 h-4" /> Approve
                </Button>
                <Button variant="outline" className="rounded-xl h-9 text-sm gap-1 text-red-500 hover:bg-red-50" onClick={() => updateStatus(seller.id, 'rejected')}>
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
                <Button variant="ghost" className="rounded-xl h-9 text-sm gap-1" onClick={() => toast.info('Review details coming soon')}>
                  <Eye className="w-4 h-4" /> Full Review
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
