import { useState } from 'react';
import { Send, Sparkles, Loader2, RefreshCw, Copy } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const QUICK_PROMPTS = [
  { label: 'Product Description', prompt: 'Write a product description for a handmade ceramic mug with terracotta glaze', icon: '📝' },
  { label: 'Color Palette', prompt: 'Suggest a color palette for my new spring jewelry collection', icon: '🎨' },
  { label: 'Pricing Help', prompt: 'Help me price my macramé wall hanging that takes 4 hours to make', icon: '💰' },
  { label: 'Material Recs', prompt: 'What materials do I need to start making soy candles at home?', icon: '🕯️' },
  { label: 'Project Ideas', prompt: 'Give me 5 unique DIY project ideas for upcycling old denim fabric', icon: '💡' },
  { label: 'Shop Name', prompt: 'Suggest 10 creative shop names for a handmade pottery business', icon: '🏪' },
];

const AI_RESPONSES: Record<string, string> = {
  default: "I'm your Craftezy AI assistant, powered by advanced AI models. I can help you with:\n\n• **Product descriptions** — compelling copy that sells\n• **Pricing guidance** — competitive rates for your time and materials\n• **Color palettes** — harmonious combinations for your collections\n• **Material recommendations** — the best supplies for your craft\n• **Project ideas** — unique concepts to inspire your creativity\n• **Business advice** — grow your artisan store\n\nWhat would you like help with today?",
  product: "Here's a compelling product description for your handmade ceramic mug:\n\n**Terracotta Dreams — Artisan Stoneware Mug**\n\nStart your morning ritual with intention. This hand-thrown stoneware mug is crafted from locally sourced clay, shaped on the wheel, and glazed with a warm terracotta wash that deepens with each use.\n\nEvery curve tells the story of hands at work — the slight variations in glaze, the gentle thumbprint marks at the handle, the perfectly balanced weight. This is not mass-produced perfection. This is *handmade*.\n\n✦ Food-safe, dishwasher-safe\n✦ 14oz capacity\n✦ Made to order — ships in 5-7 days",
  color: "Spring Jewelry Collection — Color Palette Suggestions:\n\n**Option 1: Garden Bloom**\n• Dusty Rose (#D4A5A5)\n• Sage Green (#B2C5B2)\n• Cream (#FFF8F2)\n• Copper accent (#C68642)\n\n**Option 2: Desert Dawn**\n• Terracotta (#C65D3B)\n• Sand (#E8D5B0)\n• Dusty Lavender (#B8A9C9)\n• Gold (#E9A825)\n\n**Option 3: Ocean Mist**\n• Seafoam (#A8C5BD)\n• Soft White (#F5F0E8)\n• Storm Blue (#6B8CAE)\n• Pearl (#F0EAE2)\n\nI'd recommend Option 2 for spring — the warm terracotta and gold will photograph beautifully.",
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: AI_RESPONSES.default, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text?: string) => {
    const content = text || input;
    if (!content.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 1200));

    let response = AI_RESPONSES.default;
    if (content.toLowerCase().includes('description') || content.toLowerCase().includes('product')) response = AI_RESPONSES.product;
    else if (content.toLowerCase().includes('color') || content.toLowerCase().includes('palette')) response = AI_RESPONSES.color;
    else response = `Great question! As your Craftezy AI assistant, here's my advice on "${content}":\n\nBased on successful artisans in our community, I'd recommend starting with research on your target customer. Consider what makes your craft unique, your material costs, time investment, and market positioning.\n\nWould you like me to go deeper on any specific aspect?`;

    setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Craft Assistant
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your personal creative business advisor</p>
        </div>
        <Badge className="bg-primary/10 text-primary gap-1.5">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          AI Online
        </Badge>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-4">
            <h3 className="font-semibold text-sm mb-3">Quick Prompts</h3>
            <div className="space-y-2">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p.prompt)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted text-left transition-colors group"
                >
                  <span className="text-lg">{p.icon}</span>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4">
            <Sparkles className="w-5 h-5 text-primary mb-2" />
            <p className="text-xs font-semibold mb-1">Artisan Plan</p>
            <p className="text-xs text-muted-foreground">42/50 queries used this month</p>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '84%' }} />
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border flex flex-col" style={{ height: '65vh' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={cn(
                  'rounded-2xl px-4 py-3 max-w-lg text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-muted rounded-bl-md'
                )}>
                  <div className="whitespace-pre-line">{msg.content}</div>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                      <button onClick={() => copyText(msg.content)} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                      <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors">
                        <RefreshCw className="w-3 h-3" /> Regenerate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Craftezy AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about pricing, design ideas, materials, product descriptions..."
                className="flex-1 h-11 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-muted/30"
              />
              <Button onClick={() => sendMessage()} disabled={isLoading || !input.trim()} className="btn-primary rounded-xl h-11 w-11 p-0 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
