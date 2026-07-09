import { useState } from 'react';
import { Bell, Shield, CreditCard, Palette, Globe, Save } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const TABS = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'preferences', label: 'Preferences', icon: Globe },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState({
    newOrders: true, orderUpdates: true, newReviews: true,
    messages: true, workshops: false, promotions: false,
  });

  const save = () => toast.success('Settings saved!');

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="bg-card rounded-2xl border border-border p-3 h-fit">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === tab.id ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'notifications' && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-5">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    newOrders: 'New order received',
                    orderUpdates: 'Order status updates',
                    newReviews: 'New reviews on your products',
                    messages: 'New customer messages',
                    workshops: 'Workshop registrations',
                    promotions: 'Craftezy promotions & tips',
                  };
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <Label className="text-sm font-medium">{labels[key]}</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">Receive email & push notifications</p>
                      </div>
                      <button
                        onClick={() => setNotifications(n => ({ ...n, [key]: !value }))}
                        className={cn('w-11 h-6 rounded-full transition-colors duration-200 relative', value ? 'bg-primary' : 'bg-muted-foreground/30')}
                      >
                        <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200', value ? 'left-5' : 'left-0.5')} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <Button onClick={save} className="mt-6 btn-primary rounded-xl gap-2"><Save className="w-4 h-4" />Save</Button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
              <h3 className="font-semibold">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <input type="password" className="w-full mt-1.5 h-10 px-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="••••••••" />
                </div>
                <div>
                  <Label>New Password</Label>
                  <input type="password" className="w-full mt-1.5 h-10 px-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Min 8 characters" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <input type="password" className="w-full mt-1.5 h-10 px-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Confirm password" />
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="font-semibold text-sm mb-1">Two-Factor Authentication</div>
                <p className="text-xs text-muted-foreground mb-3">Add an extra layer of security to your account</p>
                <Button variant="outline" className="rounded-xl h-9 text-sm">Enable 2FA</Button>
              </div>
              <Button onClick={save} className="btn-primary rounded-xl gap-2"><Save className="w-4 h-4" />Update Password</Button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-5">Billing & Plan</h3>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Artisan Plan</div>
                    <div className="text-sm text-muted-foreground">$19/month · Renews Mar 15, 2025</div>
                  </div>
                  <Button variant="outline" className="rounded-xl text-sm">Change Plan</Button>
                </div>
              </div>
              <div>
                <Label className="mb-3 block">Payment Method</Label>
                <div className="p-4 border border-border rounded-xl flex items-center gap-3">
                  <div className="w-10 h-6 bg-muted rounded flex items-center justify-center text-xs font-bold">VISA</div>
                  <span className="text-sm">•••• •••• •••• 4242</span>
                  <span className="text-xs text-muted-foreground ml-auto">Expires 12/26</span>
                </div>
              </div>
              <Button onClick={save} className="mt-5 btn-primary rounded-xl gap-2"><Save className="w-4 h-4" />Save</Button>
            </div>
          )}

          {(activeTab === 'appearance' || activeTab === 'preferences') && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-5 capitalize">{activeTab} Settings</h3>
              <div className="text-center py-12">
                <div className="text-4xl mb-3">⚙️</div>
                <p className="text-muted-foreground text-sm">These settings will be available soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
