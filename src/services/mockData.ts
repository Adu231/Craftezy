import { Product, Course, Workshop, Order, Review, Notification, Message } from '@/types';

const ARTISANS = [
  {
    id: 'a1', name: 'Emma Hartwell', email: 'emma@craftezy.com', role: 'artisan' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    isVerified: true, storeName: "Emma's Handcrafted Studio", totalSales: 342, rating: 4.9, reviewCount: 218, joinedAt: '2022-03-15',
  },
  {
    id: 'a2', name: 'James Rivera', email: 'james@craftezy.com', role: 'artisan' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    isVerified: true, storeName: 'Woodcraft by James', totalSales: 521, rating: 4.8, reviewCount: 310, joinedAt: '2021-08-10',
  },
  {
    id: 'a3', name: 'Priya Nair', email: 'priya@craftezy.com', role: 'artisan' as const,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    isVerified: true, storeName: 'Priya Artisan Jewels', totalSales: 289, rating: 4.7, reviewCount: 180, joinedAt: '2022-11-05',
  },
  {
    id: 'a4', name: 'Marco Chen', email: 'marco@craftezy.com', role: 'artisan' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    isVerified: true, storeName: 'Clay & Fire Studio', totalSales: 410, rating: 4.9, reviewCount: 245, joinedAt: '2021-02-20',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1', title: 'Handcrafted Stoneware Mug Set', description: 'Set of 4 artisan ceramic mugs with a warm terracotta glaze. Each piece is unique with slight variations that showcase the handmade process. Microwave and dishwasher safe.',
    price: 68, originalPrice: 85, images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509516713756-7e86d5a0d1ea?w=600&h=600&fit=crop',
    ],
    category: 'Pottery & Ceramics', tags: ['mug', 'ceramic', 'stoneware', 'kitchen'], artisan: ARTISANS[3], rating: 4.9, reviewCount: 124, stock: 8, isCustomOrderAvailable: true, isFeatured: true, isBestseller: true, createdAt: '2024-01-15', shippingDays: 5, materials: ['Stoneware clay', 'Natural glaze'],
  },
  {
    id: 'p2', title: 'Macramé Wall Hanging - Boho Dream', description: 'Large boho wall hanging handwoven from natural cotton rope. Measures 24" wide x 36" long. Each piece is made to order with slight variations making yours truly unique.',
    price: 95, images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    ],
    category: 'Textile & Fiber Arts', tags: ['macrame', 'wall-art', 'boho', 'home-decor'], artisan: ARTISANS[0], rating: 4.8, reviewCount: 89, stock: 15, isCustomOrderAvailable: true, isFeatured: true, createdAt: '2024-02-10', shippingDays: 7, materials: ['Natural cotton rope', 'Wooden dowel'],
  },
  {
    id: 'p3', title: 'Silver & Moonstone Ring - Handmade', description: 'Delicate sterling silver ring featuring a genuine rainbow moonstone. Set in a simple bezel setting that lets the stone be the star. Available in sizes 5-10.',
    price: 72, originalPrice: 90, images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    ],
    category: 'Jewelry & Accessories', tags: ['ring', 'silver', 'moonstone', 'handmade'], artisan: ARTISANS[2], rating: 4.7, reviewCount: 56, stock: 12, isCustomOrderAvailable: true, isBestseller: true, createdAt: '2024-01-28', shippingDays: 4, materials: ['Sterling silver', 'Rainbow moonstone'],
  },
  {
    id: 'p4', title: 'Reclaimed Wood Floating Shelf Set', description: 'Set of 3 rustic floating shelves crafted from reclaimed wood. Each shelf has unique grain patterns and character marks from its previous life. Hardware included.',
    price: 145, images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    ],
    category: 'Woodworking', tags: ['shelf', 'wood', 'rustic', 'home-decor'], artisan: ARTISANS[1], rating: 4.9, reviewCount: 201, stock: 6, isCustomOrderAvailable: true, isFeatured: true, createdAt: '2023-12-05', shippingDays: 10, materials: ['Reclaimed pine', 'Steel brackets'],
  },
  {
    id: 'p5', title: 'Beeswax & Lavender Pillar Candle', description: 'Hand-poured 100% pure beeswax candle infused with real dried lavender. Burns clean for 40+ hours. The natural honey scent of beeswax blends beautifully with fresh lavender.',
    price: 38, images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=600&fit=crop',
    ],
    category: 'Candles & Soaps', tags: ['candle', 'beeswax', 'lavender', 'natural'], artisan: ARTISANS[0], rating: 4.8, reviewCount: 147, stock: 25, isCustomOrderAvailable: false, isBestseller: true, createdAt: '2024-03-01', shippingDays: 3, materials: ['Pure beeswax', 'Dried lavender', 'Cotton wick'],
  },
  {
    id: 'p6', title: 'Hand-Painted Abstract Canvas Print', description: 'Original acrylic painting on stretched canvas. Abstract earth tones and organic shapes. 18"x24". Signed and includes certificate of authenticity.',
    price: 220, images: [
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=600&fit=crop',
    ],
    category: 'Painting & Prints', tags: ['painting', 'abstract', 'canvas', 'wall-art'], artisan: ARTISANS[2], rating: 4.9, reviewCount: 38, stock: 1, isCustomOrderAvailable: true, isFeatured: true, createdAt: '2024-02-20', shippingDays: 7, materials: ['Acrylic paint', 'Stretched canvas'],
  },
  {
    id: 'p7', title: 'Handwoven Wool Throw Blanket', description: 'Luxuriously soft throw blanket handwoven from 100% merino wool in a classic herringbone pattern. 50"x60". Available in five colorways. Machine washable on gentle cycle.',
    price: 185, originalPrice: 210, images: [
      'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&h=600&fit=crop',
    ],
    category: 'Textile & Fiber Arts', tags: ['blanket', 'wool', 'woven', 'cozy'], artisan: ARTISANS[0], rating: 4.8, reviewCount: 92, stock: 9, isCustomOrderAvailable: true, isFeatured: true, createdAt: '2024-01-10', shippingDays: 6, materials: ['Merino wool'],
  },
  {
    id: 'p8', title: 'Raku-Fired Ceramic Vase', description: 'One-of-a-kind raku pottery vase with unpredictable crackle patterns created during the fire-cooling process. No two are alike. 10" tall.',
    price: 115, images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=600&fit=crop',
    ],
    category: 'Pottery & Ceramics', tags: ['vase', 'raku', 'ceramic', 'art'], artisan: ARTISANS[3], rating: 5.0, reviewCount: 44, stock: 3, isCustomOrderAvailable: false, isFeatured: true, createdAt: '2024-03-10', shippingDays: 8, materials: ['Raku clay', 'Metallic oxides'],
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1', title: 'Beginner Macramé: Wall Hangings & Plant Hangers', description: 'Master the essential knots and techniques to create stunning macramé pieces from scratch.', thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    instructor: ARTISANS[0], price: 49, originalPrice: 79, duration: '6 hours', lessons: 24, level: 'beginner', category: 'Macramé', rating: 4.9, studentsCount: 2840, isFeatured: true, tags: ['macrame', 'knots', 'wall-art'], skills: ['Basic knots', 'Pattern reading', 'Fringe techniques'], createdAt: '2024-01-10',
  },
  {
    id: 'c2', title: 'Wheel Throwing Fundamentals: Clay to Vessel', description: 'Learn pottery on the wheel from centering clay to creating beautiful functional ware.', thumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
    instructor: ARTISANS[3], price: 89, duration: '12 hours', lessons: 36, level: 'beginner', category: 'Pottery', rating: 4.8, studentsCount: 1560, isFeatured: true, tags: ['pottery', 'wheel', 'ceramics'], skills: ['Centering', 'Opening', 'Pulling walls', 'Trimming'], createdAt: '2023-11-20',
  },
  {
    id: 'c3', title: 'Silversmithing: Create Your First Jewelry Collection', description: 'From raw silver sheet to polished jewelry. Learn sawing, soldering, setting stones and finishing.', thumbnail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=400&fit=crop',
    instructor: ARTISANS[2], price: 129, originalPrice: 160, duration: '18 hours', lessons: 52, level: 'intermediate', category: 'Jewelry Making', rating: 4.7, studentsCount: 890, isFeatured: true, tags: ['silver', 'jewelry', 'metalwork'], skills: ['Sawing', 'Soldering', 'Stone setting', 'Polishing'], createdAt: '2024-02-01',
  },
  {
    id: 'c4', title: 'Woodburning Art: From Beginner to Advanced', description: 'Pyrography techniques for creating stunning art and functional items with a woodburning tool.', thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&h=400&fit=crop',
    instructor: ARTISANS[1], price: 59, duration: '8 hours', lessons: 28, level: 'beginner', category: 'Woodworking', rating: 4.8, studentsCount: 1230, tags: ['woodburn', 'pyrography', 'art'], skills: ['Line work', 'Shading', 'Color', 'Patterns'], createdAt: '2024-01-25',
  },
  {
    id: 'c5', title: 'Hand Embroidery: Traditional to Modern Designs', description: 'Explore 25+ embroidery stitches and create everything from floral hoops to textile art.', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    instructor: ARTISANS[0], price: 45, duration: '7 hours', lessons: 30, level: 'beginner', category: 'Embroidery', rating: 4.9, studentsCount: 3210, tags: ['embroidery', 'needlework', 'textile'], skills: ['25+ stitches', 'Hoop art', 'Pattern transfer'], createdAt: '2023-12-15',
  },
  {
    id: 'c6', title: 'Natural Dye Workshop: Botanical Colors', description: 'Harness the colors of nature using plants, flowers, and minerals to dye fabric and fiber.', thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=400&fit=crop',
    instructor: ARTISANS[2], price: 75, originalPrice: 95, duration: '10 hours', lessons: 32, level: 'intermediate', category: 'Textile & Fiber Arts', rating: 4.6, studentsCount: 540, tags: ['natural-dye', 'botanical', 'textile'], skills: ['Mordanting', 'Extraction', 'Color mixing'], createdAt: '2024-02-12',
  },
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: 'w1', title: 'Sunday Pottery Morning: Hand Building', description: 'A relaxing 3-hour hand building session where you will create a small vase and bowl set.', thumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
    instructor: ARTISANS[3], price: 85, date: '2026-07-20', time: '10:00 AM', duration: '3 hours', maxParticipants: 12, enrolledCount: 9, isOnline: false, location: 'Portland Clay Studio, OR', category: 'Pottery', tags: ['pottery', 'handbuilding', 'in-person'],
  },
  {
    id: 'w2', title: 'Live Macramé: Boho Wall Hanging Workshop', description: 'Join me live for a 2-hour macramé session. All materials listed. Great for beginners!', thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    instructor: ARTISANS[0], price: 35, date: '2026-07-18', time: '3:00 PM', duration: '2 hours', maxParticipants: 30, enrolledCount: 24, isOnline: true, category: 'Macramé', tags: ['macrame', 'online', 'live'],
  },
  {
    id: 'w3', title: 'Introduction to Silversmithing', description: 'Learn the basics of working with silver: sawing, filing, soldering and create a pendant.', thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
    instructor: ARTISANS[2], price: 145, date: '2026-07-25', time: '11:00 AM', duration: '4 hours', maxParticipants: 8, enrolledCount: 5, isOnline: false, location: 'Brooklyn Jewelry Studio, NY', category: 'Jewelry', tags: ['silver', 'jewelry', 'in-person'],
  },
  {
    id: 'w4', title: 'Candle Making Masterclass: Natural Wax', description: 'Create three different candle styles using natural beeswax and soy wax with essential oils.', thumbnail: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=400&fit=crop',
    instructor: ARTISANS[0], price: 45, date: '2026-07-22', time: '6:00 PM', duration: '2.5 hours', maxParticipants: 20, enrolledCount: 12, isOnline: true, category: 'Candle Making', tags: ['candles', 'online', 'natural'],
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_001', product: MOCK_PRODUCTS[0], quantity: 1, totalPrice: 68, status: 'delivered', createdAt: '2024-03-01', estimatedDelivery: '2024-03-08', customer: { id: 'c1', name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', joinedAt: '2023-06-01' }, trackingNumber: 'TRK9812345',
  },
  {
    id: 'ord_002', product: MOCK_PRODUCTS[3], quantity: 1, totalPrice: 145, status: 'shipped', createdAt: '2024-03-10', estimatedDelivery: '2024-03-20', customer: { id: 'c2', name: 'Bob Williams', email: 'bob@example.com', role: 'customer', joinedAt: '2023-09-12' }, trackingNumber: 'TRK9812346',
  },
  {
    id: 'ord_003', product: MOCK_PRODUCTS[1], quantity: 1, totalPrice: 95, status: 'processing', createdAt: '2024-03-14', estimatedDelivery: '2024-03-24', customer: { id: 'c3', name: 'Carol Davis', email: 'carol@example.com', role: 'customer', joinedAt: '2024-01-05' },
  },
  {
    id: 'ord_004', product: MOCK_PRODUCTS[4], quantity: 3, totalPrice: 114, status: 'confirmed', createdAt: '2024-03-15', estimatedDelivery: '2024-03-22', customer: { id: 'c4', name: 'David Lee', email: 'david@example.com', role: 'customer', joinedAt: '2024-02-18' },
  },
  {
    id: 'ord_005', product: MOCK_PRODUCTS[5], quantity: 1, totalPrice: 220, status: 'pending', createdAt: '2024-03-16', estimatedDelivery: '2024-03-26', customer: { id: 'c5', name: 'Eve Martinez', email: 'eve@example.com', role: 'customer', joinedAt: '2024-03-10' }, isCustomOrder: true,
  },
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', user: { id: 'c1', name: 'Alice Johnson', email: '', role: 'customer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', joinedAt: '2023-06-01' }, rating: 5, comment: 'Absolutely stunning mugs! The glaze is even more beautiful in person. Fast shipping and beautifully packaged.', createdAt: '2024-03-05', helpful: 14 },
  { id: 'r2', user: { id: 'c2', name: 'Bob Williams', email: '', role: 'customer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', joinedAt: '2023-09-12' }, rating: 5, comment: 'The craftsmanship is exceptional. These shelves look incredible in our living room. Highly recommend!', createdAt: '2024-03-08', helpful: 8 },
  { id: 'r3', user: { id: 'c3', name: 'Carol Davis', email: '', role: 'customer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', joinedAt: '2024-01-05' }, rating: 4, comment: 'Beautiful macramé piece! A bit smaller than I expected but the quality is fantastic.', createdAt: '2024-03-12', helpful: 5 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'order', title: 'New Order Received', message: 'Alice Johnson ordered your Stoneware Mug Set', isRead: false, createdAt: '2024-03-16T10:30:00', link: '/dashboard/orders' },
  { id: 'n2', type: 'review', title: 'New Review (5 stars!)', message: 'Bob Williams left a 5-star review on your Floating Shelf Set', isRead: false, createdAt: '2024-03-15T14:20:00', link: '/dashboard/products' },
  { id: 'n3', type: 'message', title: 'New Message', message: 'Carol Davis: "Can I get a custom size for the wall hanging?"', isRead: false, createdAt: '2024-03-15T09:10:00', link: '/dashboard/messages' },
  { id: 'n4', type: 'system', title: 'Profile Verified', message: 'Congratulations! Your artisan profile has been verified.', isRead: true, createdAt: '2024-03-10T12:00:00' },
  { id: 'n5', type: 'workshop', title: 'Workshop Registration', message: 'David Lee registered for your Macramé Live Workshop', isRead: true, createdAt: '2024-03-09T16:45:00', link: '/dashboard/workshops' },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', sender: { id: 'c3', name: 'Carol Davis', email: 'carol@example.com', role: 'customer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', joinedAt: '2024-01-05' }, receiver: ARTISANS[0], content: 'Hi! Can I get a custom size for the macramé wall hanging? I need it to be 30" wide instead of 24"', createdAt: '2024-03-15T09:10:00', isRead: false },
  { id: 'm2', sender: { id: 'c4', name: 'David Lee', email: 'david@example.com', role: 'customer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop', joinedAt: '2024-02-18' }, receiver: ARTISANS[0], content: 'Hi Emma! I just enrolled in your Live Macramé workshop. Super excited!', createdAt: '2024-03-14T11:30:00', isRead: true },
  { id: 'm3', sender: { id: 'c5', name: 'Eve Martinez', email: 'eve@example.com', role: 'customer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop', joinedAt: '2024-03-10' }, receiver: ARTISANS[0], content: "I love the abstract canvas print! Could you do a custom piece in blues and greens for my office?", createdAt: '2024-03-13T14:55:00', isRead: true },
];

export const MOCK_ANALYTICS = {
  revenueByMonth: [
    { month: 'Aug', revenue: 2100 },
    { month: 'Sep', revenue: 2800 },
    { month: 'Oct', revenue: 3200 },
    { month: 'Nov', revenue: 4100 },
    { month: 'Dec', revenue: 5800 },
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 4800 },
    { month: 'Mar', revenue: 6200 },
  ],
  ordersByStatus: [
    { status: 'Delivered', count: 280 },
    { status: 'Processing', count: 32 },
    { status: 'Shipped', count: 18 },
    { status: 'Pending', count: 12 },
  ],
  topProducts: [
    { name: 'Stoneware Mug Set', sales: 89, revenue: 6052 },
    { name: 'Macramé Wall Hanging', sales: 61, revenue: 5795 },
    { name: 'Floating Shelf Set', sales: 44, revenue: 6380 },
    { name: 'Lavender Candle', sales: 112, revenue: 4256 },
    { name: 'Abstract Canvas', sales: 12, revenue: 2640 },
  ],
  trafficSources: [
    { source: 'Organic Search', percentage: 42 },
    { source: 'Direct', percentage: 28 },
    { source: 'Social Media', percentage: 18 },
    { source: 'Referral', percentage: 12 },
  ],
};

export const STORE_STATS = {
  totalRevenue: 38420,
  totalOrders: 342,
  totalProducts: 24,
  totalCustomers: 286,
  monthlyRevenue: 6200,
  monthlyOrders: 48,
  averageRating: 4.9,
  conversionRate: 3.8,
};
