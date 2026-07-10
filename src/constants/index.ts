export const APP_NAME = 'Craftezy';
export const APP_TAGLINE = 'Where Creativity Comes Alive';
export const APP_DESCRIPTION = 'An AI-powered craft marketplace and creative learning platform where artisans create, sell, and connect.';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MARKETPLACE: '/marketplace',
  LEARN: '/learn',
  COMMUNITY: '/community',
  WORKSHOPS: '/workshops',
  ABOUT: '/about',
  DASHBOARD: '/dashboard',

  // Customer Routes
  CUSTOMER_OVERVIEW: '/dashboard/customer/overview',
  CUSTOMER_ORDERS: '/dashboard/customer/orders',
  CUSTOMER_WISHLIST: '/dashboard/customer/wishlist',
  CUSTOMER_REVIEWS: '/dashboard/customer/reviews',
  CUSTOMER_PROFILE: '/dashboard/customer/profile',
  CUSTOMER_SETTINGS: '/dashboard/customer/settings',

  // Artisan Routes
  ARTISAN_OVERVIEW: '/dashboard/artisan/overview',
  ARTISAN_STORE: '/dashboard/artisan/store',
  ARTISAN_PRODUCTS: '/dashboard/artisan/products',
  ARTISAN_ORDERS: '/dashboard/artisan/orders',
  ARTISAN_ANALYTICS: '/dashboard/artisan/analytics',
  ARTISAN_MESSAGES: '/dashboard/artisan/messages',
  ARTISAN_EARNINGS: '/dashboard/artisan/earnings',
  ARTISAN_CUSTOM_ORDERS: '/dashboard/artisan/custom-orders',
  ARTISAN_PROFILE: '/dashboard/artisan/profile',
  ARTISAN_SETTINGS: '/dashboard/artisan/settings',
  ARTISAN_AI_ASSISTANT: '/dashboard/artisan/ai-assistant',

  // Learner Routes
  LEARNER_OVERVIEW: '/dashboard/learner/overview',
  LEARNER_COURSES: '/dashboard/learner/courses',
  LEARNER_PROGRESS: '/dashboard/learner/progress',
  LEARNER_CERTIFICATES: '/dashboard/learner/certificates',
  LEARNER_WORKSHOPS: '/dashboard/learner/workshops',
  LEARNER_PROFILE: '/dashboard/learner/profile',
  LEARNER_SETTINGS: '/dashboard/learner/settings',

  // Instructor Routes
  INSTRUCTOR_OVERVIEW: '/dashboard/instructor/overview',
  INSTRUCTOR_COURSES: '/dashboard/instructor/courses',
  INSTRUCTOR_WORKSHOPS: '/dashboard/instructor/workshops',
  INSTRUCTOR_STUDENTS: '/dashboard/instructor/students',
  INSTRUCTOR_EARNINGS: '/dashboard/instructor/earnings',
  INSTRUCTOR_CERTIFICATES: '/dashboard/instructor/certificates',
  INSTRUCTOR_ANALYTICS: '/dashboard/instructor/analytics',
  INSTRUCTOR_MESSAGES: '/dashboard/instructor/messages',
  INSTRUCTOR_PROFILE: '/dashboard/instructor/profile',
  INSTRUCTOR_SETTINGS: '/dashboard/instructor/settings',

  // Supplier Routes
  SUPPLIER_OVERVIEW: '/dashboard/supplier/overview',
  SUPPLIER_MATERIALS: '/dashboard/supplier/materials',
  SUPPLIER_ORDERS: '/dashboard/supplier/orders',
  SUPPLIER_INVENTORY: '/dashboard/supplier/inventory',
  SUPPLIER_ANALYTICS: '/dashboard/supplier/analytics',
  SUPPLIER_MESSAGES: '/dashboard/supplier/messages',
  SUPPLIER_PROFILE: '/dashboard/supplier/profile',
  SUPPLIER_SETTINGS: '/dashboard/supplier/settings',

  // Brand Routes
  BRAND_OVERVIEW: '/dashboard/brand/overview',
  BRAND_CAMPAIGNS: '/dashboard/brand/campaigns',
  BRAND_COLLABORATIONS: '/dashboard/brand/collaborations',
  BRAND_CREATORS: '/dashboard/brand/creators',
  BRAND_ANALYTICS: '/dashboard/brand/analytics',
  BRAND_MESSAGES: '/dashboard/brand/messages',
  BRAND_PROFILE: '/dashboard/brand/profile',
  BRAND_SETTINGS: '/dashboard/brand/settings',

  // Admin Routes
  ADMIN_OVERVIEW: '/dashboard/admin/overview',
  ADMIN_USERS: '/dashboard/admin/users',
  ADMIN_SELLERS: '/dashboard/admin/sellers',
  ADMIN_PRODUCTS: '/dashboard/admin/products',
  ADMIN_ORDERS: '/dashboard/admin/orders',
  ADMIN_WORKSHOPS: '/dashboard/admin/workshops',
  ADMIN_REVENUE: '/dashboard/admin/revenue',
  ADMIN_ANALYTICS: '/dashboard/admin/analytics',
  ADMIN_CONTENT: '/dashboard/admin/content',
  ADMIN_SETTINGS: '/dashboard/admin/settings',

  // Legacy (kept for compatibility)
  DASHBOARD_OVERVIEW: '/dashboard/artisan/overview',
  DASHBOARD_STORE: '/dashboard/artisan/store',
  DASHBOARD_PRODUCTS: '/dashboard/artisan/products',
  DASHBOARD_ORDERS: '/dashboard/artisan/orders',
  DASHBOARD_ANALYTICS: '/dashboard/artisan/analytics',
  DASHBOARD_MESSAGES: '/dashboard/artisan/messages',
  DASHBOARD_COURSES: '/dashboard/artisan/courses',
  DASHBOARD_WORKSHOPS: '/dashboard/artisan/workshops',
  DASHBOARD_EARNINGS: '/dashboard/artisan/earnings',
  DASHBOARD_COMMUNITY: '/dashboard/artisan/community',
  DASHBOARD_PROFILE: '/dashboard/artisan/profile',
  DASHBOARD_SETTINGS: '/dashboard/artisan/settings',
  DASHBOARD_SUPPORT: '/dashboard/artisan/support',
  DASHBOARD_AI_ASSISTANT: '/dashboard/artisan/ai-assistant',
} as const;

export const PRODUCT_CATEGORIES = [
  { id: '1', name: 'Jewelry & Accessories', slug: 'jewelry', icon: '', color: '#C65D3B', productCount: 2840 },
  { id: '2', name: 'Home Décor', slug: 'home-decor', icon: '', color: '#2E7D32', productCount: 3210 },
  { id: '3', name: 'Pottery & Ceramics', slug: 'pottery', icon: '', color: '#E9A825', productCount: 1560 },
  { id: '4', name: 'Textile & Fiber Arts', slug: 'textile', icon: '', color: '#C65D3B', productCount: 2100 },
  { id: '5', name: 'Painting & Prints', slug: 'painting', icon: '', color: '#2E7D32', productCount: 1890 },
  { id: '6', name: 'Woodworking', slug: 'woodworking', icon: '', color: '#E9A825', productCount: 980 },
  { id: '7', name: 'Candles & Soaps', slug: 'candles', icon: '', color: '#C65D3B', productCount: 1420 },
  { id: '8', name: 'Paper Crafts', slug: 'paper', icon: '', color: '#2E7D32', productCount: 760 },
];

export const COURSE_CATEGORIES = [
  'Jewelry Making', 'Pottery', 'Macramé', 'Painting', 'Embroidery',
  'Knitting & Crochet', 'Woodworking', 'Candle Making', 'Soap Making', 'Paper Crafts'
];

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  processing: { label: 'Processing', color: 'bg-indigo-100 text-indigo-800' },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

export const STATS = [
  { label: 'Active Artisans', value: '50,000+', suffix: '' },
  { label: 'Products Listed', value: '2M+', suffix: '' },
  { label: 'Happy Customers', value: '500K+', suffix: '' },
  { label: 'Countries', value: '85+', suffix: '' },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Ceramic Artist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    quote: "Craftezy transformed my small pottery hobby into a thriving business. The AI assistant helped me price my work correctly and I tripled my income in 6 months.",
    rating: 5,
    revenue: '$8,400/month',
  },
  {
    id: '2',
    name: 'James Okonkwo',
    role: 'Woodcraft Artisan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    quote: "The custom order system is incredibly streamlined. Clients describe what they want, I quote it, and we track milestones. My custom orders increased 200%.",
    rating: 5,
    revenue: '$12,200/month',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'DIY Instructor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    quote: "I launched my macramé workshop series on Craftezy and had 200 students enrolled in the first month. The learning platform tools are exceptional.",
    rating: 5,
    revenue: '$5,800/month',
  },
  {
    id: '4',
    name: 'Marco Rivera',
    role: 'Jewelry Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    quote: "The AI design assistant gave me color palette suggestions that completely elevated my jewelry collections. My best-selling line started with an AI recommendation.",
    rating: 5,
    revenue: '$9,100/month',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for hobbyists just starting out',
    features: [
      'Up to 10 product listings',
      'Basic storefront',
      '5% transaction fee',
      'Community access',
      'Basic analytics',
      '2 workshop listings/month',
    ],
    cta: 'Get Started Free',
    isPopular: false,
    color: 'border-border',
  },
  {
    id: 'artisan',
    name: 'Artisan',
    price: 19,
    period: '/month',
    description: 'For serious creators growing their business',
    features: [
      'Unlimited product listings',
      'Custom storefront builder',
      '2% transaction fee',
      'AI Craft Assistant (50 queries/mo)',
      'Advanced analytics',
      'Priority search placement',
      'Unlimited workshops',
      'Certificate generation',
    ],
    cta: 'Start 14-Day Trial',
    isPopular: true,
    color: 'border-primary',
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 49,
    period: '/month',
    description: 'For established artisan businesses',
    features: [
      'Everything in Artisan',
      '0% transaction fee',
      'Unlimited AI Assistant',
      'Team collaboration (5 seats)',
      'Custom domain',
      'Bulk order management',
      'API access',
      'Dedicated support',
      'Brand partnership access',
    ],
    cta: 'Start 14-Day Trial',
    isPopular: false,
    color: 'border-secondary',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How do I start selling on Craftezy?',
    answer: 'Create a free account, complete your artisan profile, set up your storefront, and start listing products. Approval takes less than 24 hours for most sellers.',
  },
  {
    question: 'What are the transaction fees?',
    answer: 'Starter plan has a 5% fee, Artisan plan has 2%, and Studio plan has 0%. These cover payment processing, buyer protection, and platform maintenance.',
  },
  {
    question: 'Can I offer custom orders?',
    answer: 'Yes! All artisans can accept custom orders with our built-in quote, milestone tracking, and approval workflow system — available on all plans.',
  },
  {
    question: 'How does the AI Craft Assistant work?',
    answer: 'Our AI assistant helps with design suggestions, material recommendations, project cost estimation, color palette generation, and writing product descriptions.',
  },
  {
    question: 'Can I teach workshops on Craftezy?',
    answer: 'Absolutely! Any verified artisan can host online or in-person workshops, sell tickets, issue digital certificates, and build a student community.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'Yes, Craftezy is available on iOS and Android. Manage your store, chat with customers, process orders, and access learning content on the go.',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Create Your Store',
    description: 'Set up a beautiful artisan storefront with our drag-and-drop builder. Add your story, photos, and brand.',
    icon: '',
  },
  {
    step: '02',
    title: 'List Your Crafts',
    description: 'Upload products with AI-powered descriptions, smart pricing suggestions, and automatic categorization.',
    icon: '',
  },
  {
    step: '03',
    title: 'Reach Customers',
    description: 'Get discovered by thousands of craft enthusiasts through our AI-powered recommendation engine.',
    icon: '',
  },
  {
    step: '04',
    title: 'Grow & Earn',
    description: 'Track sales, analyze performance, teach workshops, and scale your creative business confidently.',
    icon: '',
  },
];

export const NAV_LINKS = [
  { label: 'Marketplace', href: ROUTES.MARKETPLACE },
  { label: 'Learn', href: ROUTES.LEARN },
  { label: 'Workshops', href: ROUTES.WORKSHOPS },
  { label: 'Community', href: ROUTES.COMMUNITY },
];

export const FOOTER_LINKS = {
  Platform: [
    { label: 'Marketplace', href: ROUTES.MARKETPLACE },
    { label: 'Learn', href: ROUTES.LEARN },
    { label: 'Workshops', href: ROUTES.WORKSHOPS },
    { label: 'Community', href: ROUTES.COMMUNITY },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Creators: [
    { label: 'Start Selling', href: ROUTES.REGISTER },
    { label: 'Creator Dashboard', href: ROUTES.ARTISAN_OVERVIEW },
    { label: 'AI Assistant', href: ROUTES.ARTISAN_AI_ASSISTANT },
    { label: 'Analytics', href: ROUTES.ARTISAN_ANALYTICS },
    { label: 'Workshop Hosting', href: ROUTES.ARTISAN_WORKSHOPS },
  ],
  Support: [
    { label: 'Help Center', href: '#help' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Seller Guidelines', href: '#guidelines' },
    { label: 'Community Rules', href: '#rules' },
    { label: 'Report Issue', href: '#report' },
  ],
  Company: [
    { label: 'About Craftezy', href: ROUTES.ABOUT },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press', href: '#press' },
    { label: 'Privacy Policy', href: '#privacy' },
  ],
};

export const DEMO_ACCOUNTS_INFO = [
  {
    role: 'customer' as const,
    name: 'Alex Johnson',
    email: 'customer@craftezy.com',
    password: 'password123',
    description: 'Browse products, track orders, write reviews',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    role: 'artisan' as const,
    name: 'Emma Hartwell',
    email: 'artisan@craftezy.com',
    password: 'password123',
    description: 'Manage store, products, orders & earnings',
    color: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800',
    
  },
  {
    role: 'learner' as const,
    name: 'Jordan Lee',
    email: 'learner@craftezy.com',
    password: 'password123',
    description: 'Enrolled courses, progress & certificates',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-800',
    
  },
  {
    role: 'instructor' as const,
    name: 'Priya Sharma',
    email: 'instructor@craftezy.com',
    password: 'password123',
    description: 'Host workshops, teach courses, issue certificates',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',

  },
  {
    role: 'supplier' as const,
    name: 'Mike Chen',
    email: 'supplier@craftezy.com',
    password: 'password123',
    description: 'List materials, manage inventory & orders',
    color: 'bg-yellow-50 border-yellow-200',
    badgeColor: 'bg-yellow-100 text-yellow-800',
   
  },
  {
    role: 'brand' as const,
    name: 'Sarah Mitchell',
    email: 'brand@craftezy.com',
    password: 'password123',
    description: 'Launch campaigns, collaborate with creators',
    color: 'bg-pink-50 border-pink-200',
    badgeColor: 'bg-pink-100 text-pink-800',
    
  },
  {
    role: 'admin' as const,
    name: 'Admin User',
    email: 'admin@craftezy.com',
    password: 'password123',
    description: 'Full platform management & analytics',
    color: 'bg-red-50 border-red-200',
    badgeColor: 'bg-red-100 text-red-800',
   
  },
];
