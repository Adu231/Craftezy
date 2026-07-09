import { HelpCircle, MessageSquare, Book, ChevronRight, Search } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';

const HELP_ARTICLES = [
  { title: 'How to set up your artisan store', category: 'Getting Started', time: '3 min read' },
  { title: 'How to accept custom orders', category: 'Orders', time: '5 min read' },
  { title: 'Understanding your analytics dashboard', category: 'Analytics', time: '4 min read' },
  { title: 'Shipping settings and carrier options', category: 'Shipping', time: '6 min read' },
  { title: 'Creating and promoting workshops', category: 'Workshops', time: '7 min read' },
  { title: 'Withdrawal and payout methods', category: 'Payments', time: '3 min read' },
];

export default function Support() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Support & Help</h1>
        <p className="text-muted-foreground text-sm mt-1">Find answers and get help from our team</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search the help center..."
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-white text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Support Options */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our creator support team. Available Mon-Fri, 9am-6pm EST.', action: 'Start Chat', color: 'text-primary bg-primary/10' },
          { icon: Book, title: 'Help Center', desc: 'Browse our comprehensive documentation and step-by-step guides.', action: 'Browse Docs', color: 'text-secondary bg-secondary/10' },
          { icon: HelpCircle, title: 'Email Support', desc: 'Send us a message and we\'ll respond within 24 hours.', action: 'Send Email', color: 'text-[hsl(35,70%,42%)] bg-accent/15' },
        ].map((opt, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-6 text-center">
            <div className={`w-12 h-12 ${opt.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <opt.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">{opt.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{opt.desc}</p>
            <Button className="btn-primary rounded-xl w-full h-9 text-sm">{opt.action}</Button>
          </div>
        ))}
      </div>

      {/* Articles */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold">Popular Help Articles</h3>
        </div>
        <div className="divide-y divide-border">
          {HELP_ARTICLES.map((article, i) => (
            <button key={i} className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors text-left group">
              <div>
                <div className="font-medium text-sm group-hover:text-primary transition-colors">{article.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{article.category} · {article.time}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
