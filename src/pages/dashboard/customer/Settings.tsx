import { useState } from 'react';
import { Bell, Shield, Globe, Moon, Trash2 } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CustomerSettings() {
  const [notifs, setNotifs] = useState({ orders: true, promos: false, reviews: true, news: false });
  const [theme, setTheme] = useState('light');

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-xs text-muted-foreground">Choose what you want to be notified about</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'orders', label: 'Order Updates', desc: 'Shipping, delivery, and status changes' },
              { key: 'promos', label: 'Promotions & Deals', desc: 'Special offers and discounts' },
              { key: 'reviews', label: 'Review Reminders', desc: 'Reminders to review purchases' },
              { key: 'news', label: 'Platform News', desc: 'New features and announcements' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${notifs[item.key as keyof typeof notifs] ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[item.key as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-xs text-muted-foreground">Manage your account security</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full rounded-xl justify-start" onClick={() => toast.info('Change password coming soon')}>
              Change Password
            </Button>
            <Button variant="outline" className="w-full rounded-xl justify-start" onClick={() => toast.info('Two-factor auth coming soon')}>
              Enable Two-Factor Authentication
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-700">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back.</p>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl"
            onClick={() => toast.error('Account deletion requires confirmation via email')}>
            Delete Account
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
}
