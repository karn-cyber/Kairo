'use client';
import { useState, useEffect, useCallback } from 'react';

export function useReelFeed() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/reels');
        const json = await res.json();
        if (json?.success) {
          setReels(json.data || []);
        } else {
          setReels([]);
        }
      } catch (err) {
        console.error('Failed to fetch reels', err);
        setReels([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const prependReel = useCallback((reel) => {
    setReels((r) => [reel, ...r]);
  }, []);

  return { reels, loading, loadMore, prependReel };
}
