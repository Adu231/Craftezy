import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[hsl(16,57%,40%)] via-[hsl(16,50%,35%)] to-[hsl(20,40%,28%)] rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-semibold">Start Your Creative Journey Today</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl text-white mb-6 leading-tight">
              Your Creative Business
              <span className="block text-[hsl(40,80%,75%)]">Starts Here</span>
            </h2>
            <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join 50,000+ artisans who turned their passion into profit on Craftezy. Free to start. Powerful to scale.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl h-12 px-8 font-semibold text-base group shadow-lg">
                  Start Selling Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={ROUTES.MARKETPLACE}>
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/15 rounded-xl h-12 px-8 font-semibold text-base">
                  Explore Crafts
                </Button>
              </Link>
            </div>
            <p className="text-white/50 text-sm mt-6">No credit card required. 14-day free trial on paid plans.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
