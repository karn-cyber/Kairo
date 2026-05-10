'use client';
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function BottomCaption({ reel, onFollow }) {
  const [expanded, setExpanded] = useState(false);
  const [following, setFollowing] = useState(reel.creator.isFollowing);

  const toggleFollow = () => {
    setFollowing((f) => !f);
    onFollow?.(reel.creator);
  };

  const renderCaption = () => {
    const text = reel.caption || '';
    if (!text) return null;
    if (expanded) {
      return (
        <div style={{ color: '#fff', whiteSpace: 'pre-wrap', lineHeight: 1.4, fontSize: 14 }}>
          {renderLinks(text)}
        </div>
      );
    }
    const short = text.split(' ').slice(0, 15).join(' ');
    return (
      <div style={{ color: '#fff', lineHeight: 1.4, fontSize: 14 }}>
        {renderLinks(short)}
        {text.length > short.length && <span>... </span>}
        {text.length > short.length && (
          <button
            onClick={() => setExpanded(true)}
            style={{ border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 14 }}
          >
            more
          </button>
        )}
      </div>
    );
  };

  const renderLinks = (txt) => {
    return txt.split(/(#[\w]+|@[\w]+)/g).map((part, i) => {
      if (!part) return null;
      if (part.startsWith('#')) return <a key={i} href={`#/hashtag/${part.slice(1)}`} style={{ color: '#1D9E75' }}>{part}</a>;
      if (part.startsWith('@')) return <a key={i} href={`#/profile/${part.slice(1)}`} style={{ color: '#1D9E75' }}>{part}</a>;
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        padding: '24px 16px 16px',
        color: '#fff',
        zIndex: 5,
      }}
    >
      {/* Creator info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              background: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            {reel.creator.avatarUrl || '👤'}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              {reel.creator.name}
              {reel.creator.isVerified && <CheckCircle2 size={14} color="#1D9E75" fill="#1D9E75" strokeWidth={2} />}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>@{reel.creator.handle}</div>
          </div>
        </div>
        <button
          onClick={toggleFollow}
          style={{
            borderRadius: 20,
            padding: '6px 16px',
            border: 'none',
            background: following ? 'transparent' : '#fff',
            color: following ? '#fff' : '#111',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>

      {/* Caption */}
      {renderCaption()}
    </div>
  );
}
