import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Users, BookOpen, Award, ArrowLeft, Star, Clock, Shield, Check } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import CourseCard from '@/components/features/CourseCard';
import { MOCK_COURSES } from '@/services/mockData';
import { COURSE_CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function Learn() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || c.level === selectedLevel.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const selectedCourse = MOCK_COURSES.find(c => c.id === id);

  if (selectedCourse) {
    const relatedCourses = MOCK_COURSES.filter(c => c.category === selectedCourse.category && c.id !== selectedCourse.id).slice(0, 3);

    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/learn" className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Learn Academy
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-8 border border-border shadow-craft-sm mb-16">
              {/* Course Image */}
              <div>
                <div className="aspect-video rounded-2xl overflow-hidden bg-muted border border-border mb-6">
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3 mb-6">
                  <Badge className="bg-secondary/10 text-secondary border-none font-semibold text-xs px-2.5 py-1 hover:bg-secondary/20">
                    {selectedCourse.category}
                  </Badge>
                  <Badge className="bg-muted text-muted-foreground border-none font-semibold text-xs px-2.5 py-1 capitalize">
                    {selectedCourse.level}
                  </Badge>
                </div>

                <h3 className="font-semibold text-base text-foreground mb-3">About this Course:</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {selectedCourse.description}
                </p>

                {selectedCourse.skills && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-sm text-foreground mb-2.5">Skills you will master:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCourse.skills.map(s => (
                        <span key={s} className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full border border-border">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Course Pricing & Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
                    {selectedCourse.title}
                  </h1>

                  {/* Course Details Card */}
                  <div className="bg-muted/50 border border-border rounded-2xl p-6 space-y-4 mb-8">
                    <div className="flex items-center gap-3.5">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-semibold text-foreground">{selectedCourse.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Lessons</p>
                        <p className="text-sm font-semibold text-foreground">{selectedCourse.lessons} video lessons</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <Star className="w-5 h-5 text-mustard fill-current" />
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="text-sm font-semibold text-foreground">{selectedCourse.rating} stars</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <Users className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Enrolled Students</p>
                        <p className="text-sm font-semibold text-foreground">{selectedCourse.studentsCount.toLocaleString()} students</p>
                      </div>
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border mb-8">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img src={selectedCourse.instructor.avatar} alt={selectedCourse.instructor.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Taught by Master Artisan</p>
                      <h5 className="font-semibold text-sm text-foreground">{selectedCourse.instructor.name}</h5>
                      <p className="text-[10px] text-muted-foreground">{selectedCourse.instructor.storeName}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Price</span>
                    <span className="text-3xl font-bold text-foreground">
                      {selectedCourse.price === 0 ? 'Free' : `$${selectedCourse.price}`}
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error('Please sign in to enroll in this course');
                        navigate('/login');
                        return;
                      }
                      if (user?.role === 'learner' || user?.role === 'instructor') {
                        toast.success(`Enrolled in "${selectedCourse.title}" successfully! Check your Courses.`);
                        navigate('/dashboard/learner/courses');
                      } else {
                        toast.success(`Enrolled in "${selectedCourse.title}" successfully!`);
                        const dashboardRoute = getDashboardRoute(user!.role);
                        navigate(dashboardRoute);
                      }
                    }}
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-14 font-semibold text-base shadow-lg"
                  >
                    Enroll Now
                  </Button>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground justify-center py-2">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-secondary" /> Lifetime access & updates
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-secondary" /> Certificate of completion included
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-6">More courses in {selectedCourse.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedCourses.map(c => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-secondary/10 to-background py-16 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-1.5 mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-semibold text-secondary">DIY Learning Academy</span>
                </div>
                <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
                  Learn Every
                  <span className="text-secondary block">Creative Skill</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  From beginner macramé to advanced silversmithing. Learn directly from master artisans with step-by-step video courses.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: BookOpen, label: '500+ Courses', color: 'text-secondary' },
                    { icon: Users, label: '120K Students', color: 'text-primary' },
                    { icon: Award, label: 'Certificates', color: 'text-[hsl(35,75%,42%)]' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-border text-center">
                      <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                      <div className="text-xs font-semibold">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="max-w-md mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search courses, skills, techniques..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border bg-white sticky top-16 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 shrink-0">
                {LEVELS.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={cn(
                      'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                      selectedLevel === level ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="w-px h-6 bg-border shrink-0" />
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn('shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all', !selectedCategory ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground')}
                >
                  All
                </button>
                {COURSE_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={cn('shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all', selectedCategory === cat ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground')}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Featured */}
          {!searchQuery && !selectedCategory && selectedLevel === 'All Levels' && (
            <div className="mb-12">
              <h2 className="font-display font-bold text-2xl mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_COURSES.filter(c => c.isFeatured).map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl">
                {searchQuery || selectedCategory || selectedLevel !== 'All Levels' ? 'Search Results' : 'All Courses'}
              </h2>
              <span className="text-sm text-muted-foreground">{filteredCourses.length} courses</span>
            </div>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-semibold text-lg mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try different search terms or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
