import { Link } from 'react-router-dom';
import { ArrowRight, Gem, Home, Brush, Scissors, Palette, Hammer, Flame, FileText } from 'lucide-react';
import { PRODUCT_CATEGORIES, ROUTES } from '@/constants';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  jewelry: Gem,
  'home-decor': Home,
  pottery: Brush,
  textile: Scissors,
  painting: Palette,
  woodworking: Hammer,
  candles: Flame,
  paper: FileText,
};

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Browse by Category</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Explore Every Craft
            </h2>
          </div>
          <Link to={ROUTES.MARKETPLACE} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`${ROUTES.MARKETPLACE}?category=${cat.name}`}
              className="group flex flex-col items-center text-center p-4 rounded-2xl border border-border hover:border-primary/30 hover:shadow-craft bg-card transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                {(() => {
                  const IconComp = ICON_MAP[cat.slug];
                  return IconComp ? <IconComp className="w-6 h-6" /> : null;
                })()}
              </div>
              <div className="text-xs font-semibold text-foreground leading-tight mb-1">{cat.name}</div>
              <div className="text-[10px] text-muted-foreground">{cat.productCount.toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
