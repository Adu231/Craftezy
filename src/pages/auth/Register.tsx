import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';
import { UserRole } from '@/types';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password, role });
      toast.success('Account created successfully!');
      
      const routes: Record<UserRole, string> = {
        customer: '/dashboard/customer/overview',
        artisan: '/dashboard/artisan/overview',
        learner: '/dashboard/learner/overview',
        instructor: '/dashboard/instructor/overview',
        supplier: '/dashboard/supplier/overview',
        brand: '/dashboard/brand/overview',
        admin: '/dashboard/admin/overview',
      };
      
      navigate(routes[role] || '/');
    } catch (err) {
      toast.error((err as Error).message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions: { value: UserRole; label: string; description: string; icon: string }[] = [
    { value: 'customer', label: 'Buyer', description: 'Shop handmade goods', icon: '' },
    { value: 'artisan', label: 'Artisan', description: 'Sell handmade crafts', icon: '' },
    { value: 'learner', label: 'Learner', description: 'Learn craft skills', icon: '' },
    { value: 'instructor', label: 'Instructor', description: 'Teach workshops', icon: '' },
    { value: 'supplier', label: 'Supplier', description: 'Sell craft supplies', icon: '' },
    { value: 'brand', label: 'Brand', description: 'Partner with creators', icon: '' },
  ];

  return (
    <AuthLayout>
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-2">Create an account</h1>
        <p className="text-muted-foreground mb-6">Join Craftezy community today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              className="h-11 rounded-xl border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-11 rounded-xl border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Must be at least 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-11 rounded-xl border-border pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>I want to join as a...</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {roleOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value)}
                  className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all hover:bg-muted/50 ${
                    role === option.value
                      ? 'border-terracotta bg-terracotta/5 text-foreground'
                      : 'border-border bg-white text-muted-foreground'
                  }`}
                >
                  <span className="text-xl mb-1">{option.icon}</span>
                  <p className="text-xs font-semibold text-foreground">{option.label}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl bg-terracotta hover:bg-terracotta/90 text-white font-semibold shadow-md">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
