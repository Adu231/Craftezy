import { useState } from 'react';
import { ShoppingBag, Heart, Star, Home, User, Settings, HelpCircle, Package, MapPin } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: Home, href: ROUTES.CUSTOMER_OVERVIEW },
  { label: 'My Orders', icon: ShoppingBag, href: ROUTES.CUSTOMER_ORDERS, badge: '2' },
  { label: 'Wishlist', icon: Heart, href: ROUTES.CUSTOMER_WISHLIST },
  { label: 'My Reviews', icon: Star, href: ROUTES.CUSTOMER_REVIEWS },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Profile', icon: User, href: ROUTES.CUSTOMER_PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.CUSTOMER_SETTINGS },
  { label: 'Help', icon: HelpCircle, href: ROUTES.CUSTOMER_SETTINGS + '?tab=help' },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function CustomerSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Customer"
      roleColor="#3b82f6"
    />
  );
}
