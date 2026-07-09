import { useState } from 'react';
import { Heart, MessageCircle, Share2, UserPlus, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const MY_POSTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop', likes: 284, comments: 42 },
  { id: 2, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', likes: 156, comments: 18 },
  { id: 3, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop', likes: 94, comments: 11 },
  { id: 4, image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=400&fit=crop', likes: 201, comments: 34 },
  { id: 5, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', likes: 167, comments: 22 },
  { id: 6, image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=400&fit=crop', likes: 88, comments: 9 },
];

export default function CommunityDashboard() {
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Community</h1>
        <p className="text-muted-foreground text-sm mt-1">Your presence in the Craftezy creator community</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-xl font-bold bg-primary text-white">{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-semibold text-lg">{user?.name}</h2>
              {user?.isVerified && <Badge className="bg-secondary/10 text-secondary text-xs">✓ Verified</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{user?.bio}</p>
            <div className="flex gap-6 text-sm">
              <div><span className="font-bold">{user?.followers?.toLocaleString()}</span> <span className="text-muted-foreground">followers</span></div>
              <div><span className="font-bold">{user?.following}</span> <span className="text-muted-foreground">following</span></div>
              <div><span className="font-bold">6</span> <span className="text-muted-foreground">posts</span></div>
            </div>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2"><Share2 className="w-4 h-4" />Share Profile</Button>
            <Button className="btn-primary rounded-xl gap-2"><UserPlus className="w-4 h-4" />Invite</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Likes', value: '990', icon: '❤️' },
          { label: 'Comments', value: '136', icon: '💬' },
          { label: 'Profile Views', value: '4.2K', icon: '👁️' },
          { label: 'Reach', value: '12K', icon: '📡' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-display font-bold text-xl">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">My Posts</h3>
          <Button className="btn-primary rounded-xl h-8 text-xs px-4">+ New Post</Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MY_POSTS.map(post => (
            <div key={post.id} className="group relative rounded-xl overflow-hidden aspect-square bg-muted">
              <img src={post.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setLikedPosts(p => p.includes(post.id) ? p.filter(id => id !== post.id) : [...p, post.id])}
                  className="flex items-center gap-1 text-white text-xs font-semibold"
                >
                  <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-current text-red-400' : ''}`} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 text-white text-xs font-semibold">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
