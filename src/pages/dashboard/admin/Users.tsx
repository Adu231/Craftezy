import { useState } from 'react';
import { Search, Shield, ShieldCheck, ShieldX, Eye, Plus } from 'lucide-react';
import AdminLayout from '@/layouts/role/AdminLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedAt: string;
  avatar: string;
  verified: boolean;
}

const INITIAL_USERS: UserItem[] = [
  { id: 'u1', name: 'Emma Hartwell', email: 'emma@craftezy.com', role: 'artisan', status: 'active', joinedAt: '2022-03-15', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop', verified: true },
  { id: 'u2', name: 'Alex Johnson', email: 'alex@example.com', role: 'customer', status: 'active', joinedAt: '2024-01-10', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop', verified: false },
  { id: 'u3', name: 'Mike Chen', email: 'mike@supplier.com', role: 'supplier', status: 'active', joinedAt: '2021-04-10', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop', verified: true },
  { id: 'u4', name: 'Priya Sharma', email: 'priya@instructor.com', role: 'instructor', status: 'active', joinedAt: '2021-08-20', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop', verified: true },
  { id: 'u5', name: 'New User', email: 'newuser@example.com', role: 'artisan', status: 'pending', joinedAt: '2026-07-09', avatar: '', verified: false },
];

const ROLE_COLORS: Record<string, string> = { customer: 'bg-blue-100 text-blue-800', artisan: 'bg-orange-100 text-orange-800', instructor: 'bg-green-100 text-green-800', supplier: 'bg-yellow-100 text-yellow-800', brand: 'bg-pink-100 text-pink-800', admin: 'bg-red-100 text-red-800' };
const ROLES = ['customer', 'artisan', 'instructor', 'supplier', 'brand', 'admin'];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [showBlockConfirm, setShowBlockConfirm] = useState<UserItem | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [verified, setVerified] = useState(false);

  const handleOpenAdd = () => {
    setName('');
    setEmail('');
    setRole(ROLES[0]);
    setVerified(false);
    setShowAddModal(true);
  };

  const handleOpenEdit = (u: UserItem) => {
    setSelectedUser(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setVerified(u.verified);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Please enter name and email details');
      return;
    }
    const newUser: UserItem = {
      id: `u_${Date.now()}`,
      name,
      email,
      role,
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
      avatar: '',
      verified
    };
    setUsers(prev => [newUser, ...prev]);
    toast.success(`User "${name}" registered successfully!`);
    setShowAddModal(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !name || !email) {
      toast.error('Please enter name and email details');
      return;
    }
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? {
      ...u,
      name,
      email,
      role,
      verified
    } : u));
    toast.success('User details updated successfully!');
    setSelectedUser(null);
  };

  const handleBlockUser = (id: string, name: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'suspended' } : u));
    toast.success(`User account for "${name}" has been suspended.`);
    setShowBlockConfirm(null);
  };

  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-display font-bold text-2xl sm:text-3xl">User Management</h1><p className="text-muted-foreground text-sm mt-1">{users.length} registered users</p></div>
        <Button className="btn-primary rounded-xl gap-2 font-semibold" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Users', value: users.length, color: 'text-blue-600' },
          { label: 'Active Status', value: users.filter(u => u.status === 'active').length, color: 'text-green-600' },
          { label: 'Pending Review', value: users.filter(u => u.status === 'pending').length, color: 'text-red-600' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className={`font-display font-bold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)}
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
                <td className="px-3 py-4"><Badge className={u.status === 'active' ? 'bg-green-100 text-green-800 text-[10px]' : u.status === 'suspended' ? 'bg-red-100 text-red-800 text-[10px]' : 'bg-yellow-100 text-yellow-800 text-[10px]'}>{u.status}</Badge></td>
                <td className="px-3 py-4 text-right">
                  <div className="flex gap-1 justify-end mr-4">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg" onClick={() => handleOpenEdit(u)}><Eye className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50" onClick={() => setShowBlockConfirm(u)}><ShieldX className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-xs text-muted-foreground py-8">No users matched search criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleCreateSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Add New User</h3>
            <p className="text-xs text-muted-foreground mb-4">Manually register a new platform user profile</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="usr-name">Full Name *</Label>
                <Input id="usr-name" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="usr-email">Email Address *</Label>
                <Input id="usr-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="usr-role">Account Role</Label>
                  <select id="usr-role" value={role} onChange={e => setRole(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 capitalize">
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-end pb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
                    <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                    <span>Verified Badge</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Register User
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit User Profile</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify roles and credentials of registered accounts</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="usre-name">Full Name *</Label>
                <Input id="usre-name" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="usre-email">Email Address *</Label>
                <Input id="usre-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="usre-role">Account Role</Label>
                  <select id="usre-role" value={role} onChange={e => setRole(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 capitalize">
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col justify-end pb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
                    <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                    <span>Verified Badge</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setSelectedUser(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Block Confirm Modal */}
      {showBlockConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-red-600 flex items-center gap-2">
              <ShieldX className="w-5 h-5" /> Suspend User Account
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Are you sure you want to suspend the user profile for <strong className="text-foreground">{showBlockConfirm.name}</strong>? This blocks all login credentials.</p>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowBlockConfirm(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button className="rounded-xl bg-red-600 text-white hover:bg-red-700 px-5 border-none" onClick={() => handleBlockUser(showBlockConfirm.id, showBlockConfirm.name)}>
                Suspend Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
