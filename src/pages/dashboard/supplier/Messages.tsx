import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import SupplierLayout from '@/layouts/role/SupplierLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MOCK_MESSAGES } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function SupplierMessages() {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState(MOCK_MESSAGES[0].id);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [search, setSearch] = useState('');

  const selected = messages.find(m => m.id === selectedId);

  const sendMessage = () => {
    if (!newMessage.trim() || !selected) return;
    const otherUser = selected.sender.id === user?.id ? selected.receiver : selected.sender;
    const reply = {
      id: `msg_${Date.now()}`,
      sender: { id: user!.id, name: user!.name, email: user!.email, role: user!.role, avatar: user?.avatar, joinedAt: user!.joinedAt },
      receiver: otherUser,
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
      isRead: true,
    };
    setMessages(prev => [...prev, reply]);
    setNewMessage('');
  };

  // Unique contacts list
  const contacts = messages.reduce((acc, msg) => {
    const otherUser = msg.sender.id === user?.id ? msg.receiver : msg.sender;
    if (otherUser.id !== user?.id && !acc.some(c => c.user.id === otherUser.id)) {
      acc.push({
        id: msg.id,
        user: otherUser,
        lastMessage: msg.content,
        isRead: msg.isRead
      });
    }
    return acc;
  }, [] as Array<{ id: string; user: typeof user; lastMessage: string; isRead: boolean }>);

  const filteredContacts = contacts.filter(c => 
    c.user.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  // Selected thread messages
  const activeContact = selected 
    ? (selected.sender.id === user?.id ? selected.receiver : selected.sender)
    : null;

  const chatThread = selected && activeContact
    ? messages.filter(m => 
        (m.sender.id === activeContact.id && m.receiver.id === user?.id) ||
        (m.sender.id === user?.id && m.receiver.id === activeContact.id)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  return (
    <SupplierLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">Chat with artisans and buyers</p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ height: '65vh' }}>
        <div className="flex h-full">
          {/* Contacts Sidebar */}
          <div className="w-64 sm:w-72 border-r border-border flex flex-col shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input 
                  placeholder="Search..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full h-9 pl-8 pr-3 rounded-xl border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setSelectedId(c.id)}
                  className={cn('w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors text-left',
                    selectedId === c.id && 'bg-primary/5 border-r-2 border-primary'
                  )}
                >
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarImage src={c.user.avatar} />
                    <AvatarFallback className="text-xs">{c.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{c.user.name}</span>
                      {!c.isRead && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </button>
              ))}
              {filteredContacts.length === 0 && (
                <p className="text-xs text-muted-foreground text-center p-4">No conversations found</p>
              )}
            </div>
          </div>

          {/* Active Chat Thread */}
          {selected && activeContact ? (
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-white">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activeContact.avatar} />
                  <AvatarFallback className="text-xs">{activeContact.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{activeContact.name}</div>
                  <div className="text-xs text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full" />Online
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/10">
                {chatThread.map(msg => {
                  const isMe = msg.sender.id === user?.id;
                  if (!isMe) {
                    return (
                      <div key={msg.id} className="flex items-end gap-2.5">
                        <Avatar className="w-7 h-7 shrink-0">
                          <AvatarImage src={msg.sender.avatar} />
                          <AvatarFallback className="text-xs">{msg.sender.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2.5 max-w-sm border border-border shadow-sm">
                          <p className="text-sm text-foreground">{msg.content}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={msg.id} className="flex items-end gap-2.5 justify-end">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2.5 max-w-sm shadow-sm">
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-[10px] text-white/60 mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              
              <div className="p-4 border-t border-border bg-white">
                <div className="flex items-center gap-3">
                  <input 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Type a message..." 
                    className="flex-1 h-11 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30" 
                  />
                  <Button onClick={sendMessage} className="btn-primary rounded-xl h-11 w-11 p-0 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/5">
              <span className="text-4xl mb-2">💬</span>
              <p className="text-sm font-semibold">Select a conversation</p>
              <p className="text-xs text-muted-foreground">Select an artisan thread from the left menu to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </SupplierLayout>
  );
}
