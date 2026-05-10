'use client';
import React from 'react';
import { Image, Play, MapPin, Tag } from 'lucide-react';

export default function ProfileTabBar({ activeTab, onTabChange, profileType = 'user', isCreator = false }) {
  const creatorView = isCreator || profileType !== 'user';
  const tabs = [
    { id: 'posts', label: 'Posts', icon: Image },
    ...(creatorView ? [{ id: 'reels', label: 'Reels', icon: Play }] : []),
    ...(creatorView ? [{ id: 'trips', label: 'Trips', icon: MapPin }] : []),
    { id: 'tagged', label: 'Tagged', icon: Tag },
  ];

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', borderBottom: '1px solid var(--line)', background: 'var(--cream)' }}>
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
                color: activeTab === tab.id ? 'var(--ink)' : 'var(--muted)',
                borderTop: activeTab === tab.id ? '1px solid var(--orange)' : '1px solid transparent',
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
