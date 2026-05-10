'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import kairoLogo from '@/logo/kairologo.png';
import useSession from '@/hooks/useSession';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const navItems = [
    {
      name: 'Explore',
      href: '/explore',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
      )
    },
    {
      name: 'Chats',
      href: '/chat',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      )
    },
    {
      name: 'Feed',
      href: '/community',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      )
    },
    {
      name: 'Trips',
      href: '/trip-hub',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
      )
    },
    {
      name: 'Reels',
      href: '/reels',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
      )
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      )
    },
    {
      name: 'About',
      href: '/about',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      )
    }
  ];

  // session === undefined -> loading, null -> not signed in, object -> signed in
  // Only hide sidebar when we know for sure user is not signed in
  if (session === null) {
    return null;
  }

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-logo-container">
        <Link href="/" className="app-sidebar-logo-link">
          <Image src={kairoLogo} alt="Kairo" className="app-sidebar-logo-img" priority />
        </Link>
      </div>
      <>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, width: '100%', justifyContent: 'center' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/community' && pathname?.startsWith('/community')) || (item.href === '/chat' && pathname?.startsWith('/chat'));
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="app-sidebar-link"
                style={{
                    background: isActive ? 'rgba(0,0,0,0.04)' : 'transparent',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  <div className="app-sidebar-icon" style={{ strokeWidth: isActive ? 3 : 2 }}>
                    {item.icon}
                  </div>
                  <span className="app-sidebar-text">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: 'auto', width: '100%' }}>
            <Link 
              href="/more"
              className="app-sidebar-link"
            >
              <div className="app-sidebar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </div>
              <span className="app-sidebar-text">More</span>
            </Link>
          </div>
        </>
    </div>
  );
}
