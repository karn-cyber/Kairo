'use client';
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function ProfileHighlights({ highlights = [], isOwnProfile = false }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 80;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', padding: '16px 16px', background: 'var(--cream)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto', scrollBehavior: 'smooth' }} ref={scrollRef}>
        {isOwnProfile && (
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                border: '2px dashed var(--orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: '#fff',
              }}
            >
              <Plus size={24} color="var(--orange)" strokeWidth={1.5} />
            </div>
            <div style={{ fontSize: 12, marginTop: 8, color: 'var(--ink)' }}>New</div>
          </div>
        )}

        {highlights.map((highlight) => (
          <div key={highlight.id} style={{ flexShrink: 0, textAlign: 'center', cursor: 'pointer' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#eee',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(200,90,26,0.22)',
              }}
            >
              {highlight.coverUrl ? (
                <img src={highlight.coverUrl} alt={highlight.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ fontSize: 24 }}>📷</div>
              )}
            </div>
            <div style={{ fontSize: 12, marginTop: 8, color: 'var(--ink)' }}>{highlight.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
