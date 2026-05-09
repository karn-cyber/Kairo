'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card } from '@/components/UI';

export default function AuthGate({ children, requiredRole = null, title, description }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const response = await fetch('/api/me/');
        const result = await response.json();

        if (!active) {
          return;
        }

        setUser(result.ok ? result.user : null);
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <Card style={{padding: '24px', margin: '24px auto', maxWidth: '760px'}}>
        <div style={{fontSize: '14px', color: 'var(--muted)'}}>Checking access...</div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card style={{padding: '24px', margin: '24px auto', maxWidth: '760px'}}>
        <Badge type="orange" style={{marginBottom: '12px'}}>Login required</Badge>
        <div style={{fontFamily: 'var(--PD)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px'}}>
          {title || 'Sign in to continue'}
        </div>
        <div style={{fontSize: '14px', color: 'var(--ink3)', lineHeight: 1.7, marginBottom: '16px'}}>
          {description || 'Create an account or sign in with your password to unlock this page.'}
        </div>
        <Link href="/signup/"><Button variant="primary">Go to sign in</Button></Link>
      </Card>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <Card style={{padding: '24px', margin: '24px auto', maxWidth: '760px'}}>
        <Badge type="orange" style={{marginBottom: '12px'}}>Agency only</Badge>
        <div style={{fontFamily: 'var(--PD)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '10px'}}>
          This area is for agency accounts.
        </div>
        <div style={{fontSize: '14px', color: 'var(--ink3)', lineHeight: 1.7, marginBottom: '16px'}}>
          Your current account is signed in as {user.role}. Switch to an agency profile to unlock these controls.
        </div>
        <Link href="/signup/"><Button variant="primary">Switch account</Button></Link>
      </Card>
    );
  }

  return children;
}
