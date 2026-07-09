import { ReactNode, useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import BrandSidebar from '@/components/layout/sidebars/BrandSidebar';

export default function BrandLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RoleDashboardLayout sidebar={<BrandSidebar isMobileOpen={open} onMobileClose={() => setOpen(false)} />}>
      {children}
    </RoleDashboardLayout>
  );
}
