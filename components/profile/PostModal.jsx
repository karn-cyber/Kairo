'use client';
import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import useSession from '@/hooks/useSession';

export default function PostModal({ isOpen, onClose, posts, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const user = useSession();

  useEffect(() => {
    if (posts && posts[currentIndex]) {
      const post = posts[currentIndex];
      setIsLiked(post.isLiked || false);
      setLikeCount(post.likes || 0);
    }
  }, [currentIndex, posts]);

  if (!isOpen || !posts || posts.length === 0) return null;

  const post = posts[currentIndex];
  const totalPosts = posts.length;
  const imageSrc = post.image || post.imageUrl || post.videoUrl;
  const creatorName = post.creator?.name || post.creatorName || 'Kairo Life';
  const creatorHandle = post.creator?.handle || post.creatorHandle || 'kairolife';
  const creatorAvatar = post.creator?.avatar || post.creatorAvatar || 'https://via.placeholder.com/36?text=K';
  const comments = post.comments || post.commentsData || [];
  const commentsCount = post.stats?.comments ?? post.comments?.length ?? post.commentsData?.length ?? 0;
  const sharesCount = post.stats?.shares ?? 0;

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

  const handleLike = async () => {
    if (!user || !post.id) return;

    setIsLiking(true);
    try {
      const action = isLiked ? 'unlike' : 'like';
      const response = await fetch(`/api/reels/${post.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          userId: user._id || user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.reel.isLiked);
        setLikeCount(data.reel.likes);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
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
          {post.postType === 'video' || post.postType === 'reel' || post.videoUrl ? (
            <video
              src={post.videoUrl || imageSrc}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              controls
            />
          ) : (
            <img src={imageSrc} alt={post.caption || post.title || 'Post'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
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
            <img src={creatorAvatar} alt={creatorName} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{creatorName}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>@{creatorHandle}</div>
            </div>
            <button style={{ border: 'none', background: 'var(--orange)', color: '#fff', padding: '6px 16px', borderRadius: 20, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Follow
            </button>
          </div>

          {/* Caption */}
          <div style={{ padding: 16, borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 14 }}>{post.caption || post.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>2 days ago</div>
          </div>

          {/* Comments */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {comments.length > 0 ? (
              comments.map((comment, idx) => (
                <div key={idx} style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                  <img src={comment.avatar || comment.avatarUrl || 'https://via.placeholder.com/28?text=U'} alt={comment.author || comment.authorName} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{comment.author || comment.authorName}</span> {comment.text}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                      {comment.timestamp || 'now'}
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
            <div>❤️ {likeCount}</div>
            <div>💬 {commentsCount}</div>
            <div>↗️ {sharesCount}</div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, padding: 16, borderTop: '1px solid var(--line)' }}>
            <button
              onClick={handleLike}
              disabled={isLiking || !user}
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
                cursor: isLiking || !user ? 'not-allowed' : 'pointer',
                opacity: isLiking || !user ? 0.6 : 1,
              }}
            >
              <Heart size={18} fill={isLiked ? 'var(--orange)' : 'none'} color={isLiked ? 'var(--orange)' : 'var(--ink)'} strokeWidth={1.5} />
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
              <MessageCircle size={18} color="var(--ink)" strokeWidth={1.5} />
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
              <Bookmark size={18} color="var(--ink)" strokeWidth={1.5} />
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
              <Send size={18} color="var(--orange)" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

