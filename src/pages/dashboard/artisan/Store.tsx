import { useState } from 'react';
import { Store, ExternalLink, Edit2, Package, Star, TrendingUp } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { toast } from 'sonner';

export default function ArtisanStore() {
  const { user, updateUser } = useAuth();
  
  // Store toggles state
  const [config, setConfig] = useState({
    acceptCustom: true,
    showReviews: true,
    displayInventory: false,
    holidayMode: false,
  });

  // Edit store modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [storeName, setStoreName] = useState(user?.storeName || '');
  const [storeBio, setStoreBio] = useState(user?.bio || '');

  const handleToggle = (key: keyof typeof config, label: string) => {
    setConfig(prev => {
      const nextValue = !prev[key];
      toast.success(`${label} turned ${nextValue ? 'ON' : 'OFF'}`);
      return { ...prev, [key]: nextValue };
    });
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) {
      toast.error('Store Name cannot be empty');
      return;
    }
    if (updateUser) {
      updateUser({ storeName, bio: storeBio });
      toast.success('Store details updated successfully!');
      setShowEditModal(false);
    }
  };

  return (
    <ArtisanLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Store</h1>
          <p className="text-muted-foreground text-sm mt-1">{user?.storeName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2" onClick={() => toast.info('Preview store in new tab coming soon')}>
            <ExternalLink className="w-4 h-4" /> Preview Store
          </Button>
          <Button className="btn-primary rounded-xl gap-2" onClick={() => setShowEditModal(true)}>
            <Edit2 className="w-4 h-4" /> Edit Store
          </Button>
        </div>
      </div>

      {/* Store Preview Banner */}
      <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(16,57%,50%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(40,79%,53%) 0%, transparent 50%)' }} />
        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-craft flex items-center justify-center text-3xl">
            🏺
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl">{user?.storeName}</h2>
            <p className="text-muted-foreground text-sm mt-1">craftezy.com/store/{user?.id}</p>
            <div className="flex items-center gap-4 mt-2">
              {user?.isVerified && <Badge className="bg-secondary/10 text-secondary text-xs">✓ Verified Artisan</Badge>}
              <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-accent fill-current" /><span className="font-semibold">{user?.rating}</span><span className="text-muted-foreground">({user?.reviewCount} reviews)</span></div>
              <span className="text-sm text-muted-foreground">{user?.followers} followers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Products Listed', value: MOCK_PRODUCTS.length, icon: Package, color: 'text-primary' },
          { label: 'Total Sales', value: user?.totalSales, icon: TrendingUp, color: 'text-secondary' },
          { label: 'Avg Rating', value: `${user?.rating}★`, icon: Star, color: 'text-accent' },
          { label: 'Followers', value: user?.followers, icon: Store, color: 'text-blue-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Store Sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* About Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Store Description</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs rounded-lg" onClick={() => setShowEditModal(true)}>
              <Edit2 className="w-3 h-3 mr-1" /> Edit
            </Button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {user?.bio || 'No description yet. Add a story to connect with your customers!'}
          </p>
        </div>

        {/* Store Settings */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4">Store Configuration</h3>
          <div className="space-y-4">
            {[
              { key: 'acceptCustom', label: 'Accept Custom Orders', desc: 'Allow customers to request personalized orders' },
              { key: 'showReviews', label: 'Show Product Reviews', desc: 'Display user ratings on your product lists' },
              { key: 'displayInventory', label: 'Display Inventory Count', desc: 'Show remaining stock numbers' },
              { key: 'holidayMode', label: 'Holiday Mode', desc: 'Temporarily pause store sales and checkouts' },
            ].map(s => (
              <div key={s.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
                <button onClick={() => handleToggle(s.key as keyof typeof config, s.label)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${config[s.key as keyof typeof config] ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${config[s.key as keyof typeof config] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-6 bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">Featured Products</h3>
          <Button variant="outline" size="sm" className="rounded-xl text-xs" onClick={() => toast.info('Manage featured products coming soon')}>
            Manage Featured
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4).map(p => (
            <div key={p.id} className="group">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {p.isBestseller && <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">Bestseller</div>}
              </div>
              <p className="text-xs font-medium line-clamp-2">{p.title}</p>
              <p className="text-xs text-primary font-bold mt-0.5">${p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Store Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleSaveStore} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Store Details</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify the public profile settings of your artisan boutique</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                  placeholder="Boutique Name"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="store-description">Store Description (Bio)</Label>
                <textarea
                  id="store-description"
                  value={storeBio}
                  onChange={e => setStoreBio(e.target.value)}
                  className="w-full h-28 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe your creative journey, techniques, and style..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
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
    </ArtisanLayout>
  );
}
