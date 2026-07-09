import { useState } from 'react';
import LearnerLayout from '@/layouts/role/LearnerLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Mail, MapPin, Calendar, Award } from 'lucide-react';

export default function LearnerProfile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateUser({ name, location, bio });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <LearnerLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">My Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your student profile and interests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Avatar Card */}
        <div className="bg-card rounded-3xl border border-border p-6 text-center space-y-4 h-fit">
          <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden bg-muted">
            <Avatar className="w-full h-full rounded-2xl">
              <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
              <AvatarFallback className="text-xl font-bold">{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-foreground">{user?.name}</h2>
            <p className="text-xs text-muted-foreground capitalize font-bold text-primary mt-0.5">{user?.role}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed px-2">
            {user?.bio || "Craft learner interested in pottery, weaving, and textile design."}
          </p>

          <div className="pt-4 border-t border-border space-y-2.5 text-left text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>{user?.email}</span>
            </div>
            {user?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{user?.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'recently'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Edit Form / Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-border shadow-craft-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h3 className="font-semibold text-base text-foreground">Personal Details</h3>
              <Button
                variant={isEditing ? 'outline' : 'default'}
                onClick={() => {
                  if (isEditing) {
                    setName(user?.name || '');
                    setLocation(user?.location || '');
                    setBio(user?.bio || '');
                  }
                  setIsEditing(!isEditing);
                }}
                className="rounded-xl px-4 py-2 font-semibold text-xs h-9"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="profile-name">Full Name</Label>
                  <Input
                    id="profile-name"
                    value={name}
                    disabled={!isEditing}
                    onChange={e => setName(e.target.value)}
                    className="h-11 rounded-xl border-border bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="profile-location">Location</Label>
                  <Input
                    id="profile-location"
                    value={location}
                    disabled={!isEditing}
                    onChange={e => setLocation(e.target.value)}
                    className="h-11 rounded-xl border-border bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-bio">Bio</Label>
                <textarea
                  id="profile-bio"
                  value={bio}
                  disabled={!isEditing}
                  onChange={e => setBio(e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                />
              </div>

              {isEditing && (
                <div className="flex justify-end pt-2">
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5 py-2.5 font-semibold text-sm">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Interests panel */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-craft-sm">
            <h3 className="font-semibold text-base text-foreground mb-4">My Learning Goals</h3>
            <div className="flex flex-wrap gap-2">
              {['Pottery', 'Macramé', 'Weaving', 'Watercolors', 'Embroidery', 'Jewelry Silversmithing'].map(interest => (
                <span key={interest} className="flex items-center gap-1 bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full border border-border font-medium">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LearnerLayout>
  );
}
