'use client';
import { useState, useEffect } from 'react';
import { mockProfile } from '@/data/mockProfile';

export function useProfile(handle) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;

    const timer = setTimeout(() => {
      try {
        if (handle === 'me' || handle === 'kairolife') {
          setProfile(mockProfile);
          setError(null);
        } else {
          setProfile(null);
          setError('Profile not found');
        }
      } catch (err) {
        setError(err.message);
        setProfile(null);
        setLoading(false);
        return;
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [handle]);

  return { profile, loading, error };
}
