import { LayoutDashboard, BookOpen, TrendingUp, Award, Calendar, User, Settings, HelpCircle } from 'lucide-react';
import RoleDashboardSidebar, { NavItem } from '@/components/layout/RoleDashboardSidebar';
import { ROUTES } from '@/constants';

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: ROUTES.LEARNER_OVERVIEW },
  { label: 'My Courses', icon: BookOpen, href: ROUTES.LEARNER_COURSES },
  { label: 'Progress Tracker', icon: TrendingUp, href: ROUTES.LEARNER_PROGRESS },
  { label: 'Certificates', icon: Award, href: ROUTES.LEARNER_CERTIFICATES },
  { label: 'Workshops', icon: Calendar, href: ROUTES.LEARNER_WORKSHOPS },
];

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Profile', icon: User, href: ROUTES.LEARNER_PROFILE },
  { label: 'Settings', icon: Settings, href: ROUTES.LEARNER_SETTINGS },
  { label: 'Help', icon: HelpCircle, href: ROUTES.LEARNER_SETTINGS + '?tab=help' },
];

interface Props {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function LearnerSidebar({ isMobileOpen, onMobileClose }: Props) {
  return (
    <RoleDashboardSidebar
      navItems={NAV_ITEMS}
      bottomItems={BOTTOM_ITEMS}
      isMobileOpen={isMobileOpen}
      onMobileClose={onMobileClose}
      roleLabel="Learner"
      roleColor="#7c3aed"
      upgradeHref={ROUTES.LEARNER_COURSES}
      upgradeLabel="Go Pro Learner"
      upgradeDesc="Access all courses + live workshops"
    />
  );
}
