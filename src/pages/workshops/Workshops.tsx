import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowLeft, Calendar, Clock, MapPin, Users, Shield, Check, Wifi, Sparkles } from 'lucide-react';
import { MOCK_WORKSHOPS } from '@/services/mockData';
import MainLayout from '@/layouts/MainLayout';
import WorkshopCard from '@/components/features/WorkshopCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function Workshops() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(MOCK_WORKSHOPS.map(w => w.category)))];

  const filteredWorkshops = MOCK_WORKSHOPS.filter(w => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase()) ||
      w.instructor.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesFormat = selectedFormat === 'All' ||
      (selectedFormat === 'online' && w.isOnline) ||
      (selectedFormat === 'in-person' && !w.isOnline);
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const selectedWorkshop = MOCK_WORKSHOPS.find(w => w.id === id);

  if (selectedWorkshop) {
    const spotsLeft = selectedWorkshop.maxParticipants - selectedWorkshop.enrolledCount;
    const relatedWorkshops = MOCK_WORKSHOPS.filter(w => w.category === selectedWorkshop.category && w.id !== selectedWorkshop.id).slice(0, 3);

    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/workshops" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Workshops
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 border border-border shadow-craft-sm mb-16">
              {/* Image & Category */}
              <div>
                <div className="aspect-video rounded-2xl overflow-hidden bg-muted border border-border mb-6">
                  <img
                    src={selectedWorkshop.thumbnail}
                    alt={selectedWorkshop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3 mb-6">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-semibold text-xs px-2.5 py-1">
                    {selectedWorkshop.category}
                  </Badge>
                  <Badge className={selectedWorkshop.isOnline ? 'bg-secondary/10 text-secondary border-none' : 'bg-primary/10 text-primary border-none'}>
                    {selectedWorkshop.isOnline ? 'Online via Zoom' : 'In-Person Workshop'}
                  </Badge>
                  {spotsLeft <= 3 && spotsLeft > 0 && (
                    <Badge className="bg-accent/15 text-accent border-none font-semibold">
                      Only {spotsLeft} spots left!
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <h3 className="font-semibold text-base text-foreground mb-3">About this Workshop:</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {selectedWorkshop.description}
                </p>
              </div>

              {/* Booking & Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
                    {selectedWorkshop.title}
                  </h1>

                  {/* Details Card */}
                  <div className="bg-muted/50 border border-border rounded-2xl p-6 space-y-4 mb-8">
                    <div className="flex items-center gap-3.5">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm font-semibold text-foreground">
                          {new Date(selectedWorkshop.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time & Duration</p>
                        <p className="text-sm font-semibold text-foreground">
                          {selectedWorkshop.time} ({selectedWorkshop.duration})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-semibold text-foreground">
                          {selectedWorkshop.isOnline ? 'Online Link Provided After Booking' : selectedWorkshop.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Class Size</p>
                        <p className="text-sm font-semibold text-foreground">
                          {selectedWorkshop.enrolledCount} enrolled of {selectedWorkshop.maxParticipants} max capacity
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Instructor Bio */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border mb-8">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img src={selectedWorkshop.instructor.avatar} alt={selectedWorkshop.instructor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Led by Expert Instructor</p>
                      <h5 className="font-semibold text-sm text-foreground">{selectedWorkshop.instructor.name}</h5>
                      <p className="text-[10px] text-muted-foreground">{selectedWorkshop.instructor.storeName}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Price per person</span>
                    <span className="text-3xl font-bold text-foreground">${selectedWorkshop.price}</span>
                  </div>

                  <Button
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error('Please sign in to book a workshop');
                        navigate('/login');
                        return;
                      }
                      navigate('/checkout', { state: { type: 'workshop', item: selectedWorkshop } });
                    }}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 font-semibold text-base shadow-lg"
                  >
                    Confirm Booking
                  </Button>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground justify-center py-2">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-primary" /> 100% money back guarantee up to 24h before event
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-primary" /> Materials list included
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Workshops */}
            {relatedWorkshops.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-6">More Workshops You Might Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedWorkshops.map(w => (
                    <WorkshopCard key={w.id} workshop={w} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
              Live Craft <span className="text-primary">Workshops</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn skills in real-time from expert makers. Interactive, hands-on workshops for every creative mind.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search workshops or instructors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-11 pr-4 h-12 rounded-xl border-border w-full bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2.5 items-center">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-1" />
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="h-12 border border-border bg-white rounded-xl px-4 text-sm font-medium focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={selectedFormat}
                  onChange={e => setSelectedFormat(e.target.value)}
                  className="h-12 border border-border bg-white rounded-xl px-4 text-sm font-medium focus:outline-none"
                >
                  <option value="All">All Formats</option>
                  <option value="online">Online / Zoom</option>
                  <option value="in-person">In-Person</option>
                </select>
              </div>
            </div>
          </div>

          {/* Workshop Grid */}
          {filteredWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWorkshops.map(w => (
                <WorkshopCard key={w.id} workshop={w} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-border">
              <p className="text-muted-foreground text-lg mb-2">No workshops found matching your criteria.</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedFormat('All'); }}
                className="text-primary font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
