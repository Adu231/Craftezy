import { useState } from 'react';
import { Bell, Shield, Truck, Trash2 } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SupplierSettings() {
  const [notifs, setNotifs] = useState({ orders: true, lowStock: true, reviews: false, news: false });
  return (
    <SupplierLayout>
      <div className="mb-6"><h1 className="font-display font-bold text-2xl sm:text-3xl">Settings</h1><p className="text-muted-foreground text-sm mt-1">Manage your supplier preferences</p></div>
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center"><Bell className="w-5 h-5 text-yellow-600" /></div>
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'orders', label: 'New Orders', desc: 'When an order is placed' },
              { key: 'lowStock', label: 'Low Stock Alerts', desc: 'When items hit reorder point' },
              { key: 'reviews', label: 'Reviews', desc: 'Customer reviews and ratings' },
              { key: 'news', label: 'Platform Updates', desc: 'Platform news and tips' },
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
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4"><Truck className="w-5 h-5 text-primary" /><h3 className="font-semibold">Shipping Settings</h3></div>
          <Button variant="outline" className="rounded-xl" onClick={() => toast.info('Shipping zones coming soon')}>Configure Shipping Zones</Button>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-600" /><h3 className="font-semibold text-red-700">Danger Zone</h3></div>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl"
            onClick={() => toast.error('Account deletion requires email confirmation')}>Delete Supplier Account</Button>
        </div>
      </div>
    </SupplierLayout>
  );
}
