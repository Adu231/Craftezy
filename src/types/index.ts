export type UserRole =
  | 'customer'
  | 'artisan'
  | 'learner'
  | 'instructor'
  | 'supplier'
  | 'brand'
  | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  location?: string;
  joinedAt: string;
  isVerified: boolean;
  storeName?: string;
  totalSales?: number;
  rating?: number;
  reviewCount?: number;
  followers: number;
  following: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  artisan: Partial<User>;
  rating: number;
  reviewCount: number;
  stock: number;
  isCustomOrderAvailable: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  createdAt: string;
  shippingDays: number;
  materials?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Partial<User>;
  price: number;
  originalPrice?: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  rating: number;
  studentsCount: number;
  isFeatured?: boolean;
  tags: string[];
  skills: string[];
  createdAt: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Partial<User>;
  price: number;
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
  enrolledCount: number;
  isOnline: boolean;
  location?: string;
  category: string;
  tags: string[];
}

export interface Order {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery?: string;
  customer: Partial<User>;
  trackingNumber?: string;
  isCustomOrder?: boolean;
}

export interface Review {
  id: string;
  user: Partial<User>;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Notification {
  id: string;
  type: 'order' | 'review' | 'message' | 'system' | 'workshop';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface Message {
  id: string;
  sender: Partial<User>;
  receiver: Partial<User>;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
