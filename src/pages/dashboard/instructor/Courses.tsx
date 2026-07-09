import { Plus, BookOpen, Users, Star, Edit2, Trash2 } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { MOCK_COURSES } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

const LEVEL_COLORS = { beginner: 'bg-green-100 text-green-800', intermediate: 'bg-yellow-100 text-yellow-800', advanced: 'bg-red-100 text-red-800' };
const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

interface InstructorCourse {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  studentsCount: number;
  rating: number;
  price: number;
  thumbnail: string;
  duration: string;
  lessons: number;
  category: string;
  instructor: { name: string };
}

export default function InstructorCourses() {
  const [courses, setCourses] = useState<InstructorCourse[]>(
    MOCK_COURSES.slice(0, 3) as InstructorCourse[]
  );

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<InstructorCourse | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [lessons, setLessons] = useState('');
  const [category, setCategory] = useState('Macramé');

  const handleOpenAdd = () => {
    setTitle('');
    setLevel('beginner');
    setPrice('');
    setDuration('');
    setLessons('');
    setCategory('Macramé');
    setShowAddModal(true);
  };

  const handleOpenEdit = (course: InstructorCourse) => {
    setSelectedCourse(course);
    setTitle(course.title);
    setLevel(course.level);
    setPrice(course.price.toString());
    setDuration(course.duration);
    setLessons(course.lessons.toString());
    setCategory(course.category);
    setShowEditModal(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !duration || !lessons) {
      toast.error('Please enter all required fields');
      return;
    }
    const newCourse: InstructorCourse = {
      id: `course_${Date.now()}`,
      title,
      level,
      price: parseFloat(price),
      duration,
      lessons: parseInt(lessons),
      category,
      studentsCount: 0,
      rating: 5.0,
      instructor: { name: 'Instructor' },
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop'
    };
    setCourses(prev => [...prev, newCourse]);
    toast.success('New course created and published!');
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !title || !price || !duration || !lessons) {
      toast.error('Please enter all required fields');
      return;
    }
    setCourses(prev => prev.map(c => c.id === selectedCourse.id ? {
      ...c,
      title,
      level,
      price: parseFloat(price),
      duration,
      lessons: parseInt(lessons),
      category
    } : c));
    toast.success('Course details updated successfully!');
    setShowEditModal(false);
  };

  return (
    <InstructorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">{courses.length} published courses</p>
        </div>
        <Button className="btn-primary rounded-xl gap-2" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4" /> Create Course
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: courses.reduce((a,c) => a + c.studentsCount, 0).toLocaleString(), icon: Users },
          { label: 'Avg Completion', value: '78%', icon: BookOpen },
          { label: 'Avg Rating', value: '4.9★', icon: Star },
          { label: 'Course Revenue', value: `$${(courses.reduce((a,c) => a + (c.studentsCount * c.price), 0) * 0.9).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: Plus },
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
                <Button variant="outline" className="flex-1 rounded-xl h-8 text-xs gap-1 font-semibold" onClick={() => handleOpenEdit(course)}>
                  <Edit2 className="w-3 h-3" /> Edit
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-xl text-red-400 hover:bg-red-50"
                  onClick={() => { setCourses(prev => prev.filter(c => c.id !== course.id)); toast.success('Course removed'); }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Card */}
        <button onClick={handleOpenAdd}
          className="bg-card rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 p-8 text-muted-foreground hover:text-primary min-h-[260px]">
          <div className="w-12 h-12 rounded-xl border-2 border-current flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm">Create New Course</p>
            <p className="text-xs mt-1">Share your expertise</p>
          </div>
        </button>
      </div>

      {/* Create Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Create Course</h3>
            <p className="text-xs text-muted-foreground mb-4">Publish a new learning module online</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="c-title">Course Title *</Label>
                <Input id="c-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Intermediate Pottery throwing" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="c-price">Price ($) *</Label>
                  <Input id="c-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="59.99" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-level">Level</Label>
                  <select id="c-level" value={level} onChange={e => setLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {LEVELS.map(l => (
                      <option key={l} value={l} className="capitalize">{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="c-dur">Duration *</Label>
                  <Input id="c-dur" value={duration} onChange={e => setDuration(e.target.value)} placeholder="2h 45m" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-less">Lessons Count *</Label>
                  <Input id="c-less" type="number" value={lessons} onChange={e => setLessons(e.target.value)} placeholder="12" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-cat">Category</Label>
                <Input id="c-cat" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ceramics" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Publish Course
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Course Details</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify the published details of your course curriculum</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="e-title">Course Title *</Label>
                <Input id="e-title" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="e-price">Price ($) *</Label>
                  <Input id="e-price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-level">Level</Label>
                  <select id="e-level" value={level} onChange={e => setLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    {LEVELS.map(l => (
                      <option key={l} value={l} className="capitalize">{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="e-dur">Duration *</Label>
                  <Input id="e-dur" value={duration} onChange={e => setDuration(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="e-less">Lessons Count *</Label>
                  <Input id="e-less" type="number" value={lessons} onChange={e => setLessons(e.target.value)} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="e-cat">Category</Label>
                <Input id="e-cat" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </InstructorLayout>
  );
}
