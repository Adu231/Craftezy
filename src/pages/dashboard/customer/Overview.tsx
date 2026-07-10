import { ShoppingBag, Heart, Star, Package, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/services/mockData';
import { ROUTES } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CustomerOverview() {
  const { user } = useAuth();
  const recentOrders = MOCK_ORDERS.slice(0, 3);

  return (
    <CustomerLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">
          Welcome back, {user?.name?.split(' ')[0]}! 
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your shopping activity at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
          { label: 'Wishlist Items', value: '8', icon: Heart, color: 'text-pink-600 bg-pink-50' },
          { label: 'Reviews Written', value: '5', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Active Deliveries', value: '2', icon: MapPin, color: 'text-green-600 bg-green-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent Orders</h3>
            <Link to={ROUTES.CUSTOMER_ORDERS} className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={order.product.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{order.product.title}</p>
                  <p className="text-xs text-muted-foreground">Order #{order.id} · {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-sm">${order.totalPrice}</div>
                  <Badge className={`text-[10px] mt-1 ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Browse Marketplace', href: ROUTES.MARKETPLACE, icon: Package },
                { label: 'Track My Orders', href: ROUTES.CUSTOMER_ORDERS, icon: MapPin },
                { label: 'My Wishlist', href: ROUTES.CUSTOMER_WISHLIST, icon: Heart },
                { label: 'Write a Review', href: ROUTES.CUSTOMER_REVIEWS, icon: Star },
              ].map((a, i) => (
                <Link key={i} to={a.href}>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
                    <a.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{a.label}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-3 text-sm">Recommended For You</h3>
            <div className="space-y-3">
              {MOCK_PRODUCTS.slice(0, 2).map(p => (
                <Link key={p.id} to={ROUTES.MARKETPLACE} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">{p.title}</p>
                    <p className="text-xs text-primary font-bold">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
