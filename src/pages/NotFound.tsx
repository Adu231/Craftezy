import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { ROUTES } from '@/constants';

export default function NotFound() {
  return (
    <MainLayout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-cream to-white px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Decorative Icon */}
          <div className="relative mb-8 inline-flex items-center justify-center p-6 bg-terracotta-light rounded-full text-terracotta animate-pulse">
            <Compass className="w-16 h-16" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-mustard rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
              !
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold text-7xl text-terracotta mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-warm-brown mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES?.INDEX || "/"}>
              <Button size="lg" className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/90 text-white rounded-xl px-6 py-3 font-semibold shadow-md flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to={ROUTES?.MARKETPLACE || "/marketplace"}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-terracotta text-terracotta hover:bg-terracotta-light rounded-xl px-6 py-3 font-semibold">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
