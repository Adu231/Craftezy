import DashboardLayout from '@/layouts/DashboardLayout';
import WorkshopCard from '@/components/features/WorkshopCard';
import { Button } from '@/components/ui/button';
import { Plus, Calendar } from 'lucide-react';
import { MOCK_WORKSHOPS } from '@/services/mockData';

export default function WorkshopsDashboard() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Workshops</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your live and in-person workshops</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Create Workshop
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Workshops', value: '2' },
          { label: 'Total Registrations', value: '45' },
          { label: 'Workshop Revenue', value: '$3,600' },
          { label: 'Certificates Issued', value: '38' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4">
            <div className="font-display font-bold text-2xl text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {MOCK_WORKSHOPS.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_WORKSHOPS.map(w => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No workshops yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Host your first workshop and share your craft expertise</p>
          <Button className="btn-primary rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Create Your First Workshop
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
