import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, Users } from 'lucide-react';
import { Course } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  course: Course;
}

const LEVEL_COLORS = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export default function CourseCard({ course }: Props) {
  return (
    <Link to={`/learn/course/${course.id}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-craft-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {course.isFeatured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-white text-[10px] rounded-md">Featured</Badge>
            </div>
          )}
          <div className="absolute bottom-3 right-3">
            <Badge className={cn('text-[10px] rounded-md capitalize px-2 py-0.5', LEVEL_COLORS[course.level])}>
              {course.level}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-medium text-primary mb-1.5">{course.category}</p>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">by {course.instructor.name}</p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />{course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />{course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />{course.studentsCount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-accent fill-current" />
              <span className="text-xs font-semibold">{course.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              {course.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${course.originalPrice}</span>
              )}
              <span className="font-bold text-foreground text-sm">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
