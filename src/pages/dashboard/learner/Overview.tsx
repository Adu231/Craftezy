import { BookOpen, TrendingUp, Award, Calendar, Play, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearnerLayout from '@/layouts/role/LearnerLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_COURSES } from '@/services/mockData';
import { ROUTES } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ENROLLED = MOCK_COURSES.slice(0, 3).map((c, i) => ({
  ...c, progress: [35, 72, 100][i], lastLesson: ['Knot techniques', 'Centering clay', 'Final polish'][i]
}));

export default function LearnerOverview() {
  const { user } = useAuth();

  return (
    <LearnerLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Welcome back, {user?.name?.split(' ')[0]}! 📚</h1>
        <p className="text-muted-foreground text-sm mt-1">Continue your creative learning journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Enrolled Courses', value: '3', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
          { label: 'Hours Learned', value: '24h', icon: Clock, color: 'text-blue-600 bg-blue-50' },
          { label: 'Certificates Earned', value: '1', icon: Award, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Completion Rate', value: '72%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-lg">Continue Learning</h2>
          <Link to={ROUTES.LEARNER_COURSES} className="text-sm text-primary hover:underline flex items-center gap-1">
            All courses <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENROLLED.map(course => (
            <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-craft-lg transition-all hover:-translate-y-1 duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary fill-primary ml-1" />
                  </div>
                </div>
                {course.progress === 100 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white text-[10px]">✓ Completed</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-medium text-sm line-clamp-2 mb-2">{course.title}</p>
                <p className="text-xs text-muted-foreground mb-3">Last: {course.lastLesson}</p>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <Button size="sm" className={`w-full rounded-xl text-xs ${course.progress === 100 ? 'btn-secondary' : 'btn-primary'}`}>
                  {course.progress === 100 ? '🎓 Get Certificate' : '▶ Continue'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/20 p-6">
        <h3 className="font-semibold mb-1">Recommended For You</h3>
        <p className="text-xs text-muted-foreground mb-4">Based on your interests in macramé and ceramics</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {MOCK_COURSES.slice(3, 5).map(c => (
            <div key={c.id} className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{c.title}</p>
                <p className="text-xs text-primary font-bold">{c.price === 0 ? 'Free' : `$${c.price}`}</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-lg text-xs h-8 shrink-0">Enroll</Button>
            </div>
          ))}
        </div>
      </div>
    </LearnerLayout>
  );
}
