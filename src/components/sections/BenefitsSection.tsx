import { CheckCircle2, ArrowRight, Paintbrush, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import workshopImg from '@/assets/artisan-workshop.jpg';
import productsImg from '@/assets/products-display.jpg';

const ARTISAN_BENEFITS = [
  '0% transaction fees on your first 10 sales',
  'AI-powered description & catalog management builder',
  'Live interactive workshops setup in 2 minutes',
  'Automated shipping labels & global delivery integrations',
];

const BUYER_BENEFITS = [
  'Buy verified products directly from local makers',
  'One-click secure milestones custom commissioning',
  'Learn craft skills directly from leading instructors',
  'Direct communication channel with all global artisans',
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Why Craftezy</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Built for Every
            <span className="block text-gradient">Creative Journey</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <Paintbrush className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">For Artisans & Makers</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-4 text-foreground">
              Turn Your Passion Into a Profitable Business
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Craftezy gives every artisan the tools and audience to build a thriving creative business — from your first listing to your first thousand customers.
            </p>
            <ul className="space-y-3 mb-8">
              {ARTISAN_BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link to={ROUTES.REGISTER}>
              <Button className="btn-primary rounded-xl h-11 px-6 group">
                Start Selling Today
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-craft-lg">
              <img src={workshopImg} alt="Artisan working" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-craft">
              <div className="text-sm font-semibold mb-1">Average Monthly Revenue</div>
              <div className="font-display font-bold text-3xl text-primary">$6,200</div>
              <div className="text-xs text-muted-foreground">for Artisan plan sellers</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="rounded-3xl overflow-hidden shadow-craft-lg">
              <img src={productsImg} alt="Handmade products" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-craft">
              <div className="text-sm font-semibold mb-1">Unique Handmade Products</div>
              <div className="font-display font-bold text-3xl text-secondary">2M+</div>
              <div className="text-xs text-muted-foreground">from 85+ countries</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
              <Gift className="w-4 h-4 text-secondary" />
              <span className="text-xs font-semibold text-secondary">For Buyers & Learners</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-4 text-foreground">
              Discover Crafts That Tell Your Story
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Find one-of-a-kind handmade treasures, commission custom pieces directly from artisans, and learn the skills to create your own.
            </p>
            <ul className="space-y-3 mb-8">
              {BUYER_BENEFITS.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
