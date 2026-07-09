import { useState } from 'react';
import { Search, Shield, ShieldCheck, ShieldX, Eye } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const USERS = [
  { id: 'u1', name: 'Emma Hartwell', email: 'emma@craftezy.com', role: 'artisan', status: 'active', joinedAt: '2022-03-15', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', verified: true },
  { id: 'u2', name: 'Alex Johnson', email: 'alex@example.com', role: 'customer', status: 'active', joinedAt: '2024-01-10', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop', verified: false },
  { id: 'u3', name: 'Mike Chen', email: 'mike@supplier.com', role: 'supplier', status: 'active', joinedAt: '2021-04-10', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', verified: true },
  { id: 'u4', name: 'Priya Sharma', email: 'priya@instructor.com', role: 'instructor', status: 'active', joinedAt: '2021-08-20', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', verified: true },
  { id: 'u5', name: 'New User', email: 'newuser@example.com', role: 'artisan', status: 'pending', joinedAt: '2026-07-09', avatar: '', verified: false },
];

const ROLE_COLORS: Record<string, string> = { customer: 'bg-blue-100 text-blue-800', artisan: 'bg-orange-100 text-orange-800', instructor: 'bg-green-100 text-green-800', supplier: 'bg-yellow-100 text-yellow-800', brand: 'bg-pink-100 text-pink-800', admin: 'bg-red-100 text-red-800' };

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(USERS);
  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">User Management</h1><p className="text-muted-foreground text-sm mt-1">{users.length} registered users</p></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Users', value: '52,480', color: 'text-blue-600' },
          { label: 'Active Today', value: '1,240', color: 'text-green-600' },
          { label: 'Pending Review', value: '12', color: 'text-red-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className={`font-display font-bold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">User</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden md:table-cell">Role</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3 hidden lg:table-cell">Joined</th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">Status</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8"><AvatarImage src={u.avatar} /><AvatarFallback className="text-xs">{u.name[0]}</AvatarFallback></Avatar>
                    <div>
                      <div className="flex items-center gap-2"><p className="text-sm font-medium">{u.name}</p>{u.verified && <ShieldCheck className="w-3.5 h-3.5 text-secondary" />}</div>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 hidden md:table-cell"><Badge className={`text-[10px] capitalize ${ROLE_COLORS[u.role] || 'bg-gray-100 text-gray-800'}`}>{u.role}</Badge></td>
                <td className="px-3 py-4 hidden lg:table-cell"><span className="text-xs text-muted-foreground">{new Date(u.joinedAt).toLocaleDateString()}</span></td>
                <td className="px-3 py-4"><Badge className={u.status === 'active' ? 'bg-green-100 text-green-800 text-[10px]' : 'bg-yellow-100 text-yellow-800 text-[10px]'}>{u.status}</Badge></td>
                <td className="px-3 py-4">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => toast.info('User details coming soon')}><Eye className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-red-400" onClick={() => { setUsers(p => p.filter(x => x.id !== u.id)); toast.success('User removed'); }}><ShieldX className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
