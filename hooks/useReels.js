'use client';
import { useState, useEffect } from 'react';
import useSession from './useSession';

export function useReels(creatorId = null, type = 'all') {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSession();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        // Fetch reels from API
        const response = await fetch('/api/reels/');
        if (!response.ok) throw new Error('Failed to fetch reels');
        
        const data = await response.json();
        let fetchedReels = data.data || [];

        // Filter by creator if creatorId is specified
        if (creatorId === 'kairolife') {
          fetchedReels = fetchedReels.filter(
            r => r.creator?.id === 'kairolife_1' || r.creator?.handle === 'kairolife'
          );
        }

        // Map userId to reels for like tracking
        const reelsWithUserLikeState = fetchedReels.map(reel => ({
          ...reel,
          isLiked: user && reel.likedBy ? reel.likedBy.includes(user._id || user.id) : false,
        }));

        setReels(reelsWithUserLikeState);
        setError(null);
      } catch (err) {
        console.error('Error fetching reels:', err);
        setError(err.message);
        setReels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [creatorId, user]);

  return { reels, loading, error };
}
