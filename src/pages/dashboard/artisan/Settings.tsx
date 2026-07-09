import { useState } from 'react';
import { Bell, Shield, Globe, Trash2, Store } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ArtisanSettings() {
  const [notifs, setNotifs] = useState({ orders: true, reviews: true, messages: true, promo: false });
  const [storeUrl, setStoreUrl] = useState('emmas-handcrafted-studio');

  return (
    <ArtisanLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your store and account preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Settings */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center"><Store className="w-5 h-5 text-primary" /></div>
            <div><h3 className="font-semibold">Store Settings</h3><p className="text-xs text-muted-foreground">Manage your storefront settings</p></div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Store URL</Label>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-xl border border-border">craftezy.com/store/</span>
                <Input value={storeUrl} onChange={e => setStoreUrl(e.target.value)} className="h-10 rounded-xl flex-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Accept Custom Orders</p><p className="text-xs text-muted-foreground">Allow customers to request custom items</p></div>
              <button className="w-11 h-6 bg-primary rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Vacation Mode</p><p className="text-xs text-muted-foreground">Pause your store temporarily</p></div>
              <button className="w-11 h-6 bg-muted rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </button>
            </div>
            <Button className="btn-primary rounded-xl" onClick={() => toast.success('Store settings saved!')}>Save Store Settings</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center"><Bell className="w-5 h-5 text-blue-600" /></div>
            <div><h3 className="font-semibold">Notifications</h3><p className="text-xs text-muted-foreground">Manage email and push notifications</p></div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'orders', label: 'New Orders', desc: 'Get notified when you receive an order' },
              { key: 'reviews', label: 'New Reviews', desc: 'Get notified when customers leave reviews' },
              { key: 'messages', label: 'Messages', desc: 'Get notified for new customer messages' },
              { key: 'promo', label: 'Promotions', desc: 'Platform tips and feature announcements' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <button onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${notifs[item.key as keyof typeof notifs] ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[item.key as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-600" /><h3 className="font-semibold text-red-700">Danger Zone</h3></div>
          <p className="text-sm text-red-600 mb-4">Permanently delete your store and all listings.</p>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl"
            onClick={() => toast.error('Store deletion requires verification via email')}>Delete Store</Button>
        </div>
      </div>
    </ArtisanLayout>
  );
}
