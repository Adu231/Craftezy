import { CheckCircle2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRICING_PLANS, ROUTES } from '@/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export default function PricingSection() {
  const { isAuthenticated } = useAuth();

  const getDestination = (plan: typeof PRICING_PLANS[0]) => {
    if (!isAuthenticated) return ROUTES.REGISTER;
    if (plan.price === 0) return ROUTES.DASHBOARD;
    return '/checkout';
  };

  const getLinkState = (plan: typeof PRICING_PLANS[0]) => {
    if (isAuthenticated && plan.price > 0) {
      return { type: 'subscription', planName: plan.name, price: plan.price };
    }
    return undefined;
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Pricing</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Simple, Transparent
            <span className="block text-gradient">Pricing for Creators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free. Scale when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-craft-lg',
                plan.isPopular
                  ? 'border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-craft scale-105'
                  : `${plan.color} bg-card hover:-translate-y-1`
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1 rounded-full text-xs font-semibold shadow-craft">
                    <Zap className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-4xl text-foreground">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className={cn('w-4 h-4 shrink-0 mt-0.5', plan.isPopular ? 'text-primary' : 'text-secondary')} />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={getDestination(plan)} state={getLinkState(plan)}>
                <Button
                  className={cn(
                    'w-full rounded-xl h-11 font-semibold',
                    plan.isPopular ? 'btn-primary shadow-craft' : 'border border-border bg-muted/50 hover:bg-muted text-foreground'
                  )}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All plans include buyer protection, secure payments, and 24/7 platform uptime. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
