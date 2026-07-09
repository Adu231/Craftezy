import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CONVERSATIONS = [
  { id: 'm1', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', lastMsg: 'Thank you for the certificate!', time: '10:30', unread: true },
  { id: 'm2', name: 'Bob Williams', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', lastMsg: 'Can you help with lesson 8?', time: '09:15', unread: true },
  { id: 'm3', name: 'Carol Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', lastMsg: 'Workshop was amazing!', time: 'Yesterday', unread: false },
];

interface Message {
  conversationId: string;
  from: 'me' | 'them';
  text: string;
}

export default function InstructorMessages() {
  const [selected, setSelected] = useState(CONVERSATIONS[0]);
  const [input, setInput] = useState('');
  
  // Store chat history isolated per conversation id
  const [msgs, setMsgs] = useState<Message[]>([
    { conversationId: 'm1', from: 'them', text: 'Hello instructor, hope you are doing well!' },
    { conversationId: 'm1', from: 'me', text: 'Hi Alice, how can I help you?' },
    { conversationId: 'm1', from: 'them', text: 'Thank you for the certificate!' },
    
    { conversationId: 'm2', from: 'them', text: 'Hi, I had a question on intermediate macramé.' },
    { conversationId: 'm2', from: 'me', text: 'Sure Bob, ask away!' },
    { conversationId: 'm2', from: 'them', text: 'Can you help with lesson 8?' },
    
    { conversationId: 'm3', from: 'them', text: 'Just completed the dye session.' },
    { conversationId: 'm3', from: 'me', text: 'How did you find the natural color mixing?' },
    { conversationId: 'm3', from: 'them', text: 'Workshop was amazing!' },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { conversationId: selected.id, from: 'me', text: input.trim() }]);
    setInput('');
  };

  const activeMsgs = msgs.filter(m => m.conversationId === selected.id);

  return (
    <InstructorLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Student communications</p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ height: '65vh' }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 sm:w-72 border-r border-border flex flex-col shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input placeholder="Search..." className="w-full h-9 pl-8 pr-3 rounded-xl border border-border text-xs focus:outline-none bg-muted/30" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CONVERSATIONS.map(conv => {
                const thread = msgs.filter(m => m.conversationId === conv.id);
                const lastMessageText = thread.length > 0 ? thread[thread.length - 1].text : conv.lastMsg;
                return (
                  <button key={conv.id} onClick={() => setSelected(conv)}
                    className={cn('w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors text-left',
                      selected.id === conv.id && 'bg-primary/5 border-r-2 border-primary')}>
                    <Avatar className="w-9 h-9 shrink-0"><AvatarImage src={conv.avatar} /><AvatarFallback>{conv.name[0]}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{conv.name}</span>
                        <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{lastMessageText}</p>
                        {conv.unread && selected.id !== conv.id && <span className="w-2 h-2 bg-primary rounded-full shrink-0 ml-1" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chat box */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-white">
              <Avatar className="w-8 h-8"><AvatarImage src={selected.avatar} /><AvatarFallback>{selected.name[0]}</AvatarFallback></Avatar>
              <div><div className="font-semibold text-sm">{selected.name}</div><div className="text-xs text-muted-foreground">Student</div></div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/5">
              {activeMsgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : ''}`}>
                  <div className={`max-w-sm rounded-2xl px-4 py-2.5 text-sm ${m.from === 'me' ? 'bg-secondary text-white rounded-br-md shadow-sm' : 'bg-white text-foreground border border-border rounded-bl-md shadow-sm'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border flex gap-3 bg-white">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type a reply..." className="flex-1 h-11 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 bg-muted/30" />
              <Button onClick={send} className="bg-secondary hover:bg-secondary/90 text-white rounded-xl h-11 w-11 p-0 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
