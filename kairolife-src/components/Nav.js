'use client';

import Link from 'next/link';

export default function Nav({ variant = 'dark', showLinks = true }) {
  const navClass = `nav ${variant}`;
  
  return (
    <nav className={navClass}>
      <Link href="/" className={`nav-logo ${variant === 'light' ? 'ink' : 'white'}`}>
        K<em>a</em>iro
      </Link>
      {showLinks && (
        <div className="nav-links">
          <Link href="/explore" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
            Explore
          </Link>
          <Link href="/community" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
            Community
          </Link>
          <Link href="/agencies" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
            For Agencies
          </Link>
          <Link href="/about" className={`nav-link ${variant === 'light' ? 'ink' : 'white'}`}>
            About
          </Link>
          <button className="btn-nav">Get Access</button>
        </div>
      )}
    </nav>
  );
}
