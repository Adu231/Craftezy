import { ReactNode, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import InstructorSidebar from '@/components/layout/sidebars/InstructorSidebar';

export default function InstructorLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RoleDashboardLayout sidebar={<InstructorSidebar isMobileOpen={open} onMobileClose={() => setOpen(false)} />}>
      {children}
    </RoleDashboardLayout>
  );
}
