import MainLayout from '@/layouts/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import DashboardPreviewSection from '@/components/sections/DashboardPreviewSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import CategoriesSection from '@/components/sections/CategoriesSection';

export default function Index() {
  return (
    <MainLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <WorkflowSection />
      <BenefitsSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </MainLayout>
  );
}
