import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import BrandLayout from '@/layouts/role/BrandLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CONVS = [
  { id: 'c1', name: 'Emma Hartwell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', msg: 'Loved the brief! When do we start?', unread: true },
  { id: 'c2', name: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', msg: 'I have a few questions about the campaign', unread: true },
  { id: 'c3', name: 'Marco Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', msg: 'Content is ready for review', unread: false },
];

interface Message {
  conversationId: string;
  from: 'me' | 'them';
  text: string;
}

export default function BrandMessages() {
  const [sel, setSel] = useState(CONVS[0]);
  const [input, setInput] = useState('');
  
  // Store chat history per creator conversation ID
  const [msgs, setMsgs] = useState<Message[]>([
    { conversationId: 'c1', from: 'them', text: 'Hi, I received the sponsorship brief.' },
    { conversationId: 'c1', from: 'me', text: 'Awesome! Let me know if you have any questions.' },
    { conversationId: 'c1', from: 'them', text: 'Loved the brief! When do we start?' },
    
    { conversationId: 'c2', from: 'them', text: 'I have a few questions about the campaign' },
    
    { conversationId: 'c3', from: 'them', text: 'Uploading the drafts now.' },
    { conversationId: 'c3', from: 'me', text: 'Thanks Marco. Looking forward to review.' },
    { conversationId: 'c3', from: 'them', text: 'Content is ready for review' },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(p => [...p, { conversationId: sel.id, from: 'me', text: input.trim() }]);
    setInput('');
  };

  const activeMsgs = msgs.filter(m => m.conversationId === sel.id);

  return (
    <BrandLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Creator communications</p>
      </div>
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ height: '65vh' }}>
        <div className="flex h-full">
          {/* Contacts list */}
          <div className="w-64 sm:w-72 border-r border-border flex flex-col shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input placeholder="Search..." className="w-full h-9 pl-8 pr-3 rounded-xl border border-border text-xs focus:outline-none bg-muted/30" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CONVS.map(c => {
                const thread = msgs.filter(m => m.conversationId === c.id);
                const lastMsgText = thread.length > 0 ? thread[thread.length - 1].text : c.msg;
                return (
                  <button key={c.id} onClick={() => setSel(c)}
                    className={cn('w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors text-left', 
                      sel.id === c.id && 'bg-primary/5 border-r-2 border-pink-500')}
                  >
                    <Avatar className="w-9 h-9 shrink-0">
                      <AvatarImage src={c.avatar} />
                      <AvatarFallback>{c.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{c.name}</span>
                        {c.unread && sel.id !== c.id && <span className="w-2 h-2 bg-pink-500 rounded-full shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{lastMsgText}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Active Chat box */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-white">
              <Avatar className="w-8 h-8">
                <AvatarImage src={sel.avatar} />
                <AvatarFallback>{sel.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">{sel.name}</div>
                <div className="text-xs text-muted-foreground">Creator</div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/5">
              {activeMsgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : ''}`}>
                  <div className={`max-w-sm rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === 'me' 
                      ? 'bg-pink-600 text-white rounded-br-md shadow-sm' 
                      : 'bg-white text-foreground border border-border rounded-bl-md shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border flex gap-3 bg-white">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Message creator..." className="flex-1 h-11 px-4 rounded-xl border border-border text-sm focus:outline-none bg-muted/30" />
              <Button onClick={send} className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl h-11 w-11 p-0 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BrandLayout>
  );
}
