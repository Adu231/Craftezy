import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function InstructorProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', bio: user?.bio || '', location: user?.location || '', storeName: user?.storeName || '' });

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Instructor Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Your public teaching profile</p>
        </div>
        <Button onClick={() => { updateUser(form); toast.success('Profile updated!'); }} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2">
          <Save className="w-4 h-4" /> Save
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 text-center h-fit">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24"><AvatarImage src={user?.avatar} /><AvatarFallback className="text-3xl bg-secondary text-white">{user?.name?.[0]}</AvatarFallback></Avatar>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center"><Camera className="w-4 h-4" /></button>
          </div>
          <h2 className="font-semibold text-lg">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.storeName}</p>
          <Badge className="bg-green-100 text-green-800 mt-2 text-xs">✓ Verified Instructor</Badge>
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border">
            <div><div className="font-bold text-lg">4,430</div><div className="text-[10px] text-muted-foreground">Students</div></div>
            <div><div className="font-bold text-lg">4.9★</div><div className="text-[10px] text-muted-foreground">Rating</div></div>
            <div><div className="font-bold text-lg">3</div><div className="text-[10px] text-muted-foreground">Courses</div></div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-5">Instructor Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1.5 h-10 rounded-xl" /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1.5 h-10 rounded-xl" /></div>
              <div><Label>Academy Name</Label><Input value={form.storeName} onChange={e => setForm(f => ({ ...f, storeName: e.target.value }))} className="mt-1.5 h-10 rounded-xl" /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="mt-1.5 h-10 rounded-xl" /></div>
              <div className="sm:col-span-2">
                <Label>Teaching Bio</Label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-5">Teaching Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {['Macramé', 'Weaving', 'Fiber Arts', 'Natural Dye', 'Textile Design'].map(skill => (
                <Badge key={skill} variant="outline" className="rounded-full px-3 py-1 cursor-pointer hover:border-secondary hover:text-secondary transition-colors">{skill}</Badge>
              ))}
              <button className="px-3 py-1 rounded-full border border-dashed border-border text-xs text-muted-foreground hover:border-secondary transition-colors">+ Add</button>
            </div>
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
