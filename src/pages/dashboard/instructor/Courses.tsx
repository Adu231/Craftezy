import { Plus, BookOpen, Users, Star, Edit2, Trash2 } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { MOCK_COURSES } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

const LEVEL_COLORS = { beginner: 'bg-green-100 text-green-800', intermediate: 'bg-yellow-100 text-yellow-800', advanced: 'bg-red-100 text-red-800' };

export default function InstructorCourses() {
  const [courses, setCourses] = useState(MOCK_COURSES.slice(0, 3));
  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">{courses.length} published courses</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={() => toast.info('Course builder coming soon')}>
          <Plus className="w-4 h-4" /> Create Course
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: '4,430', icon: Users },
          { label: 'Avg Completion', value: '78%', icon: BookOpen },
          { label: 'Avg Rating', value: '4.9★', icon: Star },
          { label: 'Course Revenue', value: '$8,200', icon: Plus },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="font-display font-bold text-xl text-primary">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(course => (
          <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-craft-lg transition-all">
            <div className="relative aspect-video">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <Badge className={`absolute bottom-3 left-3 text-[10px] capitalize ${LEVEL_COLORS[course.level]}`}>{course.level}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm line-clamp-2 mb-2">{course.title}</h3>
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div><div className="font-bold text-sm">{course.studentsCount.toLocaleString()}</div><div className="text-[10px] text-muted-foreground">Students</div></div>
                <div><div className="font-bold text-sm">{course.rating}★</div><div className="text-[10px] text-muted-foreground">Rating</div></div>
                <div><div className="font-bold text-sm">${course.price}</div><div className="text-[10px] text-muted-foreground">Price</div></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-xl h-8 text-xs gap-1" onClick={() => toast.info('Edit course coming soon')}>
                  <Edit2 className="w-3 h-3" /> Edit
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl text-red-400"
                  onClick={() => { setCourses(prev => prev.filter(c => c.id !== course.id)); toast.success('Course removed'); }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {/* Add New Card */}
        <button onClick={() => toast.info('Course builder coming soon')}
          className="bg-card rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 p-8 text-muted-foreground hover:text-primary min-h-[280px]">
          <div className="w-12 h-12 rounded-xl border-2 border-current flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm">Create New Course</p>
            <p className="text-xs mt-1">Share your expertise</p>
          </div>
        </button>
      </div>
    </InstructorLayout>
  );
}
