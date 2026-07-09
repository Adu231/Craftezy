import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, Zap, CreditCard, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

  // Local storage state to persist upgraded pro status per role
  const [isUpgraded, setIsUpgraded] = useState(() => {
    return localStorage.getItem(`craftezy_upgraded_${roleLabel}`) === 'true';
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem(`craftezy_upgrade_dismissed_${roleLabel}`) === 'true';
  });

  const handleDismiss = () => {
    localStorage.setItem(`craftezy_upgrade_dismissed_${roleLabel}`, 'true');
    setIsDismissed(true);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const handleUpgradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      toast.error('Please enter all payment card details');
      return;
    }
    localStorage.setItem(`craftezy_upgraded_${roleLabel}`, 'true');
    setIsUpgraded(true);
    toast.success(`Welcome to ${roleLabel} Pro! Your account has been upgraded.`);
    setShowUpgradeModal(false);
  };

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
            <div className="flex items-center gap-1">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              {isUpgraded && <Zap className="w-3.5 h-3.5 text-yellow-500 fill-current" title="Pro Account" />}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white capitalize" style={{ backgroundColor: roleColor }}>
                {roleLabel} {isUpgraded && 'Pro'}
              </span>
              {user?.isVerified && (
                <div className="flex items-center gap-0.5 text-secondary">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
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
      {upgradeHref && !isUpgraded && !isDismissed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 relative">
            <button 
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-0.5 rounded-md hover:bg-black/5 transition-colors"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 mb-2 pr-6">
              <Zap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary">{upgradeLabel || 'Upgrade Plan'}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{upgradeDesc || '0% fees + unlimited AI'}</p>
            <button 
              onClick={() => setShowUpgradeModal(true)} 
              className="w-full text-xs font-semibold py-2 px-3 rounded-lg gradient-primary text-white hover:opacity-90 transition-opacity"
            >
              Upgrade Now
            </button>
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

      {/* Premium Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleUpgradeSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary fill-primary" /> Upgrade to {roleLabel} Pro
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Unlock professional tooling and premium platform capabilities</p>

            {/* Plan details */}
            <div className="bg-muted/50 border border-border rounded-2xl p-4 mb-4 text-xs space-y-2">
              <div className="flex justify-between font-bold text-sm text-foreground mb-1">
                <span>Pro Membership Plan</span>
                <span className="text-primary">$29.99/mo</span>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <p>✓ 0% platform transaction fees on custom orders & sales</p>
                <p>✓ Unlimited AI assistant prompt suggestions</p>
                <p>✓ Premium analytics and revenue telemetry</p>
                <p>✓ Direct priority support chat channels</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="upg-card-nr">Card Number *</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="upg-card-nr"
                    maxLength={19}
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                    className="h-11 pl-10 rounded-xl border-border bg-white text-foreground"
                    placeholder="4000 1234 5678 9010"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="upg-card-exp">Expiry Date *</Label>
                  <Input
                    id="upg-card-exp"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value.replace(/\D/g, '').replace(/(.{2})/g, '$1/').replace(/\/$/, ''))}
                    className="h-11 rounded-xl border-border bg-white text-foreground"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="upg-card-cvv">CVV *</Label>
                  <Input
                    id="upg-card-cvv"
                    type="password"
                    maxLength={3}
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                    className="h-11 rounded-xl border-border bg-white text-foreground"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowUpgradeModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Pay & Upgrade
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
