'use client';

import { Badge } from '@/components/UI';

function toRelativeTime(value) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  if (Number.isNaN(diff)) return 'just now';
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommunityList({
  communities,
  publicCommunities,
  activeChat,
  onSelectCommunity,
  onJoinClick,
  onCreateClick,
}) {
  const mainCommunity = communities.find(c => c.type === 'main');
  const otherCommunities = communities.filter(c => c.type !== 'main');

  return (
    <div>
      {/* Create Community Button */}
      <div style={{ padding: '12px 16px' }}>
        <button
          onClick={onCreateClick}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: '#fff',
            color: '#000',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          + Create Community
        </button>
      </div>

      {/* Kairo Main Community */}
      {mainCommunity && (
        <button
          onClick={() => onSelectCommunity(mainCommunity)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: 'none',
            background: 'transparent',
            borderBottom: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            if (activeChat?.id !== mainCommunity.id) {
              e.target.style.background = 'rgba(0,0,0,0.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeChat?.id !== mainCommunity.id) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#111',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '20px',
            }}
          >
            H
          </div>
          <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ink)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {mainCommunity.name}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginTop: '2px',
            }}>
              {mainCommunity.lastMessage || 'No messages yet'}
            </div>
          </div>
        </button>
      )}

      {/* Other Communities */}
      {otherCommunities.map(com => (
        <button
          key={com.id}
          onClick={() => onSelectCommunity(com)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: 'none',
            background: 'transparent',
            borderBottom: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            if (activeChat?.id !== com.id) {
              e.target.style.background = 'rgba(0,0,0,0.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeChat?.id !== com.id) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#111',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            {com.name[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--ink)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {com.name}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginTop: '2px',
            }}>
              {com.lastMessage || 'No messages yet'}
            </div>
          </div>
        </button>
      ))}

      {/* Browse Communities */}
      {publicCommunities.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          {publicCommunities.map(com => (
            <div
              key={com.id}
              style={{
                padding: '12px 16px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#111',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {com.name[0].toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '2px',
                }}>
                  {com.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--muted)',
                  marginBottom: '6px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {com.description}
                </div>
                <button
                  onClick={() => onJoinClick()}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    border: '1px solid var(--line)',
                    background: '#fff',
                    color: 'var(--ink)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
