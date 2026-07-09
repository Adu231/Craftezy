import { LayoutDashboard, Megaphone, Handshake, Users, BarChart3, MessageSquare, User, Settings, HelpCircle, TrendingUp } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: ROUTES.BRAND_OVERVIEW },
  { label: 'Campaigns', icon: Megaphone, href: ROUTES.BRAND_CAMPAIGNS, badge: '2' },
  { label: 'Collaborations', icon: Handshake, href: ROUTES.BRAND_COLLABORATIONS },
  { label: 'Discover Creators', icon: Users, href: ROUTES.BRAND_CREATORS },
  { label: 'Analytics', icon: BarChart3, href: ROUTES.BRAND_ANALYTICS },
  { label: 'Performance', icon: TrendingUp, href: ROUTES.BRAND_ANALYTICS + '?tab=performance' },
  { label: 'Messages', icon: MessageSquare, href: ROUTES.BRAND_MESSAGES, badge: '6' },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Brand Profile', icon: User, href: ROUTES.BRAND_PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.BRAND_SETTINGS },
  { label: 'Help', icon: HelpCircle, href: ROUTES.BRAND_SETTINGS + '?tab=help' },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function BrandSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Brand Partner"
      roleColor="#db2777"
      upgradeHref={ROUTES.BRAND_CAMPAIGNS}
      upgradeLabel="Enterprise Plan"
      upgradeDesc="Unlimited campaigns + dedicated manager"
    />
  );
}
