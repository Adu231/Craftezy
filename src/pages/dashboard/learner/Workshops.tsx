import LearnerLayout from '@/layouts/role/LearnerLayout';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import { Calendar, Clock, MapPin, Monitor, Users, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export default function LearnerWorkshops() {
  const [enrolled, setEnrolled] = useState<string[]>(['w2']);

  const handleEnroll = (id: string) => {
    setEnrolled(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast.success(enrolled.includes(id) ? 'Workshop cancelled' : 'Enrolled successfully!');
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
                    onClick={() => handleEnroll(workshop.id)}>
                    {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LearnerLayout>
  );
}
