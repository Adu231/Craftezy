import { useState } from 'react';
import { Globe, Database, Trash2, Save, X } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState('Craftezy');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [featureFlags, setFeatureFlags] = useState({ aiAssistant: true, workshops: true, suppliers: true, brandPartners: true, bulkOrders: false });

  // Danger Modals State
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [purgeInput, setPurgeInput] = useState('');
  
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetInput, setResetInput] = useState('');

  const handlePurgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (purgeInput !== 'PURGE') {
      toast.error('Verification code invalid. Please type "PURGE" exactly.');
      return;
    }
    toast.success('All sandbox test data, marketplace items, and chat logs successfully purged.');
    setShowPurgeModal(false);
    setPurgeInput('');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetInput !== 'RESET') {
      toast.error('Verification code invalid. Please type "RESET" exactly.');
      return;
    }
    localStorage.clear();
    toast.success('Platform state has been completely reset to factory defaults! Reloading...');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    setShowResetModal(false);
    setResetInput('');
  };

  return (
    <AdminLayout>
      <div className="mb-6"><h1 className="font-display font-bold text-2xl sm:text-3xl">Admin Settings</h1><p className="text-muted-foreground text-sm mt-1">Platform configuration and management</p></div>

      <div className="max-w-2xl space-y-6">
        {/* Platform Config */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-red-600" /></div><h3 className="font-semibold">Platform Configuration</h3></div>
          <div className="space-y-4">
            <div><Label>Platform Name</Label><Input value={platformName} onChange={e => setPlatformName(e.target.value)} className="mt-1.5 h-10 rounded-xl bg-white border-border" /></div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Temporarily disable platform for updates</p></div>
              <button onClick={() => setMaintenanceMode(m => !m)} className={`w-11 h-6 rounded-full transition-colors relative ${maintenanceMode ? 'bg-red-500' : 'bg-muted'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${maintenanceMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <Button className="btn-primary rounded-xl gap-2 font-semibold" onClick={() => toast.success('Settings saved!')}><Save className="w-4 h-4" /> Save Config</Button>
          </div>
        </div>

        {/* Feature Flags */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center"><Database className="w-5 h-5 text-blue-600" /></div><h3 className="font-semibold">Feature Flags</h3></div>
          <div className="space-y-4">
            {[
              { key: 'aiAssistant', label: 'AI Assistant', desc: 'AI craft assistant for artisans' },
              { key: 'workshops', label: 'Workshops', desc: 'Live and recorded workshop platform' },
              { key: 'suppliers', label: 'Supplier Marketplace', desc: 'Materials and supplies section' },
              { key: 'brandPartners', label: 'Brand Partnerships', desc: 'Brand collaboration features' },
              { key: 'bulkOrders', label: 'Bulk Orders (Beta)', desc: 'Wholesale and bulk order system' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <button onClick={() => setFeatureFlags(f => ({ ...f, [item.key]: !f[item.key as keyof typeof f] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${featureFlags[item.key as keyof typeof featureFlags] ? 'bg-secondary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${featureFlags[item.key as keyof typeof featureFlags] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-red-600" /><h3 className="font-semibold text-red-700">Danger Zone</h3></div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-100 rounded-xl justify-start font-semibold"
              onClick={() => setShowPurgeModal(true)}>Purge Test Data</Button>
            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-100 rounded-xl justify-start font-semibold"
              onClick={() => setShowResetModal(true)}>Reset Platform (DANGER)</Button>
          </div>
        </div>
      </div>

      {/* Purge Test Data Modal */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handlePurgeSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> Purge Sandbox Data
            </h3>
            <p className="text-xs text-muted-foreground mb-4">This action will delete all user-added listings. To proceed, please type <strong className="text-foreground">PURGE</strong> below.</p>

            <div className="space-y-1.5 mb-4">
              <Label htmlFor="purge-inp">Verification Code *</Label>
              <Input
                id="purge-inp"
                value={purgeInput}
                onChange={e => setPurgeInput(e.target.value)}
                className="h-11 rounded-xl border-border bg-white"
                placeholder="PURGE"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowPurgeModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-red-600 text-white hover:bg-red-700 px-5 border-none">
                Confirm Purge
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reset Platform Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleResetSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-red-600 flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> Reset Platform State
            </h3>
            <p className="text-xs text-muted-foreground mb-4">This will clear all localStorage, logging sessions, and reload the platform defaults. To proceed, please type <strong className="text-foreground">RESET</strong>.</p>

            <div className="space-y-1.5 mb-4">
              <Label htmlFor="reset-inp">Verification Code *</Label>
              <Input
                id="reset-inp"
                value={resetInput}
                onChange={e => setResetInput(e.target.value)}
                className="h-11 rounded-xl border-border bg-white"
                placeholder="RESET"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowResetModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-red-600 text-white hover:bg-red-700 px-5 border-none">
                Factory Reset
              </Button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
