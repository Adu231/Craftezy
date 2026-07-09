import { ReactNode, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import LearnerSidebar from '@/components/layout/sidebars/LearnerSidebar';

export default function LearnerLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RoleDashboardLayout sidebar={<LearnerSidebar isMobileOpen={open} onMobileClose={() => setOpen(false)} />}>
      {children}
    </RoleDashboardLayout>
  );
}
