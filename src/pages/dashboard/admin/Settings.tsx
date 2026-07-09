import { useState } from 'react';
import { Shield, Bell, Database, Globe, Trash2, Save } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [platformName, setPlatformName] = useState('Craftezy');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [featureFlags, setFeatureFlags] = useState({ aiAssistant: true, workshops: true, suppliers: true, brandPartners: true, bulkOrders: false });

  return (
    <AdminLayout>
      <div className="mb-6"><h1 className="font-display font-bold text-2xl sm:text-3xl">Admin Settings</h1><p className="text-muted-foreground text-sm mt-1">Platform configuration and management</p></div>

      <div className="max-w-2xl space-y-6">
        {/* Platform Config */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-red-600" /></div><h3 className="font-semibold">Platform Configuration</h3></div>
          <div className="space-y-4">
            <div><Label>Platform Name</Label><Input value={platformName} onChange={e => setPlatformName(e.target.value)} className="mt-1.5 h-10 rounded-xl" /></div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Temporarily disable platform for updates</p></div>
              <button onClick={() => setMaintenanceMode(m => !m)} className={`w-11 h-6 rounded-full transition-colors relative ${maintenanceMode ? 'bg-red-500' : 'bg-muted'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${maintenanceMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.success('Settings saved!')}><Save className="w-4 h-4" /> Save Config</Button>
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
            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-100 rounded-xl justify-start"
              onClick={() => toast.error('Database purge requires multi-step confirmation')}>Purge Test Data</Button>
            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-100 rounded-xl justify-start"
              onClick={() => toast.info('Full platform reset disabled in demo')}>Reset Platform (DANGER)</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
