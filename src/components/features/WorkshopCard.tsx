import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Wifi, WifiOff } from 'lucide-react';
import { Workshop } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  workshop: Workshop;
}

export default function WorkshopCard({ workshop }: Props) {
  const spotsLeft = workshop.maxParticipants - workshop.enrolledCount;
  const isAlmostFull = spotsLeft <= 3;

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-craft-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-video">
        <img src={workshop.thumbnail} alt={workshop.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={cn('text-[10px] rounded-md', workshop.isOnline ? 'bg-secondary text-white' : 'bg-primary text-white')}>
            {workshop.isOnline ? (
              <><Wifi className="w-3 h-3 mr-1" />Online</>
            ) : (
              <><WifiOff className="w-3 h-3 mr-1" />In-Person</>
            )}
          </Badge>
          {isAlmostFull && (
            <Badge className="bg-accent text-accent-foreground text-[10px] rounded-md">
              {spotsLeft} spots left
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-primary mb-1.5">{workshop.category}</p>
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{workshop.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">with {workshop.instructor.name}</p>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <Clock className="w-3.5 h-3.5 text-primary shrink-0 ml-1" />
            <span>{workshop.time}</span>
          </div>
          {workshop.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{workshop.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{workshop.enrolledCount}/{workshop.maxParticipants} enrolled</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${workshop.price}</span>
          <Link to={`/workshops/${workshop.id}`}>
            <Button size="sm" className="rounded-xl btn-primary h-8 text-xs px-4">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
