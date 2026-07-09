import { Play, Clock, BookOpen, Star, Search } from 'lucide-react';
import LearnerLayout from '@/layouts/role/LearnerLayout';
import { MOCK_COURSES } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const ENROLLED = MOCK_COURSES.slice(0, 3).map((c, i) => ({ ...c, progress: [35, 72, 100][i] }));
const AVAILABLE = MOCK_COURSES.slice(3);

export default function LearnerCourses() {
  const [tab, setTab] = useState<'enrolled' | 'browse'>('enrolled');
  const [search, setSearch] = useState('');

  return (
    <LearnerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">Your learning library</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['enrolled', 'browse'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {t === 'enrolled' ? `Enrolled (${ENROLLED.length})` : 'Browse More'}
          </button>
        ))}
      </div>

      {tab === 'enrolled' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENROLLED.map(course => (
            <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-craft-lg transition-all hover:-translate-y-1">
              <div className="relative aspect-video">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                {course.progress === 100 && <Badge className="absolute top-3 right-3 bg-green-500 text-white text-[10px]">Completed</Badge>}
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm line-clamp-2 mb-1">{course.title}</p>
                <p className="text-xs text-muted-foreground mb-3">by {course.instructor.name}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} lessons</span>
                </div>
                <Button className={`w-full rounded-xl text-xs ${course.progress === 100 ? 'btn-secondary' : 'btn-primary'}`}>
                  {course.progress === 100 ? '🎓 Get Certificate' : '▶ Continue'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="relative mb-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AVAILABLE.filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase())).map(course => (
              <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-craft-lg transition-all hover:-translate-y-1">
                <div className="relative aspect-video">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <Badge className="absolute bottom-3 right-3 bg-white text-foreground text-[10px] capitalize">{course.level}</Badge>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm line-clamp-2 mb-1">{course.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">by {course.instructor.name}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 text-accent fill-current" />
                    <span className="text-xs font-semibold">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.studentsCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                    <Button size="sm" className="btn-primary rounded-xl text-xs" onClick={() => toast.success(`Enrolled in "${course.title}"!`)}>Enroll</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </LearnerLayout>
  );
}
