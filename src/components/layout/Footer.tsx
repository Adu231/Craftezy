import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (to: string) => {
    const targetPath = to.split('?')[0];
    if (location.pathname === targetPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-warm-brown text-white/80 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Panel */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">Craftezy</span>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed">
              Empowering creators and connecting buyers to unique, beautiful, handcrafted items from all over the world.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/marketplace" onClick={() => handleLinkClick('/marketplace')} className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/marketplace?category=Pottery%20%26%20Ceramics" onClick={() => handleLinkClick('/marketplace')} className="hover:text-primary transition-colors">Ceramics</Link></li>
              <li><Link to="/marketplace?category=Textile%20%26%20Fiber%20Arts" onClick={() => handleLinkClick('/marketplace')} className="hover:text-primary transition-colors">Fiber Arts</Link></li>
              <li><Link to="/marketplace?category=Woodworking" onClick={() => handleLinkClick('/marketplace')} className="hover:text-primary transition-colors">Woodworking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/learn" onClick={() => handleLinkClick('/learn')} className="hover:text-primary transition-colors">Online Courses</Link></li>
              <li><Link to="/workshops" onClick={() => handleLinkClick('/workshops')} className="hover:text-primary transition-colors">Live Workshops</Link></li>
              <li><Link to="/community" onClick={() => handleLinkClick('/community')} className="hover:text-primary transition-colors">Community Feed</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Get Started</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/register" onClick={() => handleLinkClick('/register')} className="hover:text-primary transition-colors">Sell on Craftezy</Link></li>
              <li><Link to="/login" onClick={() => handleLinkClick('/login')} className="hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link to="/register" onClick={() => handleLinkClick('/register')} className="hover:text-primary transition-colors">Join as Brand Partner</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Craftezy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-primary fill-current" /> for artisans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
