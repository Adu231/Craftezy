import { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface Props {
  children: ReactNode;
  hideFooter?: boolean;
}

export default function MainLayout({ children, hideFooter }: Props) {
  useScrollToTop();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
