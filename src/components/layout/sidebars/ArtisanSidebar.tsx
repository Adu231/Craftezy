import { LayoutDashboard, Store, Package, ShoppingCart, BarChart3, MessageSquare, DollarSign, Sparkles, User, Settings, HelpCircle, ClipboardList } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: ROUTES.ARTISAN_OVERVIEW },
  { label: 'My Store', icon: Store, href: ROUTES.ARTISAN_STORE },
  { label: 'Products', icon: Package, href: ROUTES.ARTISAN_PRODUCTS },
  { label: 'Orders', icon: ShoppingCart, href: ROUTES.ARTISAN_ORDERS, badge: '3' },
  { label: 'Custom Orders', icon: ClipboardList, href: ROUTES.ARTISAN_CUSTOM_ORDERS, badge: '1' },
  { label: 'Analytics', icon: BarChart3, href: ROUTES.ARTISAN_ANALYTICS },
  { label: 'Messages', icon: MessageSquare, href: ROUTES.ARTISAN_MESSAGES, badge: '2' },
  { label: 'Earnings', icon: DollarSign, href: ROUTES.ARTISAN_EARNINGS },
  { label: 'AI Assistant', icon: Sparkles, href: ROUTES.ARTISAN_AI_ASSISTANT, special: true },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Profile', icon: User, href: ROUTES.ARTISAN_PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.ARTISAN_SETTINGS },
  { label: 'Help', icon: HelpCircle, href: ROUTES.ARTISAN_SETTINGS + '?tab=help' },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function ArtisanSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Artisan"
      roleColor="#C65D3B"
      upgradeHref={ROUTES.ARTISAN_EARNINGS}
      upgradeLabel="Upgrade to Studio"
      upgradeDesc="0% fees + unlimited AI + team access"
    />
  );
}
