import { LayoutDashboard, Package, ShoppingCart, Layers, BarChart3, MessageSquare, User, Settings, HelpCircle, Truck } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: ROUTES.SUPPLIER_OVERVIEW },
  { label: 'Materials Catalog', icon: Package, href: ROUTES.SUPPLIER_MATERIALS },
  { label: 'Orders', icon: ShoppingCart, href: ROUTES.SUPPLIER_ORDERS, badge: '5' },
  { label: 'Inventory', icon: Layers, href: ROUTES.SUPPLIER_INVENTORY },
  { label: 'Dispatch', icon: Truck, href: ROUTES.SUPPLIER_ORDERS + '?tab=dispatch' },
  { label: 'Analytics', icon: BarChart3, href: ROUTES.SUPPLIER_ANALYTICS },
  { label: 'Messages', icon: MessageSquare, href: ROUTES.SUPPLIER_MESSAGES, badge: '3' },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Profile', icon: User, href: ROUTES.SUPPLIER_PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.SUPPLIER_SETTINGS },
  { label: 'Help', icon: HelpCircle, href: ROUTES.SUPPLIER_SETTINGS + '?tab=help' },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function SupplierSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Supplier"
      roleColor="#d97706"
      upgradeHref={ROUTES.SUPPLIER_ANALYTICS}
      upgradeLabel="Supplier Pro"
      upgradeDesc="Bulk listings + API integration"
    />
  );
}
