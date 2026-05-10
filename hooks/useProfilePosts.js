'use client';
import { useState, useEffect } from 'react';
import useSession from './useSession';
import { kairolifeReels } from '@/data/kairolifeReels';

export function useProfilePosts(handle, type = 'posts') {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSession();

  useEffect(() => {
    if (!handle || (handle !== 'kairolife' && handle !== 'me')) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/reels/');
        if (!response.ok) throw new Error('Failed to fetch posts');

        const data = await response.json();
        const persistedReels = Array.isArray(data.data) ? data.data : [];
        const persistedById = new Map(persistedReels.map((reel) => [reel.id, reel]));

        const transformedPosts = kairolifeReels.map((reel) => {
          const persisted = persistedById.get(reel.id) || {};
          const likedBy = Array.isArray(persisted.likedBy) ? persisted.likedBy : [];
          const commentsData = Array.isArray(persisted.comments) ? persisted.comments : [];
          const likes = typeof persisted.likes === 'number' ? persisted.likes : reel.likes;

          return {
            ...reel,
            videoUrl: `/api/reels/files/${reel.filename}`,
            thumbnailUrl: reel.thumbnailUrl || '',
            creatorHandle: 'kairolife',
            creatorName: 'Kairo Life',
            creator: {
              id: 'kairolife_1',
              name: 'Kairo Life',
              handle: 'kairolife',
              avatarUrl: '',
              isVerified: true,
              isFollowing: false,
            },
            likes,
            comments: commentsData.length,
            commentsData,
            isLiked: user ? likedBy.includes(user._id || user.id) : false,
            likedBy,
          };
        });

        const filtered = type === 'tagged' ? transformedPosts.slice(0, 10) : transformedPosts;

        setPosts(filtered);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile posts:', err);
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [handle, type, user]);

  return { posts, loading, error, hasMore: false, page: 0 };
}

