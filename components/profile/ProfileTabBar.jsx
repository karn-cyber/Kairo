'use client';
import React from 'react';
import { Image, Play, MapPin, Bookmark, Tag } from 'lucide-react';

export default function ProfileTabBar({ activeTab, onTabChange, profileType = 'user' }) {
  const tabs = [
    { id: 'posts', label: 'Posts', icon: Image },
    ...(profileType !== 'user' ? [{ id: 'reels', label: 'Reels', icon: Play }] : []),
    ...(profileType !== 'user' ? [{ id: 'trips', label: 'Trips', icon: MapPin }] : []),
    { id: 'saved', label: 'Saved', icon: Bookmark, onlyOwn: true },
    { id: 'tagged', label: 'Tagged', icon: Tag },
  ];

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', borderBottom: '1px solid var(--line)', background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: '16px 24px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: activeTab === tab.id ? '#111' : 'var(--muted)',
                borderTop: activeTab === tab.id ? '1px solid #1D9E75' : '1px solid transparent',
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 700 : 400,
                transition: 'all 150ms ease',
              }}
            >
              <Icon size={20} strokeWidth={1.5} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
