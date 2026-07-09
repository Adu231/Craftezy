import { ReactNode, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import AdminSidebar from '@/components/layout/sidebars/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RoleDashboardLayout sidebar={<AdminSidebar isMobileOpen={open} onMobileClose={() => setOpen(false)} />}>
      {children}
    </RoleDashboardLayout>
  );
}
