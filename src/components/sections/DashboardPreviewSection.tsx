import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Package, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import dashboardImg from '@/assets/dashboard-preview.jpg';

export default function DashboardPreviewSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Creator Dashboard</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Your Creative Business,
              <span className="block text-gradient">At a Glance</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Monitor sales, manage orders, track analytics, and grow your business from one beautiful dashboard. Everything you need, nothing you don't.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: BarChart3, label: 'Sales Analytics', desc: 'Real-time revenue tracking', color: 'text-primary', bg: 'bg-primary/10' },
                { icon: Package, label: 'Inventory Manager', desc: 'Smart stock tracking', color: 'text-secondary', bg: 'bg-secondary/10' },
                { icon: ShoppingCart, label: 'Order Management', desc: 'From order to delivery', color: 'text-[hsl(35,75%,42%)]', bg: 'bg-accent/15' },
                { icon: TrendingUp, label: 'Growth Insights', desc: 'AI recommendations', color: 'text-primary', bg: 'bg-primary/10' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors">
                  <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to={ROUTES.REGISTER}>
              <Button size="lg" className="btn-primary rounded-xl h-12 px-7 group">
                Launch Your Dashboard
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img src={dashboardImg} alt="Craftezy Dashboard" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl" />
            </div>

            {/* Floating Stat Cards */}
            <div className="absolute -left-8 top-1/3 glass rounded-xl p-4 shadow-craft-lg hidden md:block">
              <div className="text-xs text-muted-foreground mb-1">This Month</div>
              <div className="font-display font-bold text-xl text-primary">$6,200</div>
              <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                <TrendingUp className="w-3 h-3" />
                +42% vs last month
              </div>
            </div>

            <div className="absolute -right-6 bottom-1/3 glass rounded-xl p-4 shadow-craft-lg hidden md:block">
              <div className="text-xs text-muted-foreground mb-1">Active Orders</div>
              <div className="font-display font-bold text-xl">48</div>
              <div className="text-xs text-muted-foreground mt-1">12 need attention</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
