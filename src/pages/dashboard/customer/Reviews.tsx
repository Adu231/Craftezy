import { useState } from 'react';
import { Star, Edit2, Trash2, ThumbsUp } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { MOCK_REVIEWS } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

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
          { label: 'Avg Rating Given', value: (reviews.reduce((a,r) => a + r.rating, 0) / reviews.length).toFixed(1) + '★' },
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
                <Button variant="ghost" size="sm" className="h-8 text-xs rounded-lg gap-1" onClick={() => toast.info('Edit review coming soon')}>
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
    </CustomerLayout>
  );
}
