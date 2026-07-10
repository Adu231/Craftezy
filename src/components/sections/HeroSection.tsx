import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Sparkles, TrendingUp, Paintbrush, Package, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import heroImg from '@/assets/hero-crafts.jpg';
import workshopImg from '@/assets/artisan-workshop.jpg';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/4 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">AI-Powered Creative Marketplace</span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6">
              Where Every
              <span className="block text-gradient">Craft Tells</span>
              a Story
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Join 50,000+ artisans on the world's most creative marketplace. Sell handmade products, teach DIY skills, and build your creative empire with the power of AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" className="btn-primary shadow-craft-lg h-12 px-7 text-base rounded-xl group">
                  Start Selling Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={ROUTES.MARKETPLACE}>
                <Button variant="outline" size="lg" className="h-12 px-7 text-base rounded-xl border-border hover:border-primary hover:text-primary gap-2 group">
                  <Play className="w-4 h-4 group-hover:text-primary transition-colors" />
                  Explore Marketplace
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-accent fill-current" />
                  ))}
                  <span className="ml-1 text-sm font-bold">4.9</span>
                </div>
                <p className="text-xs text-muted-foreground">Loved by 500K+ customers worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-craft-lg">
              <img src={heroImg} alt="Craftezy Marketplace" className="w-full h-[480px] lg:h-[560px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-6 top-1/4 glass rounded-2xl p-4 shadow-craft-lg hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img src={workshopImg} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold">New Order!</p>
                  <p className="text-[10px] text-muted-foreground">Stoneware Mug Set</p>
                  <p className="text-xs font-bold text-primary mt-0.5">$68.00</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 glass rounded-2xl p-4 shadow-craft-lg hidden sm:block">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold text-secondary">+42% this month</span>
              </div>
              <div className="text-xs text-muted-foreground">Revenue Growing</div>
              <div className="font-display font-bold text-lg">$6,200</div>
            </div>

            <div className="absolute top-4 right-4 glass rounded-xl px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-xs font-semibold">2,840 artisans online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Active Artisans', value: '50,000+', icon: Paintbrush, color: 'text-primary' },
            { label: 'Products Listed', value: '2M+', icon: Package, color: 'text-secondary' },
            { label: 'Happy Customers', value: '500K+', icon: Heart, color: 'text-accent' },
            { label: 'Countries', value: '85+', icon: Globe, color: 'text-blue-600' },
          ].map(stat => (
            <div key={stat.label} className="text-center glass rounded-2xl p-5 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
