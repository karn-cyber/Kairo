'use client';
import { useState } from 'react';

export function useFollowToggle(initialState = false) {
  const [isFollowing, setIsFollowing] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsFollowing(prev => !prev);
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    } finally {
      setLoading(false);
    }
  };

  return { isFollowing, loading, toggleFollow };
}
