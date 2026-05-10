'use client';
import React, { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';

export default function ReelInfo({ reel, onFollow, onOpenTrip }) {
  const [expanded, setExpanded] = useState(false);
  const [following, setFollowing] = useState(reel.creator.isFollowing);

  const toggleFollow = () => {
    setFollowing((f) => !f);
    onFollow?.(reel.creator);
  };

  const renderCaption = () => {
    const text = reel.caption || '';
    if (expanded) return (<div style={{ color: '#111', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{renderLinks(text)}</div>);
    // show two lines approx - simple truncation
    const short = text.split(' ').slice(0, 20).join(' ');
    return (
      <div style={{ color: '#111', lineHeight: 1.4 }}>
        {renderLinks(short)}{text.length > short.length && '... '}
        {text.length > short.length && <button onClick={() => setExpanded(true)} style={{ border: 'none', background: 'transparent', color: '#1D9E75', cursor: 'pointer' }}>more</button>}
      </div>
    );
  };

  const renderLinks = (txt) => {
    // naive hashtags and mentions parser
    return txt.split(/(#[\w]+|@[\w]+)/g).map((part, i) => {
      if (!part) return null;
      if (part.startsWith('#')) return <a key={i} href={`#/hashtag/${part.slice(1)}`} style={{ color: '#1D9E75' }}>{part}</a>;
      if (part.startsWith('@')) return <a key={i} href={`#/profile/${part.slice(1)}`} style={{ color: '#1D9E75' }}>{part}</a>;
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div style={{ height: '100vh', overflowY: 'auto', padding: 24, background: '#fff', color: '#111' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{reel.creator.avatarUrl || '👤'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>{reel.creator.name} {reel.creator.isVerified && <CheckCircle2 size={16} color="#1D9E75" fill="#1D9E75" strokeWidth={2} />}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>@{reel.creator.handle}</div>
        </div>
        <button onClick={toggleFollow} style={{ borderRadius: 10, padding: '8px 12px', border: `1px solid ${following ? '#1D9E75' : 'var(--line)'}`, background: following ? '#1D9E75' : 'transparent', color: following ? '#fff' : '#111', fontWeight: 700 }}>{following ? 'Following' : 'Follow'}</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        {renderCaption()}
      </div>

      <div style={{ marginBottom: 12, color: 'var(--muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MapPin size={16} color="var(--muted)" strokeWidth={1.5} />
          <button onClick={() => alert('Open location view')} style={{ border: 'none', background: 'transparent', color: '#1D9E75', cursor: 'pointer' }}>{reel.location}</button>
        </div>
      </div>

      {reel.linkedTripId && (
        <div style={{ marginBottom: 12 }}>
          <button onClick={() => onOpenTrip?.(reel.linkedTripId)} style={{ border: '1px solid #1D9E75', color: '#1D9E75', padding: '8px 12px', borderRadius: 20, background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>🗺️ View full trip itinerary →</button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Posted</div>
        <div style={{ fontSize: 13, color: '#111' }}>{new Date(reel.postedAt).toLocaleString()}</div>
      </div>

      <div style={{ height: 200 }} />
    </div>
  );
}
