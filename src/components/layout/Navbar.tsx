import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, Heart, Bell, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { ROUTES, NAV_LINKS, APP_NAME } from '@/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const dashboardRoute = user ? getDashboardRoute(user.role) : '/login';
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-sm'
        : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">{APP_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex w-9 h-9 rounded-lg hover:bg-muted">
              <Search className="w-4 h-4" />
            </Button>

            {isAuthenticated ? (
              <>
                <Link to={ROUTES.MARKETPLACE}>
                  <Button variant="ghost" size="icon" className="relative w-9 h-9 rounded-lg hover:bg-muted hidden md:flex">
                    <Heart className="w-4 h-4" />
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                        {wishlistCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link to={ROUTES.MARKETPLACE}>
                  <Button variant="ghost" size="icon" className="relative w-9 h-9 rounded-lg hover:bg-muted hidden md:flex">
                    <ShoppingBag className="w-4 h-4" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="relative w-9 h-9 rounded-lg hover:bg-muted hidden md:flex">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-muted transition-colors ml-1">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-craft-lg">
                    <div className="px-3 py-2">
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={dashboardRoute} className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={ROUTES.DASHBOARD_PROFILE} className="cursor-pointer">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={ROUTES.DASHBOARD_STORE} className="cursor-pointer">My Store</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={ROUTES.DASHBOARD_ORDERS} className="cursor-pointer">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={ROUTES.DASHBOARD_SETTINGS} className="cursor-pointer">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex rounded-lg font-medium"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="rounded-lg font-semibold btn-primary shadow-craft"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Start Selling
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md">
          <div className="container px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to={dashboardRoute}>
                    <Button className="w-full rounded-xl btn-primary">Go to Dashboard</Button>
                  </Link>
                  <Button variant="outline" className="w-full rounded-xl" onClick={logout}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="outline" className="w-full rounded-xl">Sign In</Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button className="w-full rounded-xl btn-primary">Start Selling Free</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
