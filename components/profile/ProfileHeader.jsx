'use client';
import React, { useState } from 'react';
import { CheckCircle2, Settings, MoreVertical, MessageCircle, UserPlus, UserMinus } from 'lucide-react';
import { useFollowToggle } from '@/hooks/useFollowToggle';

export default function ProfileHeader({ profile, postCount, isOwnProfile, isFollowing: propFollowing, onFollow, onEdit, onFollowersClick, onFollowingClick }) {
  const followHook = useFollowToggle(profile?.isFollowing);
  const isFollowing = typeof propFollowing === 'boolean' ? propFollowing : followHook.isFollowing;
  const toggleFollow = onFollow || followHook.toggleFollow;
  const [showMenu, setShowMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const statsItems = [
    { label: 'posts', value: typeof postCount === 'number' ? postCount : profile?.stats.posts },
    { label: 'followers', value: profile?.stats.followers, onClick: onFollowersClick },
    { label: 'following', value: profile?.stats.following, onClick: onFollowingClick },
  ];

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', padding: '32px 16px', borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, rgba(255,253,248,0.96), rgba(255,253,248,0.9))' }}>
      {/* Avatar + Right side */}
      <div style={{ display: 'flex', gap: 48 }}>
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              outline: profile?.isVerified ? '2px solid var(--orange)' : 'none',
              outlineOffset: '2px',
            }}
          >
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ fontSize: 64 }}>👤</div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div style={{ flex: 1 }}>
          {/* Row 1: Handle + Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>{profile?.handle}</h1>
            {isOwnProfile ? (
              <>
                <button onClick={onEdit} style={{ padding: '8px 24px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                  Edit profile
                </button>
                <button style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>
                  View archive
                </button>
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setShowSettingsMenu(!showSettingsMenu)} style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>
                    <Settings size={20} color="var(--ink)" strokeWidth={1.5} />
                  </button>
                  {showSettingsMenu && (
                    <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, background: '#fff', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', zIndex: 10, minWidth: 220 }}>
                      <button onClick={() => { window.location.href = '/settings'; }} style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>
                        Account settings
                      </button>
                      <button style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14, borderTop: '1px solid var(--line)' }}>
                        Privacy
                      </button>
                      <div style={{ height: 1, background: 'var(--line)', margin: '8px 0' }} />
                      <button onClick={async () => {
                        try {
                          await fetch('/api/logout', { method: 'POST' });
                        } catch (err) {
                          console.error('Logout failed', err);
                        }
                        window.location.href = '/';
                      }} style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14, color: '#d81b60' }}>
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={toggleFollow}
                  style={{
                    padding: '8px 24px',
                    border: isFollowing ? '1px solid var(--line)' : 'none',
                    borderRadius: 8,
                    background: isFollowing ? '#fff' : 'var(--orange)',
                    color: isFollowing ? '#111' : '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>
                  <MessageCircle size={20} color="#111" strokeWidth={1.5} />
                </button>
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setShowMenu(!showMenu)} style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>
                    <MoreVertical size={20} color="#111" strokeWidth={1.5} />
                  </button>
                  {showMenu && (
                    <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 8, background: '#fff', border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', zIndex: 10, minWidth: 200 }}>
                      <button style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>
                        Block
                      </button>
                      <button style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14, borderTop: '1px solid var(--line)' }}>
                        Report
                      </button>
                      <button style={{ display: 'block', width: '100%', padding: '12px 16px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14, borderTop: '1px solid var(--line)' }}>
                        Copy profile link
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Row 2: Stats */}
          <div style={{ display: 'flex', gap: 40, marginBottom: 20 }}>
            {statsItems.map((stat) => (
              <div key={stat.label} onClick={stat.onClick} style={{ cursor: stat.onClick ? 'pointer' : 'default' }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>{stat.value.toLocaleString()}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', textTransform: 'capitalize' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Row 3: Display name + verified */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>
              {profile?.displayName}
              {profile?.isVerified && (
                <div title="Verified Creator on Kairo">
                  <CheckCircle2 size={18} color="var(--orange)" fill="var(--orange)" strokeWidth={2} />
                </div>
              )}
            </div>
          </div>

          {/* Row 4: Bio */}
          {profile?.bio && (
            <div style={{ marginBottom: 12, fontSize: 14, color: 'var(--ink)', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              {profile.bio}
            </div>
          )}

          {/* Row 5: Links */}
          {profile?.links && profile.links.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {profile.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginRight: 16, color: 'var(--orange)', fontSize: 14, textDecoration: 'none' }}
                >
                  🔗 {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
