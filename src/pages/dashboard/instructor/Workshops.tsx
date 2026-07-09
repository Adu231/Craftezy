import { Plus, Calendar, Users, Monitor, MapPin, Clock, Edit2 } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function InstructorWorkshops() {
  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Workshops</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your live and in-person sessions</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Workshop builder coming soon')}>
          <Plus className="w-4 h-4" /> Create Workshop
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Sessions', value: MOCK_WORKSHOPS.length },
          { label: 'Total Enrolled', value: MOCK_WORKSHOPS.reduce((a,w) => a + w.enrolledCount, 0) },
          { label: 'Online Sessions', value: MOCK_WORKSHOPS.filter(w => w.isOnline).length },
          { label: 'Revenue', value: '$2,840' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-secondary">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {MOCK_WORKSHOPS.map(workshop => {
          const spotsLeft = workshop.maxParticipants - workshop.enrolledCount;
          const fillPercent = (workshop.enrolledCount / workshop.maxParticipants) * 100;
          return (
            <div key={workshop.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft transition-all">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={workshop.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold">{workshop.title}</h3>
                    <Badge className={`text-[10px] shrink-0 ${workshop.isOnline ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {workshop.isOnline ? 'Online' : 'In-Person'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(workshop.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{workshop.time}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{workshop.enrolledCount}/{workshop.maxParticipants}</span>
                    <span className="flex items-center gap-1">{workshop.isOnline ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}{workshop.isOnline ? 'Zoom' : workshop.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${fillPercent}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{spotsLeft} spots left</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-primary text-lg">${workshop.price}</div>
                  <Button variant="outline" className="mt-2 h-8 text-xs rounded-xl gap-1" onClick={() => toast.info('Edit workshop coming soon')}>
                    <Edit2 className="w-3 h-3" /> Edit
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </InstructorLayout>
  );
}
