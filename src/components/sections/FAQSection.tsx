import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">FAQ</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Questions &
              <span className="block text-gradient">Answers</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Everything you need to know about selling, buying, and learning on Craftezy.
            </p>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
              <MessageCircle className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2 text-foreground">Still have questions?</h4>
              <p className="text-sm text-muted-foreground mb-4">Our creator support team is available 7 days a week to help you succeed.</p>
              <button className="text-sm font-semibold text-primary hover:underline">Contact Support →</button>
            </div>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between p-5 text-left gap-4 hover:bg-muted/30 transition-colors"
                >
                  <span className="font-semibold text-sm pr-4">{faq.question}</span>
                  <ChevronDown className={cn(
                    'w-4 h-4 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-300',
                    openIndex === i ? 'rotate-180 text-primary' : ''
                  )} />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
