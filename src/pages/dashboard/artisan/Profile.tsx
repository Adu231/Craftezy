import { useState } from 'react';
import { Camera, Save, MapPin, Link as LinkIcon } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ArtisanProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    storeName: user?.storeName || '',
  });

  const handleSave = () => {
    updateUser(form);
    toast.success('Profile updated successfully!');
  };

  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your artisan profile and store</p>
        </div>
        <Button onClick={handleSave} className="btn-primary rounded-xl gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-3xl font-bold bg-primary text-white">{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="font-semibold text-lg">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.storeName}</p>
            {user?.isVerified && <Badge className="bg-secondary/10 text-secondary mt-2 text-xs">✓ Verified Artisan</Badge>}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border">
              <div className="text-center"><div className="font-bold text-lg">{user?.totalSales}</div><div className="text-[10px] text-muted-foreground">Sales</div></div>
              <div className="text-center"><div className="font-bold text-lg">{user?.rating}★</div><div className="text-[10px] text-muted-foreground">Rating</div></div>
              <div className="text-center"><div className="font-bold text-lg">{user?.followers}</div><div className="text-[10px] text-muted-foreground">Followers</div></div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
            <h3 className="font-semibold text-sm">Quick Links</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" /><span>{user?.location || 'Location not set'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LinkIcon className="w-4 h-4 text-primary shrink-0" />
              <span className="text-primary hover:underline cursor-pointer">craftezy.com/store/{user?.id}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-5">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 h-10 rounded-xl" /></div>
              <div><Label>Email Address</Label><Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1.5 h-10 rounded-xl" type="email" /></div>
              <div><Label>Store Name</Label><Input value={form.storeName} onChange={e => setForm(f => ({ ...f, storeName: e.target.value }))} className="mt-1.5 h-10 rounded-xl" /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="mt-1.5 h-10 rounded-xl" placeholder="City, Country" /></div>
              <div className="sm:col-span-2">
                <Label>Bio</Label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Tell your craft story..." />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-5">Skills & Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {['Macramé', 'Ceramics', 'Natural Dyeing', 'Weaving', 'Jewelry Making', 'Candle Making'].map(skill => (
                <Badge key={skill} variant="outline" className="rounded-full px-3 py-1 cursor-pointer hover:border-primary hover:text-primary transition-colors">{skill}</Badge>
              ))}
              <button className="px-3 py-1 rounded-full border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">+ Add Skill</button>
            </div>
          </div>
        </div>
      </div>
    </ArtisanLayout>
  );
}
