import { useState } from 'react';
import { Bell, Shield, Trash2 } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BrandSettings() {
  const [notifs, setNotifs] = useState({ campaigns: true, messages: true, analytics: false, news: false });
  return (
    <BrandLayout>
      <div className="mb-6"><h1 className="font-display font-bold text-2xl sm:text-3xl">Settings</h1><p className="text-muted-foreground text-sm mt-1">Brand account preferences</p></div>
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-pink-50 rounded-xl flex items-center justify-center"><Bell className="w-5 h-5 text-pink-600" /></div><h3 className="font-semibold">Notifications</h3></div>
          <div className="space-y-4">
            {[
              { key: 'campaigns', label: 'Campaign Updates', desc: 'Performance alerts and milestones' },
              { key: 'messages', label: 'Creator Messages', desc: 'Direct messages from creators' },
              { key: 'analytics', label: 'Weekly Reports', desc: 'Weekly analytics digest' },
              { key: 'news', label: 'Platform News', desc: 'New features and tips' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <button onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${notifs[item.key as keyof typeof notifs] ? 'bg-pink-600' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[item.key as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4"><Shield className="w-5 h-5 text-blue-600" /><h3 className="font-semibold">Security</h3></div>
          <Button variant="outline" className="rounded-xl" onClick={() => toast.info('Password change coming soon')}>Change Password</Button>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-600" /><h3 className="font-semibold text-red-700">Danger Zone</h3></div>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl"
            onClick={() => toast.error('Brand account deletion requires email confirmation')}>Delete Brand Account</Button>
        </div>
      </div>
    </BrandLayout>
  );
}
