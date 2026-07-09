import { ReactNode, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, LogOut } from 'lucide-react';
import { useAuth, getDashboardRoute } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { ROUTES } from '@/constants';

interface Props {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function RoleDashboardLayout({ children, sidebar }: Props) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useScrollToTop();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl gradient-primary animate-pulse" />
          <p className="text-muted-foreground text-sm">Loading Craftezy...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleSwitchDashboard = () => {
    if (user) navigate(getDashboardRoute(user.role));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar with mobile support */}
      {sidebar}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center gap-3 px-4 lg:px-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-9 h-9 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative w-9 h-9 rounded-lg">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <button onClick={handleSwitchDashboard}>
                <Avatar className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xs bg-primary text-white">{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-muted-foreground" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
