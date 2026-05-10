'use client';
import React, { useState } from 'react';
import { X, UserMinus } from 'lucide-react';
import { mockFollowers } from '@/data/mockPosts';

export default function FollowersModal({ isOpen, onClose, title = 'Followers', followers = mockFollowers, isOwnProfile = false }) {
  const [search, setSearch] = useState('');
  const filtered = followers.filter((f) => f.displayName.toLowerCase().includes(search.toLowerCase()) || f.handle.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: '100%',
          maxWidth: 400,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{title}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
            <X size={20} color="#111" strokeWidth={1.5} />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: 12, borderBottom: '1px solid var(--line)' }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid var(--line)',
              borderRadius: 20,
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted)' }}>No users found</div>
          ) : (
            filtered.map((follower) => (
              <div key={follower.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#eee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {follower.avatarUrl ? <img src={follower.avatarUrl} alt={follower.displayName} /> : <div>👤</div>}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{follower.displayName}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>@{follower.handle}</div>
                  </div>
                </div>
                {isOwnProfile && (
                  <button
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <UserMinus size={18} color="var(--muted)" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
