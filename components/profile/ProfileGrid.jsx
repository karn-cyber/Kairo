'use client';
import React, { useState } from 'react';
import { Heart, MessageCircle, Play, Copy } from 'lucide-react';

export default function ProfileGrid({ posts = [], onPostClick }) {
  const [hoveredPostId, setHoveredPostId] = useState(null);

  const getPostBadge = (postType) => {
    if (postType === 'carousel') return <Copy size={20} color="#fff" strokeWidth={1.5} />;
    if (postType === 'video') return <Play size={20} color="#fff" strokeWidth={1} fill="#fff" />;
    if (postType === 'reel') return <Play size={20} color="#fff" strokeWidth={1} fill="#fff" />;
    return null;
  };

  if (posts.length === 0) {
    return (
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '60px 16px', textAlign: 'center', background: '#fff' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No posts yet</div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>Photos and videos you post will appear here</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', background: '#fff' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => onPostClick?.(post)}
            style={{
              aspectRatio: '1',
              background: '#eee',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setHoveredPostId(post.id)}
            onMouseLeave={() => setHoveredPostId(null)}
          >
            <img src={post.imageUrl} alt={post.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            {/* Post type badge - top right */}
            {getPostBadge(post.postType) && (
              <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                {getPostBadge(post.postType)}
              </div>
            )}

            {/* Hover overlay */}
            {hoveredPostId === post.id && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, zIndex: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 700 }}>
                  <Heart size={20} fill="#fff" color="#fff" strokeWidth={1} />
                  {(post.likes / 1000).toFixed(1)}k
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 700 }}>
                  <MessageCircle size={20} color="#fff" strokeWidth={1.5} />
                  {post.comments}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
