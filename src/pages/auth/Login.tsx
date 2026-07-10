import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES, DEMO_ACCOUNTS_INFO } from '@/constants';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back to Craftezy!');
      navigate('/');
    } catch {
      toast.error('Invalid credentials. Please use a demo account below.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async (demoEmail: string, role: string) => {
    setLoadingRole(role);
    try {
      await login(demoEmail, 'password123');
      toast.success(`Logged in as ${role}!`);
      const routes: Record<string, string> = {
        customer: '/dashboard/customer/overview',
        artisan: '/dashboard/artisan/overview',
        learner: '/dashboard/learner/overview',
        instructor: '/dashboard/instructor/overview',
        supplier: '/dashboard/supplier/overview',
        brand: '/dashboard/brand/overview',
        admin: '/dashboard/admin/overview',
      };
      navigate(routes[role] || '/');
    } catch {
      toast.error('Login failed');
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="font-display font-bold text-3xl text-foreground mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-5">Sign in to your Craftezy account</p>

        {/* Demo Accounts - Quick Access */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3"> Quick Demo Login — Click any role below</p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS_INFO.map(account => (
              <button
                key={account.role}
                onClick={() => loginAsDemo(account.email, account.role)}
                disabled={loadingRole !== null}
                className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left hover:shadow-md transition-all disabled:opacity-60 ${account.color}`}
              >
                <span className="text-xl shrink-0">{account.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold capitalize">{account.role}</p>
                    {loadingRole === account.role && <Loader2 className="w-3 h-3 animate-spin shrink-0 text-primary" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{account.description}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or sign in manually</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="e.g. artisan@craftezy.com" value={email}
              onChange={e => setEmail(e.target.value)} className="h-11 rounded-xl border-border" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <span className="text-xs text-muted-foreground">Demo: password123</span>
            </div>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="password123" value={password}
                onChange={e => setPassword(e.target.value)} className="h-11 rounded-xl border-border pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl btn-primary font-semibold">
            {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</> : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          New to Craftezy?{' '}
          <Link to={ROUTES.REGISTER} className="text-primary font-semibold hover:underline">Create account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
