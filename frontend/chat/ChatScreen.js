'use client';

import { useState, useEffect, useRef } from 'react';
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

export default function ChatScreen({ chat, user, onBack }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (chat.type === 'direct') {
          params.set('conversationId', chat.id);
        } else {
          params.set('communityId', chat.id);
        }
        const res = await fetch(`/api/chat/messages/?${params}`);
        const data = await res.json();
        if (data.ok) {
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !user) return;

    try {
      setSending(true);
      const body = {
        text: messageText,
      };

      if (chat.type === 'direct') {
        body.conversationId = chat.id;
      } else {
        body.communityId = chat.id;
      }

      const res = await fetch('/api/chat/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.ok) {
        setMessages(prev => [...prev, data.message]);
        setMessageText('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              display: 'none',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            ←
          </button>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--ink)' }}>
              {chat.name}
            </div>
            {chat.type === 'community' && (
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Community</div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#fff',
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: msg.authorId === user?.id ? 'row-reverse' : 'row',
                gap: '8px',
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#111',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {msg.authorName?.[0]?.toUpperCase()}
              </div>
              <div
                style={{
                  maxWidth: '60%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  {msg.authorName}
                  {msg.authorRole && (
                    <Badge type="orange" style={{ fontSize: '10px', padding: '2px 6px', background: '#fff', border: '1px solid var(--line)', color: 'var(--ink)' }}>
                      {msg.authorRole}
                    </Badge>
                  )}
                </div>
                <div
                  style={{
                    background: msg.authorId === user?.id ? '#fff' : '#fff',
                    color: 'var(--ink)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    wordWrap: 'break-word',
                    fontSize: '14px',
                    lineHeight: 1.4,
                    border: '1px solid var(--line)',
                  }}
                >
                  {msg.text}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  {toRelativeTime(msg.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--line)',
        background: '#fff',
      }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Say something..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1px solid var(--line)',
              borderRadius: '20px',
              fontSize: '14px',
              fontFamily: 'var(--DS)',
            }}
          />
          <button
            type="submit"
            disabled={sending || !messageText.trim()}
            style={{
              padding: '10px 16px',
              background: messageText.trim() ? '#111' : '#e0e0e0',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: messageText.trim() ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
