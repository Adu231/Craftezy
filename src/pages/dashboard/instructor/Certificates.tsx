import { Award, Download, Plus, Search } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

interface IssuedCert {
  id: string;
  studentName: string;
  studentEmail: string;
  course: string;
  issuedAt: string;
  credentialId: string;
}

const INITIAL_CERTS: IssuedCert[] = [
  { id: 'c1', studentName: 'Alice Johnson', studentEmail: 'alice@example.com', course: 'Beginner Macramé', issuedAt: '2026-06-15', credentialId: 'CRAFT-2026-001' },
  { id: 'c2', studentName: 'Eve Martinez', studentEmail: 'eve@example.com', course: 'Natural Dye Workshop', issuedAt: '2026-07-01', credentialId: 'CRAFT-2026-002' },
];

const COURSES = ['Beginner Macramé', 'Natural Dye Workshop', 'Clay Centering Basics', 'Embroidery Patterns'];

export default function InstructorCertificates() {
  const [certs, setCerts] = useState<IssuedCert[]>(INITIAL_CERTS);
  const [search, setSearch] = useState('');
  
  // Issue Modal State
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);

  const handleDownload = (certId: string) => {
    toast.success('Starting certificate download...');
    const link = document.createElement('a');
    link.href = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800';
    link.download = `Certificate_${certId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim()) {
      toast.error('Please enter student name and email');
      return;
    }
    const newCert: IssuedCert = {
      id: `c_${Date.now()}`,
      studentName,
      studentEmail,
      course: selectedCourse,
      issuedAt: new Date().toISOString().split('T')[0],
      credentialId: `CRAFT-2026-${Math.floor(Math.random() * 900) + 100}`
    };
    setCerts(prev => [newCert, ...prev]);
    toast.success(`Certificate issued successfully to ${studentName}!`);
    setShowIssueModal(false);
    setStudentName('');
    setStudentEmail('');
  };

  const filtered = certs.filter(c => 
    c.studentName.toLowerCase().includes(search.toLowerCase()) ||
    c.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Certificates</h1>
          <p className="text-muted-foreground text-sm mt-1">{certs.length} certificates issued</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => setShowIssueModal(true)}>
          <Plus className="w-4 h-4" /> Issue Certificate
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Issued', value: certs.length, color: 'text-secondary' },
          { label: 'This Month', value: certs.filter(c => c.issuedAt.startsWith('2026-07')).length.toString(), color: 'text-primary' },
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
        <input type="text" placeholder="Search student or course..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="space-y-3">
        {filtered.map(cert => (
          <div key={cert.id} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 hover:shadow-craft transition-all duration-300">
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
            <Button variant="outline" className="rounded-xl gap-2 shrink-0 h-9" onClick={() => handleDownload(cert.id)}>
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-xs text-muted-foreground py-8">No certificates found</p>
        )}
      </div>

      {/* Issue Certificate Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleIssueSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Issue Certificate</h3>
            <p className="text-xs text-muted-foreground mb-4">Manually certify a student's completion credentials</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="stud-name">Student Full Name *</Label>
                <Input
                  id="stud-name"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                  placeholder="Alice Johnson"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stud-email">Student Email Address *</Label>
                <Input
                  id="stud-email"
                  type="email"
                  value={studentEmail}
                  onChange={e => setStudentEmail(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                  placeholder="alice@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="course-select">Certified Course</Label>
                <select
                  id="course-select"
                  value={selectedCourse}
                  onChange={e => setSelectedCourse(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {COURSES.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowIssueModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Issue Certificate
              </Button>
            </div>
          </form>
        </div>
      )}
    </InstructorLayout>
  );
}
