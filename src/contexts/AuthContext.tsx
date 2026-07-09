import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserRole } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_ACCOUNTS: Record<UserRole, User> = {
  customer: {
    id: 'demo_customer',
    name: 'Alex Johnson',
    email: 'customer@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face',
    role: 'customer',
    bio: 'Craft enthusiast and lover of handmade goods. Always looking for unique pieces to add to my home.',
    location: 'Austin, TX',
    joinedAt: '2023-06-15',
    isVerified: true,
    followers: 24,
    following: 58,
  },
  artisan: {
    id: 'demo_artisan',
    name: 'Emma Hartwell',
    email: 'artisan@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    role: 'artisan',
    bio: 'Passionate ceramic artist and macramé maker based in Portland, OR.',
    location: 'Portland, OR',
    joinedAt: '2022-03-15',
    isVerified: true,
    storeName: "Emma's Handcrafted Studio",
    totalSales: 342,
    rating: 4.9,
    reviewCount: 218,
    followers: 1240,
    following: 89,
  },
  learner: {
    id: 'demo_learner',
    name: 'Jordan Lee',
    email: 'learner@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face',
    role: 'learner',
    bio: 'Passionate about learning new crafts and creative skills. Currently exploring macramé and ceramics.',
    location: 'Seattle, WA',
    joinedAt: '2024-01-10',
    isVerified: false,
    followers: 12,
    following: 34,
  },
  instructor: {
    id: 'demo_instructor',
    name: 'Priya Sharma',
    email: 'instructor@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    role: 'instructor',
    bio: 'Award-winning craft educator with 12 years of experience. Specialist in macramé, weaving, and fiber arts.',
    location: 'Brooklyn, NY',
    joinedAt: '2021-08-20',
    isVerified: true,
    storeName: 'Priya Craft Academy',
    totalSales: 156,
    rating: 4.9,
    reviewCount: 312,
    followers: 4800,
    following: 120,
  },
  supplier: {
    id: 'demo_supplier',
    name: 'Mike Chen',
    email: 'supplier@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    role: 'supplier',
    bio: 'Premium craft supply distributor. Specializing in high-quality natural materials for artisans worldwide.',
    location: 'Los Angeles, CA',
    joinedAt: '2021-04-10',
    isVerified: true,
    storeName: 'CraftSource Pro',
    totalSales: 2840,
    rating: 4.7,
    reviewCount: 890,
    followers: 320,
    following: 45,
  },
  brand: {
    id: 'demo_brand',
    name: 'Sarah Mitchell',
    email: 'brand@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face',
    role: 'brand',
    bio: 'Marketing director at Artisan Home Co. Connecting premium brands with talented creators.',
    location: 'New York, NY',
    joinedAt: '2023-02-01',
    isVerified: true,
    storeName: 'Artisan Home Co.',
    followers: 580,
    following: 210,
  },
  admin: {
    id: 'demo_admin',
    name: 'Admin User',
    email: 'admin@craftezy.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
    role: 'admin',
    bio: 'Craftezy platform administrator. Managing the marketplace and ensuring a great experience for all users.',
    location: 'San Francisco, CA',
    joinedAt: '2020-01-01',
    isVerified: true,
    storeName: 'Craftezy HQ',
    followers: 0,
    following: 0,
  },
};

export const DEMO_PASSWORD = 'password123';

export const getDashboardRoute = (role: UserRole): string => {
  const routeMap: Record<UserRole, string> = {
    customer: '/dashboard/customer/overview',
    artisan: '/dashboard/artisan/overview',
    learner: '/dashboard/learner/overview',
    instructor: '/dashboard/instructor/overview',
    supplier: '/dashboard/supplier/overview',
    brand: '/dashboard/brand/overview',
    admin: '/dashboard/admin/overview',
  };
  return routeMap[role];
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem('craftezy_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem('craftezy_user');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (password !== DEMO_PASSWORD && password !== 'password123') {
      throw new Error('Invalid credentials');
    }
    // Find demo account by email
    const demoUser = Object.values(DEMO_ACCOUNTS).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!demoUser) throw new Error('User not found');
    localStorage.setItem('craftezy_user', JSON.stringify(demoUser));
    setState({ user: demoUser, isAuthenticated: true, isLoading: false });
  };

  const register = async (data: RegisterData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const baseUser = DEMO_ACCOUNTS[data.role] || DEMO_ACCOUNTS.customer;
    const user: User = {
      ...baseUser,
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      isVerified: false,
      totalSales: 0,
      rating: 0,
      reviewCount: 0,
      followers: 0,
      following: 0,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem('craftezy_user', JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('craftezy_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const updateUser = (data: Partial<User>) => {
    if (!state.user) return;
    const updated = { ...state.user, ...data };
    localStorage.setItem('craftezy_user', JSON.stringify(updated));
    setState(prev => ({ ...prev, user: updated }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
