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

export default function ConversationList({ conversations, activeChat, onSelect }) {
  if (conversations.length === 0) {
    return (
      <div style={{ padding: '16px', fontSize: '13px', color: 'var(--muted)', textAlign: 'center' }}>
        No conversations yet. Start a new chat!
      </div>
    );
  }

  return (
    <div>
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv)}
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
            if (activeChat?.id !== conv.id) {
              e.target.style.background = 'rgba(0,0,0,0.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeChat?.id !== conv.id) {
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
            DC
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
              Direct Message
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginTop: '2px',
            }}>
              {conv.lastMessage || 'No messages yet'}
            </div>
          </div>
          {conv.lastMessageAt && (
            <div style={{ fontSize: '11px', color: 'var(--muted)', flexShrink: 0 }}>
              {toRelativeTime(conv.lastMessageAt)}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
