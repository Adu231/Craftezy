import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Emma Hartwell',
    role: 'Ceramic Artist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    content: 'Craftezy completely transformed my ceramic business. The AI tools helper saved me hours of drafting descriptions, and hosting workshops was a breeze!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'James Rivera',
    role: 'Woodworking Craftsman',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    content: 'The custom ordering pipeline on Craftezy makes dealing with bespoke client orders extremely clean. My sales grew by 40% in just two months.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sarah Mitchell',
    role: 'Home Co. Brand Director',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face',
    content: 'Finding and partnering with talented makers on Craftezy for brand campaigns has been seamless. The creator community here is highly professional.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Testimonials</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Loved by Makers & <span className="text-gradient">Design Enthusiasts</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Don't just take our word for it. Read stories from creators and buyers who found a home on Craftezy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-muted/30 rounded-3xl p-8 border border-border/80 flex flex-col justify-between hover:shadow-craft-sm transition-all duration-300">
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1 text-mustard">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20" />

                {/* Content */}
                <p className="text-foreground/80 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-border/60">
                <Avatar className="w-10 h-10 rounded-xl">
                  <AvatarImage src={t.avatar} alt={t.name} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
