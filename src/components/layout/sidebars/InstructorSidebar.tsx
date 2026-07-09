import { LayoutDashboard, BookOpen, Calendar, Users, DollarSign, Award, BarChart3, MessageSquare, User, Settings, HelpCircle } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: ROUTES.INSTRUCTOR_OVERVIEW },
  { label: 'My Courses', icon: BookOpen, href: ROUTES.INSTRUCTOR_COURSES },
  { label: 'Workshops', icon: Calendar, href: ROUTES.INSTRUCTOR_WORKSHOPS, badge: '2' },
  { label: 'Students', icon: Users, href: ROUTES.INSTRUCTOR_STUDENTS },
  { label: 'Earnings', icon: DollarSign, href: ROUTES.INSTRUCTOR_EARNINGS },
  { label: 'Certificates', icon: Award, href: ROUTES.INSTRUCTOR_CERTIFICATES },
  { label: 'Analytics', icon: BarChart3, href: ROUTES.INSTRUCTOR_ANALYTICS },
  { label: 'Messages', icon: MessageSquare, href: ROUTES.INSTRUCTOR_MESSAGES, badge: '4' },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Profile', icon: User, href: ROUTES.INSTRUCTOR_PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.INSTRUCTOR_SETTINGS },
  { label: 'Help', icon: HelpCircle, href: ROUTES.INSTRUCTOR_SETTINGS + '?tab=help' },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function InstructorSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Instructor"
      roleColor="#2E7D32"
      upgradeHref={ROUTES.INSTRUCTOR_EARNINGS}
      upgradeLabel="Upgrade to Pro"
      upgradeDesc="Unlimited courses + advanced analytics"
    />
  );
}
