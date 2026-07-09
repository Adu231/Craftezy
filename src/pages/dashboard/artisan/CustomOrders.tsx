import { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, XCircle, Plus, Eye } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const INITIAL_CUSTOM_ORDERS = [
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

interface CustomOrder {
  id: string;
  customer: string;
  request: string;
  budget: string;
  deadline: string;
  status: string;
  date: string;
}

export default function ArtisanCustomOrders() {
  const [orders, setOrders] = useState<CustomOrder[]>(INITIAL_CUSTOM_ORDERS);
  
  // Modals state
  const [quoteOrder, setQuoteOrder] = useState<CustomOrder | null>(null);
  const [quotePrice, setQuotePrice] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');

  const [messageOrder, setMessageOrder] = useState<CustomOrder | null>(null);
  const [chatMessage, setChatMessage] = useState('');

  const handleDecline = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'declined' } : o));
    toast.success('Custom request declined successfully');
  };

  const handleOpenQuote = (order: CustomOrder) => {
    setQuoteOrder(order);
    setQuotePrice(order.budget.replace('$', ''));
    setQuoteMessage('');
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quotePrice.trim()) {
      toast.error('Please enter a quote price');
      return;
    }
    setOrders(prev => prev.map(o => o.id === quoteOrder?.id ? {
      ...o,
      budget: `$${quotePrice}`,
      status: 'quoted'
    } : o));
    toast.success(`Quote of $${quotePrice} sent to ${quoteOrder?.customer}!`);
    setQuoteOrder(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success(`Message sent to ${messageOrder?.customer}: "${chatMessage}"`);
    setMessageOrder(null);
    setChatMessage('');
  };

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
          { label: 'Pending Review', value: orders.filter(o => o.status === 'pending').length.toString(), icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'In Progress', value: orders.filter(o => o.status === 'in_progress').length.toString(), icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
          { label: 'Completed', value: orders.filter(o => o.status === 'completed').length.toString(), icon: CheckCircle, color: 'text-green-600 bg-green-50' },
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
        {orders.map(order => {
          const status = STATUS_CONFIG[order.status];
          return (
            <div key={order.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-craft transition-all duration-300">
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
                    <Button className="btn-primary rounded-xl h-9 text-sm" onClick={() => handleOpenQuote(order)}>Send Quote</Button>
                    <Button variant="outline" className="rounded-xl h-9 text-sm text-red-500 hover:bg-red-50" onClick={() => handleDecline(order.id)}>Decline</Button>
                  </>
                )}
                {order.status === 'quoted' && (
                  <Button variant="outline" className="rounded-xl h-9 text-sm cursor-default hover:bg-white" onClick={() => {}}>Awaiting Approval</Button>
                )}
                {order.status === 'in_progress' && (
                  <Button className="btn-primary rounded-xl h-9 text-sm" onClick={() => {
                    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'completed' } : o));
                    toast.success('Order status updated to Completed!');
                  }}>Mark Completed</Button>
                )}
                <Button variant="ghost" className="rounded-xl h-9 text-sm gap-1 text-muted-foreground hover:text-foreground" onClick={() => setMessageOrder(order)}>
                  <MessageSquare className="w-4 h-4" /> Message
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Send Quote Modal */}
      {quoteOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleSendQuote} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Send Quote</h3>
            <p className="text-xs text-muted-foreground mb-4">Propose a cost quote for "{quoteOrder.customer}"'s request</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="quote-price">Quote Amount ($) *</Label>
                <Input
                  id="quote-price"
                  type="number"
                  value={quotePrice}
                  onChange={e => setQuotePrice(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="quote-msg">Message Note</Label>
                <textarea
                  id="quote-msg"
                  value={quoteMessage}
                  onChange={e => setQuoteMessage(e.target.value)}
                  className="w-full h-24 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell the client about milestones, timing, or materials included..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setQuoteOrder(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Send Quote
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Send Message Modal */}
      {messageOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleSendMessage} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Send Message</h3>
            <p className="text-xs text-muted-foreground mb-4">Start a discussion thread with "{messageOrder.customer}"</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="chat-msg">Write Message *</Label>
                <textarea
                  id="chat-msg"
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  className="w-full h-28 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Ask for clarifications, describe specs, or say hello..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setMessageOrder(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      )}
    </ArtisanLayout>
  );
}
