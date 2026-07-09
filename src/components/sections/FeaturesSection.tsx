import { Store, GraduationCap, Sparkles, Users, BarChart3, Package, ShoppingBag, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Store,
    title: 'Artisan Storefront',
    description: 'Build a beautiful custom storefront with drag-and-drop tools. Showcase your brand and attract buyers who love handmade.',
    color: 'primary',
    bg: 'bg-primary/10',
  },
  {
    icon: GraduationCap,
    title: 'DIY Learning Academy',
    description: 'Teach video courses, run live workshops, and earn from your expertise. Issue certifications and build a loyal student community.',
    color: 'secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Sparkles,
    title: 'AI Craft Assistant',
    description: 'Get AI-powered design suggestions, material recommendations, color palette generation, and smart product descriptions.',
    color: 'accent',
    bg: 'bg-accent/15',
  },
  {
    icon: Package,
    title: 'Custom Order System',
    description: 'Accept personalized orders with built-in quoting, milestone tracking, approval workflows, and client communication.',
    color: 'primary',
    bg: 'bg-primary/10',
  },
  {
    icon: ShoppingBag,
    title: 'Materials Marketplace',
    description: 'Buy and sell craft supplies, raw materials, DIY kits, fabric, and art supplies within the same creative ecosystem.',
    color: 'secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Users,
    title: 'Creative Community',
    description: 'Connect with makers, share projects, join craft challenges, collaborate with creators, and get inspired daily.',
    color: 'accent',
    bg: 'bg-accent/15',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Track sales, understand customers, monitor product performance, and get AI recommendations to grow your business.',
    color: 'primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Award,
    title: 'Creator Monetization',
    description: 'Earn through products, courses, workshops, memberships, tips, subscriptions, affiliate programs, and brand collaborations.',
    color: 'secondary',
    bg: 'bg-secondary/10',
  },
];

const COLOR_TEXT: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-[hsl(35,75%,42%)]',
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Platform Features</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Everything a Creative
            <span className="block text-gradient">Business Needs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From selling handmade goods to teaching workshops and building a community — Craftezy has every tool to grow your creative empire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-craft-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${COLOR_TEXT[feature.color]}`} />
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
