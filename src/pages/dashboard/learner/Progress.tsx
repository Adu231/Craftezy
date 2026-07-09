import { useState } from 'react';
import LearnerLayout from '@/layouts/role/LearnerLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_COURSES } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Play, CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface EnrolledCourse {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  progress: number;
  lastLesson: string;
  instructor: { name: string };
}

const INITIAL_ENROLLED: EnrolledCourse[] = MOCK_COURSES.slice(0, 3).map((c, i) => ({
  ...c, progress: [35, 72, 100][i], lastLesson: ['Knot techniques', 'Centering clay', 'Final polish'][i]
}));

export default function LearnerProgress() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<EnrolledCourse[]>(INITIAL_ENROLLED);

  // Player modal state
  const [playerCourse, setPlayerCourse] = useState<EnrolledCourse | null>(null);
  const [completedChapters, setCompletedChapters] = useState<string[]>(['Introduction', 'Chapter 1']);

  const CHAPTERS = [
    { name: 'Introduction', duration: '12m' },
    { name: 'Chapter 1: Foundations & Preparation', duration: '45m' },
    { name: 'Chapter 2: Master Techniques', duration: '1h 15m' },
    { name: 'Chapter 3: Final Touches & Preservation', duration: '30m' },
  ];

  const handleToggleChapter = (chapterName: string) => {
    if (!playerCourse) return;

    let updatedChapters = [...completedChapters];
    if (updatedChapters.includes(chapterName)) {
      updatedChapters = updatedChapters.filter(c => c !== chapterName);
    } else {
      updatedChapters.push(chapterName);
    }
    setCompletedChapters(updatedChapters);

    // Calculate new progress based on checkboxes checked (4 chapters total)
    const newProgress = Math.round((updatedChapters.length / CHAPTERS.length) * 100);
    
    // Update courses list progress
    setCourses(prev => prev.map(c => c.id === playerCourse.id ? { 
      ...c, 
      progress: newProgress,
      lastLesson: chapterName
    } : c));

    // Update locally selected modal course copy
    setPlayerCourse(prev => prev ? { ...prev, progress: newProgress, lastLesson: chapterName } : null);

    if (newProgress === 100) {
      toast.success('Congratulations! You completed this course. Your certificate is ready!');
    }
  };

  const handleOpenPlayer = (course: EnrolledCourse) => {
    setPlayerCourse(course);
    // Preset completed chapters based on progress
    if (course.progress >= 100) {
      setCompletedChapters(CHAPTERS.map(c => c.name));
    } else if (course.progress >= 70) {
      setCompletedChapters(['Introduction', 'Chapter 1', 'Chapter 2']);
    } else if (course.progress >= 30) {
      setCompletedChapters(['Introduction', 'Chapter 1']);
    } else {
      setCompletedChapters(['Introduction']);
    }
  };

  return (
    <LearnerLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Learning Progress</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your course completions and certificate statuses</p>
      </div>

      <div className="space-y-6">
        {courses.map(course => (
          <div key={course.id} className="bg-card rounded-2xl border border-border p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-craft-sm transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-muted shrink-0">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              {course.progress === 100 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 text-white text-[10px]">Completed</Badge>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 w-full space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className="bg-primary/10 text-primary border-none text-[10px] px-2 py-0.5 font-bold uppercase rounded mb-1">
                    {course.category}
                  </Badge>
                  <h3 className="font-semibold text-lg leading-snug text-foreground">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">by {course.instructor.name}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> Progress: {course.progress}%
                  </span>
                  <span className="font-semibold text-primary">{course.progress === 100 ? 'Course Completed!' : `Last lesson: ${course.lastLesson}`}</span>
                </div>
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
              {course.progress === 100 ? (
                <Button
                  onClick={() => navigate('/dashboard/learner/certificates')}
                  className="w-full md:w-40 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-semibold"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Certificate
                </Button>
              ) : (
                <Button
                  onClick={() => handleOpenPlayer(course)}
                  className="w-full md:w-40 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold"
                >
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Resume Class
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Course Player Modal */}
      {playerCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl overflow-hidden border border-border shadow-craft-lg relative w-full max-w-4xl flex flex-col md:flex-row h-[85vh] animate-in zoom-in duration-200">
            
            {/* Left side: Course Player Viewport */}
            <div className="flex-1 bg-neutral-900 flex flex-col relative text-white justify-between p-6">
              <div className="flex items-center justify-between">
                <Badge className="bg-primary text-white border-none">{playerCourse.category}</Badge>
                <div className="text-xs text-neutral-400">Class Video Player</div>
              </div>

              {/* Video Mock Frame */}
              <div className="flex flex-col items-center justify-center text-center my-auto py-12 relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/15 opacity-80" />
                <PlayCircle className="w-16 h-16 text-primary mb-3 drop-shadow relative animate-pulse cursor-pointer" />
                <h4 className="font-semibold text-lg relative text-white px-6 leading-tight">{playerCourse.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 relative">Now playing: {playerCourse.lastLesson}</p>
              </div>

              <div className="text-xs text-neutral-400 flex justify-between items-center border-t border-neutral-800/80 pt-3">
                <span>Instructor: {playerCourse.instructor.name}</span>
                <span className="font-medium text-primary">Progress: {playerCourse.progress}%</span>
              </div>
            </div>

            {/* Right side: Syllabus Checklist */}
            <div className="w-full md:w-80 bg-white border-l border-border flex flex-col h-full shrink-0">
              <div className="p-4 border-b border-border">
                <h4 className="font-display font-bold text-base text-foreground">Course Syllabus</h4>
                <p className="text-[10px] text-muted-foreground">Check completed items to update progress</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {CHAPTERS.map((ch, idx) => {
                  const isCompleted = completedChapters.includes(ch.name);
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleToggleChapter(ch.name)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isCompleted 
                          ? 'border-primary/20 bg-primary/5 text-primary' 
                          : 'border-border hover:bg-muted/30 text-muted-foreground'
                      }`}
                    >
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${isCompleted ? 'text-primary fill-primary/10' : 'text-muted-foreground/40'}`} />
                      <div className="min-w-0">
                        <p className={`text-xs font-semibold leading-tight ${isCompleted ? 'text-primary' : 'text-foreground'}`}>{ch.name}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">{ch.duration}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-border flex justify-end gap-2 bg-muted/20">
                <Button variant="ghost" onClick={() => setPlayerCourse(null)} className="rounded-xl h-10 text-xs">
                  Exit Class
                </Button>
                {playerCourse.progress === 100 && (
                  <Button 
                    onClick={() => {
                      setPlayerCourse(null);
                      navigate('/dashboard/learner/certificates');
                    }}
                    className="rounded-xl bg-secondary text-white hover:bg-secondary/90 h-10 text-xs"
                  >
                    Get Certificate
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </LearnerLayout>
  );
}
