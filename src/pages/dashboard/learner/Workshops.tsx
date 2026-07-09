import LearnerLayout from '@/layouts/role/LearnerLayout';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import { Calendar, Clock, MapPin, Monitor, Users, Check, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  thumbnail: string;
  isOnline: boolean;
  location?: string;
  maxParticipants: number;
  enrolledCount: number;
}

export default function LearnerWorkshops() {
  const [enrolled, setEnrolled] = useState<string[]>(['w2']);
  
  // Checkout Modal State
  const [checkoutWorkshop, setCheckoutWorkshop] = useState<Workshop | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleEnrollClick = (workshop: Workshop) => {
    if (enrolled.includes(workshop.id)) {
      // Cancel booking
      setEnrolled(prev => prev.filter(x => x !== workshop.id));
      toast.success('Workshop booking cancelled successfully');
    } else {
      // Open mock card payment details modal
      setCheckoutWorkshop(workshop);
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      toast.error('Please enter all payment card details');
      return;
    }
    if (checkoutWorkshop) {
      setEnrolled(prev => [...prev, checkoutWorkshop.id]);
      toast.success(`Booking confirmed for "${checkoutWorkshop.title}"! Receipt sent to email.`);
      setCheckoutWorkshop(null);
    }
  };

  return (
    <LearnerLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Workshops</h1>
        <p className="text-muted-foreground text-sm mt-1">Live and in-person craft sessions</p>
      </div>

      {/* Enrolled Banner */}
      {enrolled.length > 0 && (
        <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-sm font-medium text-secondary">You have {enrolled.length} upcoming workshop(s). Check your email for joining details.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {MOCK_WORKSHOPS.map(workshop => {
          const isEnrolled = enrolled.includes(workshop.id);
          const spotsLeft = workshop.maxParticipants - workshop.enrolledCount;
          return (
            <div key={workshop.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-craft-lg transition-all hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <img src={workshop.thumbnail} alt={workshop.title} className="w-full h-full object-cover" />
                <Badge className={`absolute top-3 left-3 text-[10px] ${workshop.isOnline ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {workshop.isOnline ? '🟢 Online' : '📍 In-Person'}
                </Badge>
                {isEnrolled && <Badge className="absolute top-3 right-3 bg-secondary text-white text-[10px]">✓ Enrolled</Badge>}
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-2">{workshop.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{workshop.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(workshop.date).toLocaleDateString()}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{workshop.time} · {workshop.duration}</div>
                  <div className="flex items-center gap-1.5">{workshop.isOnline ? <Monitor className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}{workshop.isOnline ? 'Online' : workshop.location}</div>
                  <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{spotsLeft} spots left</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-lg">${workshop.price}</span>
                  <Button className={`rounded-xl h-9 text-sm ${isEnrolled ? 'bg-secondary hover:bg-secondary/90 text-white' : 'btn-primary'}`}
                    onClick={() => handleEnrollClick(workshop)}>
                    {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workshop Booking Payment Modal */}
      {checkoutWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handlePaymentSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Confirm Booking</h3>
            <p className="text-xs text-muted-foreground mb-4">Complete payment details to enroll in the live workshop</p>

            <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-4 text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Workshop:</span>
                <span className="font-semibold text-foreground truncate max-w-[200px]">{checkoutWorkshop.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total price:</span>
                <span className="font-bold text-primary">${checkoutWorkshop.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="card-nr">Card Number *</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="card-nr"
                    maxLength={19}
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                    className="h-11 pl-10 rounded-xl border-border bg-white"
                    placeholder="4000 1234 5678 9010"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="card-exp">Expiry Date *</Label>
                  <Input
                    id="card-exp"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').replace(/\/$/, ''))}
                    className="h-11 rounded-xl border-border bg-white"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="card-cvv">CVV *</Label>
                  <Input
                    id="card-cvv"
                    type="password"
                    maxLength={3}
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                    className="h-11 rounded-xl border-border bg-white"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setCheckoutWorkshop(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Pay & Enroll
              </Button>
            </div>
          </form>
        </div>
      )}
    </LearnerLayout>
  );
}
