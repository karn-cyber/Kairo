'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/profile/me');
  }, [router]);

  return <div style={{ textAlign: 'center', padding: '40px 20px' }}>Redirecting to your profile...</div>;
}
