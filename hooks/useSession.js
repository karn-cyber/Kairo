'use client';
import { useEffect, useState } from 'react';

export default function useSession() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = no user

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        if (!mounted) return;
        setUser(data?.user ?? null);
      } catch (err) {
        if (!mounted) return;
        setUser(null);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return user;
}
