'use client';
import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PostModal({ isOpen, onClose, posts, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLiked, setIsLiked] = useState(false);

  if (!isOpen || !posts || posts.length === 0) return null;

  const post = posts[currentIndex];
  const totalPosts = posts.length;

  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '90%',
          maxWidth: 1200,
          height: '85vh',
          background: '#fff',
          borderRadius: 8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            border: 'none',
            background: '#fff',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <X size={20} color="#111" strokeWidth={1.5} />
        </button>

        {/* Left: Image/Video */}
        <div style={{ flex: '1 1 60%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', position: 'relative' }}>
          {post.type === 'video' || post.type === 'reel' ? (
            <video
              src={post.image}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              controls
            />
          ) : (
            <img src={post.image} alt="Post" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          )}

          {/* Carousel Nav */}
          {totalPosts > 1 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  position: 'absolute',
                  left: 16,
                  background: 'rgba(255,255,255,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === 0 ? 0.5 : 1,
                }}
              >
                <ChevronLeft size={24} color="#fff" strokeWidth={1.5} />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === totalPosts - 1}
                style={{
                  position: 'absolute',
                  right: 16,
                  background: 'rgba(255,255,255,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentIndex === totalPosts - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === totalPosts - 1 ? 0.5 : 1,
                }}
              >
                <ChevronRight size={24} color="#fff" strokeWidth={1.5} />
              </button>

              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: 12 }}>
                {currentIndex + 1} / {totalPosts}
              </div>
            </>
          )}
        </div>

        {/* Right: Comments/Info */}
        <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ padding: 16, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={post.creator.avatar} alt={post.creator.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{post.creator.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>@{post.creator.handle}</div>
            </div>
            <button style={{ border: 'none', background: '#1D9E75', color: '#fff', padding: '6px 16px', borderRadius: 20, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Follow
            </button>
          </div>

          {/* Caption */}
          <div style={{ padding: 16, borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 14 }}>{post.caption}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>2 days ago</div>
          </div>

          {/* Comments */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, idx) => (
                <div key={idx} style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                  <img src={comment.avatar} alt={comment.author} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{comment.author}</span> {comment.text}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                      {comment.timestamp}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--muted)', paddingTop: 40 }}>No comments yet. Be the first!</div>
            )}
          </div>

          {/* Stats */}
          <div style={{ padding: 16, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-around', fontSize: 13, color: 'var(--muted)' }}>
            <div>❤️ {post.stats.likes}</div>
            <div>💬 {post.stats.comments}</div>
            <div>↗️ {post.stats.shares}</div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, padding: 16, borderTop: '1px solid var(--line)' }}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                background: '#f0f0f0',
                borderRadius: 8,
                padding: 10,
                cursor: 'pointer',
              }}
            >
              <Heart size={18} fill={isLiked ? '#d81b60' : 'none'} color={isLiked ? '#d81b60' : '#111'} strokeWidth={1.5} />
              Like
            </button>
            <button
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                background: '#f0f0f0',
                borderRadius: 8,
                padding: 10,
                cursor: 'pointer',
              }}
            >
              <MessageCircle size={18} color="#111" strokeWidth={1.5} />
              Comment
            </button>
            <button
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                background: '#f0f0f0',
                borderRadius: 8,
                padding: 10,
                cursor: 'pointer',
              }}
            >
              <Bookmark size={18} color="#111" strokeWidth={1.5} />
              Save
            </button>
          </div>

          {/* Comment Input */}
          <div style={{ display: 'flex', gap: 8, padding: 16, borderTop: '1px solid var(--line)' }}>
            <input
              type="text"
              placeholder="Add a comment..."
              style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}
            />
            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
              <Send size={18} color="#1D9E75" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
