import { useState } from 'react';
import { Search, GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import CourseCard from '@/components/features/CourseCard';
import { MOCK_COURSES } from '@/services/mockData';
import { COURSE_CATEGORIES } from '@/constants';
import { cn } from '@/lib/utils';

const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function Learn() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || c.level === selectedLevel.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });

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
