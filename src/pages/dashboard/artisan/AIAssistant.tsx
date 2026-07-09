import { useState } from 'react';
import { Sparkles, Send, RotateCcw, Copy, Wand2, Palette, DollarSign, FileText } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const QUICK_PROMPTS = [
  { icon: FileText, label: 'Write Product Description', prompt: 'Write a compelling product description for a handmade stoneware mug set with terracotta glaze' },
  { icon: Palette, label: 'Color Palette Ideas', prompt: 'Suggest 5 color palette combinations for a boho macramé wall hanging' },
  { icon: DollarSign, label: 'Price My Product', prompt: 'Help me price a handmade ceramic vase that takes 4 hours to make with $12 material cost' },
  { icon: Wand2, label: 'Design Suggestions', prompt: 'Give me 5 creative design ideas for a summer jewelry collection using natural materials' },
];

const SAMPLE_RESPONSES: Record<string, string> = {
  'Write Product Description': `**Handcrafted Stoneware Mug Set — Terracotta Dreams**

Each mug in this set of four is a unique piece of functional art, lovingly thrown on the wheel and finished with our signature warm terracotta glaze. 

✨ **What makes these special:**
- Hand-thrown on the pottery wheel — no two are identical
- Food-safe terracotta glaze with rich, earthy tones
- Comfortable handle designed for a natural grip
- Microwave and dishwasher safe
- Holds approximately 12oz

Perfect for cozy morning rituals, afternoon tea, or as a thoughtful gift for the craft lover in your life. The slight variations in glaze and form are what make each piece authentically handmade.`,

  'Color Palette Ideas': `Here are 5 stunning color palettes for your boho macramé wall hanging:

**1. Desert Sunset** 🌅
Terracotta · Burnt Sienna · Warm Sand · Ivory · Deep Rust

**2. Sage Garden** 🌿  
Sage Green · Dusty Olive · Cream · Warm White · Moss

**3. Ocean Drift** 🌊
Navy Blue · Driftwood Gray · Pale Blue · Ivory · Rope Natural

**4. Golden Hour** ✨
Mustard Yellow · Ochre · Warm Tan · Off-White · Rust

**5. Midnight Blooms** 🌸
Deep Plum · Dusty Rose · Blush · Warm Gray · Cream`,

  'Price My Product': `Based on your inputs, here's my pricing recommendation:

**Cost Breakdown:**
- Materials: $12.00
- Labor (4 hrs × $25/hr): $100.00
- Platform fee (2%): ~$2.24
- Packaging & shipping materials: $3.50
- **Total Cost: $117.74**

**Recommended Price Range:**
- **Entry Price:** $125 (7% profit margin)
- **Sweet Spot:** $148 (20% margin) ✓ Recommended
- **Premium Price:** $185 (for featured/bestseller)

**Rationale:** Similar handmade ceramic vases on the platform sell between $95-$220. At $148, you're positioned in the mid-range with room to grow.`,

  'Design Suggestions': `Here are 5 fresh design directions for your summer jewelry collection:

**1. Coastal Botanicals**
Press actual dried flowers and ferns into resin pendants. Pair with sterling silver chain.

**2. Sun & Shell**
Wire-wrapped puka shells with gold-filled wire. Perfect summer vibes.

**3. Clay Suns**
Hand-sculpted polymer clay sun charms in terracotta, mustard, and blush.

**4. Raw Crystal Hoops**
Tiny raw citrine, sunstone, or carnelian wrapped onto hammered gold hoops.

**5. Linen & Bead**
Natural linen cord friendship bracelets with handmade glass seed beads.`,
};

export default function ArtisanAIAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm your AI Craft Assistant. I can help you with product descriptions, design ideas, pricing strategies, color palettes, and more. What would you like help with today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setInput('');
    setIsLoading(true);

    await new Promise(r => setTimeout(r, 1200));

    const matchedKey = Object.keys(SAMPLE_RESPONSES).find(k => 
      messageText.toLowerCase().includes(k.toLowerCase().split(' ')[0])
    );
    const response = matchedKey ? SAMPLE_RESPONSES[matchedKey] :
      `Great question! Here's some craft insight for "${messageText}":\n\nAs a craft expert, I'd recommend starting with your material costs and time investment, then research comparable handmade items in the marketplace. Consider your unique story and the emotional value your piece brings — handmade always commands a premium when marketed correctly.\n\nWould you like me to help with anything more specific?`;

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <ArtisanLayout>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl">AI Craft Assistant</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Your creative AI partner for product ideas, pricing & more</p>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {QUICK_PROMPTS.map((p, i) => (
          <button key={i} onClick={() => sendMessage(p.prompt)}
            className="flex items-center gap-2.5 p-3.5 bg-card border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group">
            <p.icon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium group-hover:text-primary transition-colors">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ height: '55vh' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 h-[calc(100%-73px)]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user' ? 'bg-primary text-white rounded-br-md' : 'bg-muted rounded-bl-md'
              }`}>
                {msg.content}
                {msg.role === 'assistant' && (
                  <button className="flex items-center gap-1 text-[10px] text-muted-foreground mt-2 hover:text-foreground transition-colors"
                    onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Copied!'); }}>
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setMessages([{ role: 'assistant', content: "Hi! I'm your AI Craft Assistant. How can I help you today?" }])}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors shrink-0">
              <RotateCcw className="w-4 h-4" />
            </button>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask me anything about crafts, pricing, design..."
              className="flex-1 h-10 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <Button onClick={() => sendMessage()} disabled={!input.trim()} className="btn-primary rounded-xl h-10 w-10 p-0 shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </ArtisanLayout>
  );
}
