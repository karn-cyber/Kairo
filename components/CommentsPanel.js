'use client';
import React, { useState } from 'react';
import { X, Heart, MessageCircle } from 'lucide-react';

export default function CommentsPanel({ reel, onClose }) {
  const [comments, setComments] = useState(reel.commentsData || []);
  const [text, setText] = useState('');

  const addComment = () => {
    if (!text.trim()) return;
    const c = { id: Date.now(), author: 'You', avatar: '👤', text, likes: 0 };
    setComments((s) => [c, ...s]);
    setText('');
  };

  return (
    <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '420px', background: '#fff', boxShadow: '-12px 0 30px rgba(0,0,0,0.4)', zIndex: 1200, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 16, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 700 }}>Comments ({comments.length})</div>
        <button onClick={onClose} style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}><X size={20} color="#111" strokeWidth={1.5} /></button>
      </div>

      <div style={{ padding: 12, overflowY: 'auto', flex: 1 }}>
        {comments.map((c) => (
          <div key={c.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.avatar}</div>
              <div style={{ fontWeight: 700 }}>{c.author}</div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>2h</div>
            </div>
            <div style={{ marginTop: 8, color: '#111' }}>{c.text}</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
              <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}><Heart size={16} strokeWidth={1.5} /> {c.likes}</button>
              <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}><MessageCircle size={16} strokeWidth={1.5} /> Reply</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: 12, borderTop: '1px solid var(--line)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: 18, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment..." style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--line)', background: '#fafafa' }} onKeyDown={(e)=> e.key==='Enter' && addComment()} />
        <button onClick={addComment} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--orange)', color: '#fff' }}>Send</button>
      </div>
    </div>
  );
}
