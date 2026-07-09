import { useState, useEffect } from 'react';
import { Product } from '@/types';

export function useWishlist() {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('craftezy_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('craftezy_wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (product: Product) => {
    setItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => items.some(p => p.id === productId);

  return { items, toggle, isInWishlist, count: items.length };
}
