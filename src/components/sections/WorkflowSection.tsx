import { WORKFLOW_STEPS } from '@/constants';
import { Store, Sparkles, Globe, TrendingUp } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  '01': Store,
  '02': Sparkles,
  '03': Globe,
  '04': TrendingUp,
};

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-[hsl(20,20%,10%)] text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[hsl(16,60%,65%)] mb-3 uppercase tracking-wider">How It Works</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            From Craft to
            <span className="text-[hsl(16,60%,65%)]"> Creative Business</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Start your creative business journey in 4 simple steps. No technical skills required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    const IconComp = ICON_MAP[step.step];
                    return IconComp ? <IconComp className="w-8 h-8 text-primary" /> : null;
                  })()}
                </div>
                <div className="text-[hsl(16,60%,65%)] text-xs font-bold mb-2 uppercase tracking-widest">{step.step}</div>
                <h3 className="font-semibold text-base mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
