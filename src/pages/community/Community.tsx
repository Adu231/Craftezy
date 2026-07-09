import { useState } from 'react';
import { MessageSquare, Heart, Share2, Search, ArrowUpRight, Flame, Plus, Users, Award } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: string;
}

export default function Community() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({
    'post-1': { count: 34, liked: false },
    'post-2': { count: 18, liked: false },
    'post-3': { count: 27, liked: false },
  });
  
  const posts: Post[] = [
    {
      id: 'post-1',
      author: {
        name: 'Emma Hartwell',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
        role: 'Artisan',
      },
      content: 'Just finished firing a new batch of stoneware mugs! Experimented with a copper green glaze this time and the results are amazing. Can\'t wait to list them on my store tomorrow!',
      likes: 34,
      comments: 8,
      tags: ['Pottery', 'GlazeExperiment', 'ArtisanLife'],
      createdAt: '2 hours ago',
    },
    {
      id: 'post-2',
      author: {
        name: 'Jordan Lee',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face',
        role: 'Learner',
      },
      content: 'Struggling with the square knot pattern on my second macramé plant hanger. Anyone have good tutorials or tips for maintaining consistent tension?',
      likes: 18,
      comments: 12,
      tags: ['MacraméHelp', 'BeginnerCrafts'],
      createdAt: '5 hours ago',
    },
    {
      id: 'post-3',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        role: 'Instructor',
      },
      content: 'Excited to announce my new Live Weaving Workshop starting next month! We will cover loom warping and basic weaving structures. Registration opens this Friday.',
      likes: 27,
      comments: 4,
      tags: ['Weaving', 'Workshop', 'FiberArt'],
      createdAt: '1 day ago',
    },
  ];

  const handleLike = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to react to posts');
      navigate('/login');
      return;
    }
    setLikesState(prev => {
      const current = prev[id] || { count: 0, liked: false };
      return {
        ...prev,
        [id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
    toast.success('Interaction recorded!');
  };

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(search.toLowerCase()) ||
    post.author.name.toLowerCase().includes(search.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Community Posts */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-border shadow-craft-sm">
                <h1 className="font-display font-bold text-3xl text-foreground mb-2">Community Feed</h1>
                <p className="text-muted-foreground text-sm mb-6">Connect with fellow makers, share your creations, and ask questions.</p>
                
                <div className="flex gap-4">
                  <Input
                    placeholder="Search discussions, tags, or members..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="h-11 rounded-xl border-border bg-muted/30"
                  />
                  <Button
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error('Please sign in to write a post');
                        navigate('/login');
                        return;
                      }
                      toast.success('Creating a post...');
                    }}
                    className="bg-primary text-white rounded-xl h-11 px-5 font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" /> New Post
                  </Button>
                </div>
              </div>

              {filteredPosts.map(post => {
                const postLikes = likesState[post.id] || { count: post.likes, liked: false };
                return (
                  <div key={post.id} className="bg-white rounded-3xl p-6 border border-border shadow-craft-sm space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-xl">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{post.author.name}</span>
                            <Badge className="bg-primary/10 text-primary border-none text-[9px] px-1.5 py-0.5 font-bold uppercase rounded">
                              {post.author.role}
                            </Badge>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{post.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold text-primary hover:underline cursor-pointer">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-6 pt-3 border-t border-border/60 text-muted-foreground text-xs font-medium">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 hover:text-primary transition-colors ${
                          postLikes.liked ? 'text-primary' : ''
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${postLikes.liked ? 'fill-current' : ''}`} />
                        <span>{postLikes.count} Likes</span>
                      </button>
                      <button
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error('Please sign in to view or write comments');
                            navigate('/login');
                            return;
                          }
                          toast.success('Comments coming soon!');
                        }}
                        className="flex items-center gap-1.5 hover:text-primary transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments} Comments</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success('Link copied to clipboard!');
                        }}
                        className="flex items-center gap-1.5 hover:text-primary transition-colors ml-auto"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sidebar Panels */}
            <div className="space-y-6">
              {/* Popular Tags */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-craft-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-lg text-foreground">Trending Tags</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { tag: 'PotteryCeramics', count: '1.2k posts' },
                    { tag: 'MacraméBoho', count: '840 posts' },
                    { tag: 'WoodburningArt', count: '512 posts' },
                    { tag: 'NaturalDyeing', count: '320 posts' },
                  ].map(t => (
                    <div key={t.tag} className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-primary">#{t.tag}</span>
                      <span className="text-xs text-muted-foreground">{t.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members Stats */}
              <div className="bg-white rounded-3xl p-6 border border-border shadow-craft-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-lg text-foreground">Community Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/40 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-bold text-primary">12.5k</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Active Members</p>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-2xl text-center">
                    <p className="text-2xl font-bold text-primary">450+</p>
                    <p className="text-[10px] text-muted-foreground font-semibold">Weekly Topics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
