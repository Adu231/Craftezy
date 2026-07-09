import { Award, Download, Plus, Users, Search } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';

const ISSUED_CERTS = [
  { id: 'c1', studentName: 'Alice Johnson', studentEmail: 'alice@example.com', course: 'Beginner Macramé', issuedAt: '2026-06-15', credentialId: 'CRAFT-2026-001' },
  { id: 'c2', studentName: 'Eve Martinez', studentEmail: 'eve@example.com', course: 'Natural Dye Workshop', issuedAt: '2026-07-01', credentialId: 'CRAFT-2026-002' },
];

export default function InstructorCertificates() {
  const [search, setSearch] = useState('');
  const filtered = ISSUED_CERTS.filter(c => !search || c.studentName.toLowerCase().includes(search.toLowerCase()));

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Certificates</h1>
          <p className="text-muted-foreground text-sm mt-1">{ISSUED_CERTS.length} certificates issued</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Manual certificate coming soon')}>
          <Plus className="w-4 h-4" /> Issue Certificate
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Issued', value: ISSUED_CERTS.length, color: 'text-secondary' },
          { label: 'This Month', value: '1', color: 'text-primary' },
          { label: 'Eligible Students', value: '3', color: 'text-green-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className={`font-display font-bold text-3xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="space-y-3">
        {filtered.map(cert => (
          <div key={cert.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{cert.studentName}</h3>
              <p className="text-xs text-muted-foreground">{cert.studentEmail}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>{cert.course}</span>
                <span>·</span>
                <span>ID: {cert.credentialId}</span>
                <span>·</span>
                <span>Issued: {new Date(cert.issuedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl gap-2 shrink-0" onClick={() => toast.info('Download coming soon')}>
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        ))}
      </div>
    </InstructorLayout>
  );
}
