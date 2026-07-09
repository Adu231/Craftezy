import { useState } from 'react';
import { Star, Edit2, Trash2, ThumbsUp } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { MOCK_REVIEWS } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Review } from '@/types';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  
  // Edit review state
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  return (
    <CustomerLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl">My Reviews</h1>
          <p className="text-muted-foreground text-sm mt-1">{reviews.length} reviews written</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Reviews', value: reviews.length },
          { label: 'Avg Rating Given', value: reviews.length > 0 ? (reviews.reduce((a,r) => a + r.rating, 0) / reviews.length).toFixed(1) + '★' : '0.0★' },
          { label: 'Helpful Votes', value: reviews.reduce((a,r) => a + r.helpful, 0) },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5 text-center">
            <div className="font-display font-bold text-2xl text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-current' : 'text-muted'}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs rounded-lg gap-1"
                  onClick={() => {
                    setEditingReview(review);
                    setEditRating(review.rating);
                    setEditComment(review.comment);
                  }}>
                  <Edit2 className="w-3 h-3" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs rounded-lg gap-1 text-red-500 hover:text-red-600"
                  onClick={() => { setReviews(prev => prev.filter(r => r.id !== review.id)); toast.success('Review deleted'); }}>
                  <Trash2 className="w-3 h-3" /> Delete
                </Button>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3">{review.comment}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{review.helpful} people found this helpful</span>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Star className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">No reviews yet</p>
            <p className="text-sm text-muted-foreground mt-1">Buy products and share your experience</p>
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Edit Review</h3>
            <p className="text-xs text-muted-foreground mb-4">Modify your review comment or star rating</p>
            
            <div className="space-y-4">
              {/* Star selector */}
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1.5 block">Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={cn("w-6 h-6 transition-colors", star <= editRating ? 'text-[hsl(35,75%,42%)] fill-current' : 'text-muted-foreground/30')} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment text area */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-comment" className="text-xs font-semibold">Review Comment</Label>
                <textarea
                  id="edit-comment"
                  value={editComment}
                  onChange={e => setEditComment(e.target.value)}
                  className="w-full h-28 p-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setEditingReview(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!editComment.trim()) {
                    toast.error('Please write a review comment');
                    return;
                  }
                  setReviews(prev => prev.map(r => r.id === editingReview.id ? { ...r, rating: editRating, comment: editComment } : r));
                  toast.success('Review updated successfully!');
                  setEditingReview(null);
                }}
                className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}
