import { Users, Search, Star, Mail, BookOpen } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const STUDENTS = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', course: 'Beginner Macramé', progress: 100, joinedAt: '2026-03-01', rating: 5 },
  { id: 's2', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', course: 'Beginner Macramé', progress: 72, joinedAt: '2026-04-15', rating: null },
  { id: 's3', name: 'Carol Davis', email: 'carol@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', course: 'Natural Dye Workshop', progress: 45, joinedAt: '2026-05-10', rating: 4 },
  { id: 's4', name: 'David Lee', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', course: 'Beginner Macramé', progress: 20, joinedAt: '2026-06-01', rating: null },
  { id: 's5', name: 'Eve Martinez', email: 'eve@example.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', course: 'Natural Dye Workshop', progress: 100, joinedAt: '2026-02-20', rating: 5 },
];

export default function InstructorStudents() {
  const [search, setSearch] = useState('');
  const filtered = STUDENTS.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Students</h1>
          <p className="text-muted-foreground text-sm mt-1">{STUDENTS.length} enrolled students</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Students', value: STUDENTS.length, color: 'text-secondary' },
          { label: 'Completions', value: STUDENTS.filter(s => s.progress === 100).length, color: 'text-green-600' },
          { label: 'Reviews Given', value: STUDENTS.filter(s => s.rating).length, color: 'text-primary' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className={`font-display font-bold text-3xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">Student</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden md:table-cell">Course</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Progress</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden sm:table-cell">Rating</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(student => (
              <tr key={student.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8"><AvatarImage src={student.avatar} /><AvatarFallback>{student.name[0]}</AvatarFallback></Avatar>
                    <div>
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 hidden md:table-cell">
                  <span className="text-xs text-muted-foreground">{student.course}</span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${student.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-3 py-4 hidden sm:table-cell">
                  {student.rating ? (
                    <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-accent fill-current" /><span className="text-sm font-semibold">{student.rating}</span></div>
                  ) : <span className="text-xs text-muted-foreground">No review</span>}
                </td>
                <td className="px-3 py-4">
                  <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg gap-1" onClick={() => toast.info('Email coming soon')}>
                    <Mail className="w-3 h-3" /> Message
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InstructorLayout>
  );
}
