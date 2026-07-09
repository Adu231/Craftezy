import { useState } from 'react';
import { Camera, Save, MapPin } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function CustomerProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
  });

  const handleSave = () => {
    updateUser(form);
    toast.success('Profile updated!');
  };

  return (
    <CustomerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your account information</p>
        </div>
        <Button onClick={handleSave} className="btn-primary rounded-xl gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 text-center h-fit">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-3xl font-bold bg-blue-500 text-white">{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="font-semibold">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">Customer since {new Date(user?.joinedAt || '').getFullYear()}</p>
          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-border">
            <div><div className="font-bold">12</div><div className="text-[10px] text-muted-foreground">Orders</div></div>
            <div><div className="font-bold">5</div><div className="text-[10px] text-muted-foreground">Reviews</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 h-10 rounded-xl" />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1.5 h-10 rounded-xl" type="email" />
            </div>
            <div className="sm:col-span-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="mt-1.5 h-10 rounded-xl" placeholder="City, Country" />
            </div>
            <div className="sm:col-span-2">
              <Label>Bio</Label>
              <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4}
                className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Tell us about yourself..." />
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
