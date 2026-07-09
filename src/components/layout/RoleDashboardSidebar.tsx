import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  special?: boolean;
}

interface Props {
  navItems: NavItem[];
  bottomItems: NavItem[];
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  roleLabel: string;
  roleColor: string;
  upgradeHref?: string;
  upgradeLabel?: string;
  upgradeDesc?: string;
}

export default function RoleDashboardSidebar({
  navItems, bottomItems, isMobileOpen, onMobileClose,
  roleLabel, roleColor, upgradeHref, upgradeLabel, upgradeDesc
}: Props) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg">Craftezy</span>
        </Link>
        {onMobileClose && (
          <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg hover:bg-sidebar-accent">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role Badge + User */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-sm font-semibold" style={{ backgroundColor: roleColor, color: 'white' }}>
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm truncate">{user?.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white capitalize" style={{ backgroundColor: roleColor }}>
                {roleLabel}
              </span>
              {user?.isVerified && (
                <div className="flex items-center gap-0.5 text-secondary">
                  <Zap className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-semibold">Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 pt-2 pb-1.5">
          Main
        </p>
        {navItems.map(item => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onMobileClose}
            className={cn(
              'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
              isActive(item.href)
                ? 'bg-primary text-primary-foreground shadow-craft'
                : item.special
                  ? 'text-primary hover:bg-primary/10'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn(
                'w-4 h-4',
                isActive(item.href) ? '' : item.special ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )} />
              {item.label}
            </div>
            {item.badge && !isActive(item.href) && (
              <Badge className="h-4 px-1.5 text-[10px] bg-primary text-white rounded-full">{item.badge}</Badge>
            )}
            {item.special && !isActive(item.href) && (
              <Badge className="ml-auto h-4 px-1.5 text-[10px] bg-primary/10 text-primary rounded-full">AI</Badge>
            )}
          </Link>
        ))}

        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 pt-4 pb-1.5">
          Account
        </p>
        {bottomItems.map(item => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onMobileClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
              isActive(item.href)
                ? 'bg-primary text-primary-foreground shadow-craft'
                : 'text-sidebar-foreground hover:bg-sidebar-accent'
            )}
          >
            <item.icon className={cn('w-4 h-4', isActive(item.href) ? '' : 'text-muted-foreground group-hover:text-foreground')} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Upgrade CTA */}
      {upgradeHref && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">{upgradeLabel || 'Upgrade Plan'}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{upgradeDesc || '0% fees + unlimited AI'}</p>
            <Link to={upgradeHref}>
              <button className="w-full text-xs font-semibold py-2 px-3 rounded-lg gradient-primary text-white hover:opacity-90 transition-opacity">
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative w-72 h-full bg-sidebar border-r border-sidebar-border shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
