import { Plus, Calendar, Users, Monitor, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

interface InstructorWorkshop {
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

export default function InstructorWorkshops() {
  const [workshops, setWorkshops] = useState<InstructorWorkshop[]>(
    MOCK_WORKSHOPS as InstructorWorkshop[]
  );

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<InstructorWorkshop | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');

  const handleOpenAdd = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setDuration('');
    setPrice('');
    setIsOnline(true);
    setLocation('');
    setMaxParticipants('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (ws: InstructorWorkshop) => {
    setSelectedWorkshop(ws);
    setTitle(ws.title);
    setDescription(ws.description);
    setDate(ws.date);
    setTime(ws.time);
    setDuration(ws.duration);
    setPrice(ws.price.toString());
    setIsOnline(ws.isOnline);
    setLocation(ws.location || '');
    setMaxParticipants(ws.maxParticipants.toString());
    setShowEditModal(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time || !price || !maxParticipants) {
      toast.error('Please enter all required fields');
      return;
    }
    const newWs: InstructorWorkshop = {
      id: `ws_${Date.now()}`,
      title,
      description: description || 'No description provided.',
      date,
      time,
      duration: duration || '2h',
      price: parseFloat(price),
      isOnline,
      location: isOnline ? 'Zoom Meeting' : (location || 'Design Studio'),
      maxParticipants: parseInt(maxParticipants),
      enrolledCount: 0,
      thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=250&fit=crop'
    };
    setWorkshops(prev => [newWs, ...prev]);
    toast.success('Live workshop scheduled successfully!');
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop || !title || !date || !time || !price || !maxParticipants) {
      toast.error('Please enter all required fields');
      return;
    }
    setWorkshops(prev => prev.map(w => w.id === selectedWorkshop.id ? {
      ...w,
      title,
      description,
      date,
      time,
      duration,
      price: parseFloat(price),
      isOnline,
      location: isOnline ? 'Zoom Meeting' : location,
      maxParticipants: parseInt(maxParticipants)
    } : w));
    toast.success('Workshop details updated!');
    setShowEditModal(false);
  };

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Workshops</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your live and in-person sessions</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4" /> Create Workshop
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Sessions', value: workshops.length },
          { label: 'Total Enrolled', value: workshops.reduce((a,w) => a + w.enrolledCount, 0) },
          { label: 'Online Sessions', value: workshops.filter(w => w.isOnline).length },
          { label: 'Revenue', value: `$${workshops.reduce((a,w) => a + (w.enrolledCount * w.price), 0).toLocaleString()}` },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-secondary">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {workshops.map(workshop => {
          const spotsLeft = workshop.maxParticipants - workshop.enrolledCount;
          const fillPercent = (workshop.enrolledCount / workshop.maxParticipants) * 100;
          return (
            <div key={workshop.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-craft transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border">
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
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" className="h-8 text-xs rounded-xl gap-1 font-semibold" onClick={() => handleOpenEdit(workshop)}>
                      <Edit2 className="w-3 h-3" /> Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl text-red-400 hover:bg-red-50"
                      onClick={() => { setWorkshops(prev => prev.filter(w => w.id !== workshop.id)); toast.success('Workshop deleted'); }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Workshop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Schedule Workshop</h3>
            <p className="text-xs text-muted-foreground mb-4">Set up a live interactive virtual or physical session</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ws-title">Workshop Title *</Label>
                <Input id="ws-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Macramé plant hanger class" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ws-price">Price ($) *</Label>
                  <Input id="ws-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="25.00" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ws-spots">Max Spots *</Label>
                  <Input id="ws-spots" type="number" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} placeholder="15" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ws-date">Date *</Label>
                  <Input id="ws-date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ws-time">Time *</Label>
                  <Input id="ws-time" placeholder="10:00 AM - 12:00 PM" value={time} onChange={e => setTime(e.target.value)} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsOnline(!isOnline)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${isOnline ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isOnline ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-xs font-semibold text-foreground">Online Session (Zoom Link)</span>
              </div>

              {!isOnline && (
                <div className="space-y-1.5">
                  <Label htmlFor="ws-loc">Physical Location *</Label>
                  <Input id="ws-loc" value={location} onChange={e => setLocation(e.target.value)} placeholder="Downtown Craft Center, Room B" />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Schedule Session
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Workshop Modal */}
      {showEditModal && selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Workshop Details</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify timing, spots, or location coordinates</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="we-title">Workshop Title *</Label>
                <Input id="we-title" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="we-price">Price ($) *</Label>
                  <Input id="we-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="we-spots">Max Spots *</Label>
                  <Input id="we-spots" type="number" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="we-date">Date *</Label>
                  <Input id="we-date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="we-time">Time *</Label>
                  <Input id="we-time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsOnline(!isOnline)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${isOnline ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isOnline ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-xs font-semibold text-foreground">Online Session (Zoom Link)</span>
              </div>

              {!isOnline && (
                <div className="space-y-1.5">
                  <Label htmlFor="we-loc">Physical Location *</Label>
                  <Input id="we-loc" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </InstructorLayout>
  );
}
