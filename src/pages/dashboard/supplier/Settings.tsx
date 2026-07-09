import { useState } from 'react';
import { Bell, Truck, Trash2 } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function SupplierSettings() {
  const [notifs, setNotifs] = useState({ orders: true, lowStock: true, reviews: false, news: false });
  
  // Shipping zone modal state
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [domesticRate, setDomesticRate] = useState('5.00');
  const [internationalRate, setInternationalRate] = useState('25.00');

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domesticRate || !internationalRate) {
      toast.error('Please enter valid flat rate numbers');
      return;
    }
    toast.success('Shipping zones flat rates updated successfully!');
    setShowShippingModal(false);
  };

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
          <Button variant="outline" className="rounded-xl h-11 px-4 font-semibold" onClick={() => setShowShippingModal(true)}>Configure Shipping Zones</Button>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-600" /><h3 className="font-semibold text-red-700">Danger Zone</h3></div>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl"
            onClick={() => toast.error('Account deletion requires email confirmation')}>Delete Supplier Account</Button>
        </div>
      </div>

      {/* Shipping Zones Modal */}
      {showShippingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleSaveShipping} className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Shipping Zone Rates</h3>
            <p className="text-xs text-muted-foreground mb-4">Set flat-rate shipping values for materials delivery</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="dom-rate">Domestic flat rate ($) *</Label>
                <Input
                  id="dom-rate"
                  type="number"
                  step="0.01"
                  value={domesticRate}
                  onChange={e => setDomesticRate(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="int-rate">International flat rate ($) *</Label>
                <Input
                  id="int-rate"
                  type="number"
                  step="0.01"
                  value={internationalRate}
                  onChange={e => setInternationalRate(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowShippingModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Save Rates
              </Button>
            </div>
          </form>
        </div>
      )}
    </SupplierLayout>
  );
}
