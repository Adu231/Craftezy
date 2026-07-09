import { ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import heroImg from '@/assets/hero-crafts.jpg';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  useScrollToTop();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD_OVERVIEW} replace />;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={heroImg} alt="Craftezy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(16,57%,30%)]/80 via-[hsl(20,40%,20%)]/70 to-[hsl(125,45%,20%)]/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl">Craftezy</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight mb-4">
              Where Every Craft Tells a Story
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Join 50,000+ artisans building thriving creative businesses on the world's most inspiring handmade marketplace.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: 'Artisans', value: '50K+' },
                { label: 'Products', value: '2M+' },
                { label: 'Countries', value: '85+' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="font-display font-bold text-2xl">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl">Craftezy</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
