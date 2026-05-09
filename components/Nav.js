'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import kairoLogo from '@/logo/kairologo.png';

export default function Nav({ variant = 'dark', showLinks = true }) {
  const navClass = `nav ${variant}`;
  const [user, setUser] = useState(null);
  const logoHref = user ? '/trip-hub/' : '/';

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const response = await fetch('/api/me/');
        const result = await response.json();

        if (!active) {
          return;
        }

        if (result.ok) {
          setUser(result.user);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);
  
  return (
    <nav className={navClass}>
      <Link href={logoHref} className="nav-logo" aria-label="Kairo home">
        <Image src={kairoLogo} alt="Kairo" className="nav-logo-image" priority />
      </Link>
      {showLinks && (
        <div className="nav-links">
          {user ? (
            <>
              <Link href="/explore" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
                Explore
              </Link>
              <Link href="/community" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
                Community
              </Link>
              {user.role === 'agency' && (
                <Link href="/agencies" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
                  For Agencies
                </Link>
              )}
              <Link href="/about" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
                About
              </Link>
              <Link href="/trip-hub/" className="btn-nav">Profile</Link>
            </>
          ) : (
            <Link href="/signup/" className="btn-nav">Sign up / Sign in</Link>
          )}
        </div>
      )}
    </nav>
  );
}
