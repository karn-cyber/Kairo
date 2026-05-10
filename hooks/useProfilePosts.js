'use client';
import { useState, useEffect } from 'react';
import { mockPosts } from '@/data/mockPosts';

export function useProfilePosts(handle, type = 'posts') {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!handle) return;

    const timer = setTimeout(() => {
      if (type === 'posts') {
        setPosts(mockPosts);
      } else if (type === 'reels') {
        setPosts(mockPosts.filter(p => p.postType === 'reel'));
      } else if (type === 'tagged') {
        setPosts(mockPosts.slice(0, 10));
      } else if (type === 'trips') {
        setPosts([]);
      }
      setLoading(false);
      setHasMore(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [handle, type]);

  return { posts, loading, hasMore, page };
}
