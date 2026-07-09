import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import ArtisanLayout from '@/layouts/role/ArtisanLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MOCK_MESSAGES } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function ArtisanMessages() {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState(MOCK_MESSAGES[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const selected = messages.find(m => m.id === selectedId);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const reply = {
      id: `msg_${Date.now()}`,
      sender: { id: user!.id, name: user!.name, email: user!.email, role: user!.role, avatar: user?.avatar, joinedAt: user!.joinedAt },
      receiver: selected!.sender,
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
      isRead: true,
    };
    setMessages(prev => [...prev, reply]);
    setNewMessage('');
  };

  return (
    <ArtisanLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Chat with your customers</p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ height: '65vh' }}>
        <div className="flex h-full">
          <div className="w-64 sm:w-72 border-r border-border flex flex-col shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input placeholder="Search..." className="w-full h-9 pl-8 pr-3 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages.filter((m, i, arr) => arr.findIndex(x => x.sender.id === m.sender.id && m.sender.id !== user?.id) === i && m.sender.id !== user?.id).map(msg => (
                <button key={msg.id} onClick={() => setSelectedId(msg.id)}
                  className={cn('w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors text-left',
                    selectedId === msg.id && 'bg-primary/5 border-r-2 border-primary')}>
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarImage src={msg.sender.avatar} />
                    <AvatarFallback className="text-xs">{msg.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{msg.sender.name}</span>
                      {!msg.isRead && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.content}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selected && (
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={selected.sender.avatar} />
                  <AvatarFallback className="text-xs">{selected.sender.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{selected.sender.name}</div>
                  <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full" />Online
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-end gap-2.5">
                  <Avatar className="w-7 h-7 shrink-0">
                    <AvatarImage src={selected.sender.avatar} />
                    <AvatarFallback className="text-xs">{selected.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-sm">
                    <p className="text-sm">{selected.content}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {new Date(selected.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                {messages.filter(m => m.sender.id === user?.id).map(msg => (
                  <div key={msg.id} className="flex items-end gap-2.5 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-sm">
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] text-white/60 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <input value={newMessage} onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Type a message..." className="flex-1 h-11 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30" />
                  <Button onClick={sendMessage} className="btn-primary rounded-xl h-11 w-11 p-0 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ArtisanLayout>
  );
}
