import DashboardLayout from '@/layouts/DashboardLayout';
import CourseCard from '@/components/features/CourseCard';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';
import { MOCK_COURSES } from '@/services/mockData';

export default function Courses() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your DIY learning content</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Create Course
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Published Courses', value: '3', color: 'text-primary bg-primary/10' },
          { label: 'Total Students', value: '4,430', color: 'text-secondary bg-secondary/10' },
          { label: 'Course Revenue', value: '$8,200', color: 'text-[hsl(35,70%,42%)] bg-accent/15' },
          { label: 'Avg Rating', value: '4.8★', color: 'text-primary bg-primary/10' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4">
            <div className={`text-2xl font-display font-bold ${s.color.split(' ')[0]}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {MOCK_COURSES.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_COURSES.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border border-border">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No courses yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Create your first DIY course and start teaching</p>
          <Button className="btn-primary rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Create Your First Course
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
