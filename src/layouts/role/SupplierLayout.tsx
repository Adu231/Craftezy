import { ReactNode, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import SupplierSidebar from '@/components/layout/sidebars/SupplierSidebar';

export default function SupplierLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RoleDashboardLayout sidebar={<SupplierSidebar isMobileOpen={open} onMobileClose={() => setOpen(false)} />}>
      {children}
    </RoleDashboardLayout>
  );
}
