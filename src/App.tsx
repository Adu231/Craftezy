import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

// Public Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Marketplace from '@/pages/marketplace/Marketplace';
import Learn from '@/pages/learn/Learn';
import Workshops from '@/pages/workshops/Workshops';
import Community from '@/pages/community/Community';
import Cart from '@/pages/cart/Cart';
import Checkout from '@/pages/checkout/Checkout';

// ─── CUSTOMER DASHBOARD ───────────────────────────────
import CustomerOverview from '@/pages/dashboard/customer/Overview';
import CustomerOrders from '@/pages/dashboard/customer/Orders';
import CustomerWishlist from '@/pages/dashboard/customer/Wishlist';
import CustomerReviews from '@/pages/dashboard/customer/Reviews';
import CustomerProfile from '@/pages/dashboard/customer/Profile';
import CustomerSettings from '@/pages/dashboard/customer/Settings';

// ─── ARTISAN DASHBOARD ───────────────────────────────
import ArtisanOverview from '@/pages/dashboard/artisan/Overview';
import ArtisanProducts from '@/pages/dashboard/artisan/Products';
import ArtisanOrders from '@/pages/dashboard/artisan/Orders';
import ArtisanCustomOrders from '@/pages/dashboard/artisan/CustomOrders';
import ArtisanAnalytics from '@/pages/dashboard/artisan/Analytics';
import ArtisanMessages from '@/pages/dashboard/artisan/Messages';
import ArtisanEarnings from '@/pages/dashboard/artisan/Earnings';
import ArtisanProfile from '@/pages/dashboard/artisan/Profile';
import ArtisanSettings from '@/pages/dashboard/artisan/Settings';
import ArtisanAIAssistant from '@/pages/dashboard/artisan/AIAssistant';
import ArtisanStore from '@/pages/dashboard/artisan/Store';

// ─── LEARNER DASHBOARD ───────────────────────────────
import LearnerOverview from '@/pages/dashboard/learner/Overview';
import LearnerCourses from '@/pages/dashboard/learner/Courses';
import LearnerProgress from '@/pages/dashboard/learner/Progress';
import LearnerCertificates from '@/pages/dashboard/learner/Certificates';
import LearnerWorkshops from '@/pages/dashboard/learner/Workshops';
import LearnerProfile from '@/pages/dashboard/learner/Profile';
import LearnerSettings from '@/pages/dashboard/learner/Settings';

// ─── INSTRUCTOR DASHBOARD ───────────────────────────────
import InstructorOverview from '@/pages/dashboard/instructor/Overview';
import InstructorCourses from '@/pages/dashboard/instructor/Courses';
import InstructorWorkshops from '@/pages/dashboard/instructor/Workshops';
import InstructorStudents from '@/pages/dashboard/instructor/Students';
import InstructorEarnings from '@/pages/dashboard/instructor/Earnings';
import InstructorCertificates from '@/pages/dashboard/instructor/Certificates';
import InstructorAnalytics from '@/pages/dashboard/instructor/Analytics';
import InstructorMessages from '@/pages/dashboard/instructor/Messages';
import InstructorProfile from '@/pages/dashboard/instructor/Profile';
import InstructorSettings from '@/pages/dashboard/instructor/Settings';

// ─── SUPPLIER DASHBOARD ───────────────────────────────
import SupplierOverview from '@/pages/dashboard/supplier/Overview';
import SupplierMaterials from '@/pages/dashboard/supplier/Materials';
import SupplierOrders from '@/pages/dashboard/supplier/Orders';
import SupplierInventory from '@/pages/dashboard/supplier/Inventory';
import SupplierAnalytics from '@/pages/dashboard/supplier/Analytics';
import SupplierMessages from '@/pages/dashboard/supplier/Messages';
import SupplierProfile from '@/pages/dashboard/supplier/Profile';
import SupplierSettings from '@/pages/dashboard/supplier/Settings';

// ─── BRAND DASHBOARD ───────────────────────────────
import BrandOverview from '@/pages/dashboard/brand/Overview';
import BrandCampaigns from '@/pages/dashboard/brand/Campaigns';
import BrandCollaborations from '@/pages/dashboard/brand/Collaborations';
import BrandCreators from '@/pages/dashboard/brand/Creators';
import BrandAnalytics from '@/pages/dashboard/brand/Analytics';
import BrandMessages from '@/pages/dashboard/brand/Messages';
import BrandProfile from '@/pages/dashboard/brand/Profile';
import BrandSettings from '@/pages/dashboard/brand/Settings';

// ─── ADMIN DASHBOARD ───────────────────────────────
import AdminOverview from '@/pages/dashboard/admin/Overview';
import AdminUsers from '@/pages/dashboard/admin/Users';
import AdminSellers from '@/pages/dashboard/admin/Sellers';
import AdminProducts from '@/pages/dashboard/admin/Products';
import AdminAnalytics from '@/pages/dashboard/admin/Analytics';
import AdminContent from '@/pages/dashboard/admin/Content';
import AdminRevenue from '@/pages/dashboard/admin/Revenue';
import AdminWorkshops from '@/pages/dashboard/admin/Workshops';
import AdminSettings from '@/pages/dashboard/admin/Settings';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner richColors position="top-right" />
          <BrowserRouter>
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/product/:id" element={<Marketplace />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/course/:id" element={<Learn />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/:id" element={<Workshops />} />
            <Route path="/community" element={<Community />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* ── Auth Routes ── */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ── Dashboard Root Redirect ── */}
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />

            {/* ──────────────────────────────────────
                CUSTOMER DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/customer" element={<Navigate to="/dashboard/customer/overview" replace />} />
            <Route path="/dashboard/customer/overview" element={<CustomerOverview />} />
            <Route path="/dashboard/customer/orders" element={<CustomerOrders />} />
            <Route path="/dashboard/customer/wishlist" element={<CustomerWishlist />} />
            <Route path="/dashboard/customer/reviews" element={<CustomerReviews />} />
            <Route path="/dashboard/customer/profile" element={<CustomerProfile />} />
            <Route path="/dashboard/customer/settings" element={<CustomerSettings />} />

            {/* ──────────────────────────────────────
                ARTISAN DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/artisan" element={<Navigate to="/dashboard/artisan/overview" replace />} />
            <Route path="/dashboard/artisan/overview" element={<ArtisanOverview />} />
            <Route path="/dashboard/artisan/store" element={<ArtisanStore />} />
            <Route path="/dashboard/artisan/products" element={<ArtisanProducts />} />
            <Route path="/dashboard/artisan/orders" element={<ArtisanOrders />} />
            <Route path="/dashboard/artisan/custom-orders" element={<ArtisanCustomOrders />} />
            <Route path="/dashboard/artisan/analytics" element={<ArtisanAnalytics />} />
            <Route path="/dashboard/artisan/messages" element={<ArtisanMessages />} />
            <Route path="/dashboard/artisan/earnings" element={<ArtisanEarnings />} />
            <Route path="/dashboard/artisan/profile" element={<ArtisanProfile />} />
            <Route path="/dashboard/artisan/settings" element={<ArtisanSettings />} />
            <Route path="/dashboard/artisan/ai-assistant" element={<ArtisanAIAssistant />} />

            {/* ──────────────────────────────────────
                LEARNER DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/learner" element={<Navigate to="/dashboard/learner/overview" replace />} />
            <Route path="/dashboard/learner/overview" element={<LearnerOverview />} />
            <Route path="/dashboard/learner/courses" element={<LearnerCourses />} />
            <Route path="/dashboard/learner/progress" element={<LearnerProgress />} />
            <Route path="/dashboard/learner/certificates" element={<LearnerCertificates />} />
            <Route path="/dashboard/learner/workshops" element={<LearnerWorkshops />} />
            <Route path="/dashboard/learner/profile" element={<LearnerProfile />} />
            <Route path="/dashboard/learner/settings" element={<LearnerSettings />} />

            {/* ──────────────────────────────────────
                INSTRUCTOR DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/instructor" element={<Navigate to="/dashboard/instructor/overview" replace />} />
            <Route path="/dashboard/instructor/overview" element={<InstructorOverview />} />
            <Route path="/dashboard/instructor/courses" element={<InstructorCourses />} />
            <Route path="/dashboard/instructor/workshops" element={<InstructorWorkshops />} />
            <Route path="/dashboard/instructor/students" element={<InstructorStudents />} />
            <Route path="/dashboard/instructor/earnings" element={<InstructorEarnings />} />
            <Route path="/dashboard/instructor/certificates" element={<InstructorCertificates />} />
            <Route path="/dashboard/instructor/analytics" element={<InstructorAnalytics />} />
            <Route path="/dashboard/instructor/messages" element={<InstructorMessages />} />
            <Route path="/dashboard/instructor/profile" element={<InstructorProfile />} />
            <Route path="/dashboard/instructor/settings" element={<InstructorSettings />} />

            {/* ──────────────────────────────────────
                SUPPLIER DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/supplier" element={<Navigate to="/dashboard/supplier/overview" replace />} />
            <Route path="/dashboard/supplier/overview" element={<SupplierOverview />} />
            <Route path="/dashboard/supplier/materials" element={<SupplierMaterials />} />
            <Route path="/dashboard/supplier/orders" element={<SupplierOrders />} />
            <Route path="/dashboard/supplier/inventory" element={<SupplierInventory />} />
            <Route path="/dashboard/supplier/analytics" element={<SupplierAnalytics />} />
            <Route path="/dashboard/supplier/messages" element={<SupplierMessages />} />
            <Route path="/dashboard/supplier/profile" element={<SupplierProfile />} />
            <Route path="/dashboard/supplier/settings" element={<SupplierSettings />} />

            {/* ──────────────────────────────────────
                BRAND DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/brand" element={<Navigate to="/dashboard/brand/overview" replace />} />
            <Route path="/dashboard/brand/overview" element={<BrandOverview />} />
            <Route path="/dashboard/brand/campaigns" element={<BrandCampaigns />} />
            <Route path="/dashboard/brand/collaborations" element={<BrandCollaborations />} />
            <Route path="/dashboard/brand/creators" element={<BrandCreators />} />
            <Route path="/dashboard/brand/analytics" element={<BrandAnalytics />} />
            <Route path="/dashboard/brand/messages" element={<BrandMessages />} />
            <Route path="/dashboard/brand/profile" element={<BrandProfile />} />
            <Route path="/dashboard/brand/settings" element={<BrandSettings />} />

            {/* ──────────────────────────────────────
                ADMIN DASHBOARD
            ────────────────────────────────────── */}
            <Route path="/dashboard/admin" element={<Navigate to="/dashboard/admin/overview" replace />} />
            <Route path="/dashboard/admin/overview" element={<AdminOverview />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/sellers" element={<AdminSellers />} />
            <Route path="/dashboard/admin/products" element={<AdminProducts />} />
            <Route path="/dashboard/admin/orders" element={<AdminOverview />} />
            <Route path="/dashboard/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/dashboard/admin/content" element={<AdminContent />} />
            <Route path="/dashboard/admin/revenue" element={<AdminRevenue />} />
            <Route path="/dashboard/admin/workshops" element={<AdminWorkshops />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />

            {/* ── 404 ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </TooltipProvider>
</QueryClientProvider>
);

export default App;
