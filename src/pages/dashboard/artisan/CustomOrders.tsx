import { MessageSquare, Clock, CheckCircle, XCircle, Plus, Eye } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CUSTOM_ORDERS = [
  { id: 'co_001', customer: 'Carol Davis', request: 'Custom macramé wall hanging 30" wide in sage green and ivory', budget: '$120', deadline: '2026-07-25', status: 'pending', date: '2026-07-10' },
  { id: 'co_002', customer: 'Eve Martinez', request: 'Abstract canvas painting in blues and greens for a 24"x36" office wall', budget: '$280', deadline: '2026-07-30', status: 'quoted', date: '2026-07-08' },
  { id: 'co_003', customer: 'Frank Wilson', request: 'Set of 6 handmade ceramic mugs with custom glaze pattern', budget: '$180', deadline: '2026-08-05', status: 'in_progress', date: '2026-07-05' },
  { id: 'co_004', customer: 'Grace Lee', request: 'Personalized pottery bowl with name engraving', budget: '$65', deadline: '2026-07-20', status: 'completed', date: '2026-06-28' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Quote Sent', color: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'In Progress', color: 'bg-indigo-100 text-indigo-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  declined: { label: 'Declined', color: 'bg-red-100 text-red-800' },
};

export default function ArtisanCustomOrders() {
  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Custom Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage personalized requests from customers</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending Review', value: '1', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'In Progress', value: '1', icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
          { label: 'Completed', value: '1', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Avg Value', value: '$161', icon: MessageSquare, color: 'text-primary bg-primary/10' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Custom Orders List */}
      <div className="space-y-4">
        {CUSTOM_ORDERS.map(order => {
          const status = STATUS_CONFIG[order.status];
          return (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{order.customer}</h3>
                    <Badge className={`text-[10px] ${status.color}`}>{status.label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{order.request}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-4">
                <div><span className="text-muted-foreground">Budget: </span><span className="font-semibold text-primary">{order.budget}</span></div>
                <div><span className="text-muted-foreground">Deadline: </span><span className="font-medium">{new Date(order.deadline).toLocaleDateString()}</span></div>
                <div><span className="text-muted-foreground">Requested: </span><span className="font-medium">{new Date(order.date).toLocaleDateString()}</span></div>
              </div>
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <>
                    <Button className="btn-primary rounded-xl h-9 text-sm" onClick={() => toast.success('Quote form opening soon')}>Send Quote</Button>
                    <Button variant="outline" className="rounded-xl h-9 text-sm text-red-500 hover:bg-red-50" onClick={() => toast.info('Order declined')}>Decline</Button>
                  </>
                )}
                {order.status === 'quoted' && (
                  <Button variant="outline" className="rounded-xl h-9 text-sm" onClick={() => toast.info('Awaiting customer approval')}>Awaiting Approval</Button>
                )}
                {order.status === 'in_progress' && (
                  <Button className="btn-primary rounded-xl h-9 text-sm" onClick={() => toast.success('Milestone updated')}>Update Milestone</Button>
                )}
                <Button variant="ghost" className="rounded-xl h-9 text-sm gap-1" onClick={() => toast.info('Messaging coming soon')}>
                  <MessageSquare className="w-4 h-4" /> Message
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </ArtisanLayout>
  );
}
