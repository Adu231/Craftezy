import { LayoutDashboard, Users, ShieldCheck, Package, ShoppingCart, Calendar, DollarSign, BarChart3, FileText, Settings } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: ROUTES.ADMIN_OVERVIEW },
  { label: 'Users', icon: Users, href: ROUTES.ADMIN_USERS, badge: '12' },
  { label: 'Seller Verification', icon: ShieldCheck, href: ROUTES.ADMIN_SELLERS, badge: '5' },
  { label: 'Products', icon: Package, href: ROUTES.ADMIN_PRODUCTS },
  { label: 'Orders', icon: ShoppingCart, href: ROUTES.ADMIN_ORDERS },
  { label: 'Workshops', icon: Calendar, href: ROUTES.ADMIN_WORKSHOPS, badge: '3' },
  { label: 'Revenue', icon: DollarSign, href: ROUTES.ADMIN_REVENUE },
  { label: 'Analytics', icon: BarChart3, href: ROUTES.ADMIN_ANALYTICS },
  { label: 'Content Moderation', icon: FileText, href: ROUTES.ADMIN_CONTENT, badge: '8' },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Admin Settings', icon: Settings, href: ROUTES.ADMIN_SETTINGS },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AdminSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Admin"
      roleColor="#dc2626"
    />
  );
}
