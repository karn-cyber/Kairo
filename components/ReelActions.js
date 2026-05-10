'use client';
import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

export default function ReelActions({ reel, onLike, onComment, onShare, onSave, onMore }) {
  return (
    <div style={{ position: 'absolute', right: 10, bottom: '18%', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', color: '#fff' }}>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => onLike(reel)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {reel.isLiked ? <Heart size={24} fill="#ff6b6b" color="#ff6b6b" strokeWidth={1.5} /> : <Heart size={24} color="#fff" strokeWidth={1.5} />}
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{reel.likes}</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => onComment(reel)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageCircle size={24} color="#fff" strokeWidth={1.5} />
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{reel.comments}</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => onShare(reel)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={24} color="#fff" strokeWidth={1.5} />
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Share</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => onSave(reel)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {reel.isSaved ? <Bookmark size={24} fill="#1D9E75" color="#1D9E75" strokeWidth={1.5} /> : <Bookmark size={24} color="#fff" strokeWidth={1.5} />}
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>Save</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => onMore(reel)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MoreHorizontal size={24} color="#fff" strokeWidth={1.5} />
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>More</div>
      </div>
    </div>
  );
}
