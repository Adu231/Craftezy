import { useState } from 'react';
import { Store, Camera, Edit3, Star, Package, ShoppingCart, Globe, Save } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { STORE_STATS } from '@/services/mockData';
import workshopImg from '@/assets/artisan-workshop.jpg';

export default function StorePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    storeName: user?.storeName || '',
    bio: user?.bio || '',
    location: user?.location || '',
  });

  const handleSave = () => {
    updateUser({ storeName: form.storeName, bio: form.bio, location: form.location });
    setIsEditing(false);
    toast.success('Store updated successfully!');
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Store</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your artisan storefront</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? 'btn-primary rounded-xl gap-2' : 'rounded-xl gap-2'}
          variant={isEditing ? 'default' : 'outline'}
        >
          {isEditing ? <><Save className="w-4 h-4" />Save Changes</> : <><Edit3 className="w-4 h-4" />Edit Store</>}
        </Button>
      </div>

      {/* Store Cover */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-48 sm:h-64">
        <img src={workshopImg} alt="Store Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-white transition-colors">
          <Camera className="w-3.5 h-3.5" /> Change Cover
        </button>
        {user?.isVerified && (
          <Badge className="absolute top-4 left-4 bg-secondary text-white">✓ Verified Artisan</Badge>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Store Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-5 flex items-center gap-2">
              <Store className="w-4 h-4 text-primary" /> Store Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Store Name</Label>
                {isEditing ? (
                  <Input
                    value={form.storeName}
                    onChange={e => setForm(f => ({ ...f, storeName: e.target.value }))}
                    className="mt-1.5 h-10 rounded-xl"
                  />
                ) : (
                  <p className="mt-1.5 text-sm font-medium">{user?.storeName || 'Not set'}</p>
                )}
              </div>
              <div>
                <Label className="text-sm">Store Description</Label>
                {isEditing ? (
                  <textarea
                    value={form.bio}
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={4}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                ) : (
                  <p className="mt-1.5 text-sm text-muted-foreground">{user?.bio || 'No description yet.'}</p>
                )}
              </div>
              <div>
                <Label className="text-sm">Location</Label>
                {isEditing ? (
                  <Input
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="mt-1.5 h-10 rounded-xl"
                    placeholder="City, State"
                  />
                ) : (
                  <p className="mt-1.5 text-sm text-muted-foreground">{user?.location || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Store Policies */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-5">Store Policies</h3>
            <div className="space-y-4">
              {[
                { label: 'Return Policy', value: 'Returns accepted within 14 days of delivery for items in original condition.' },
                { label: 'Processing Time', value: '3-5 business days before shipping. Custom orders: 7-14 days.' },
                { label: 'Custom Orders', value: 'Gladly accepted! Please message for quotes and timeline before ordering.' },
                { label: 'Shipping', value: 'Ships USPS Priority Mail with tracking. International available on request.' },
              ].map((policy, i) => (
                <div key={i} className="border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="text-sm font-medium mb-1">{policy.label}</div>
                  <div className="text-sm text-muted-foreground">{policy.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-sm mb-4">Store Stats</h3>
            <div className="space-y-4">
              {[
                { icon: ShoppingCart, label: 'Total Orders', value: STORE_STATS.totalOrders, color: 'text-primary bg-primary/10' },
                { icon: Package, label: 'Products', value: STORE_STATS.totalProducts, color: 'text-secondary bg-secondary/10' },
                { icon: Star, label: 'Avg Rating', value: `${STORE_STATS.averageRating}★`, color: 'text-[hsl(35,70%,42%)] bg-accent/15' },
                { icon: Globe, label: 'Customers', value: STORE_STATS.totalCustomers, color: 'text-primary bg-primary/10' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                  </div>
                  <span className="font-semibold text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
            <div className="text-2xl mb-2">🌟</div>
            <h4 className="font-semibold text-sm mb-1.5">Boost Your Store</h4>
            <p className="text-xs text-muted-foreground mb-4">Upgrade to Studio plan for 0% fees and priority placement.</p>
            <Button className="w-full btn-primary rounded-xl h-9 text-sm">Upgrade Now</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
