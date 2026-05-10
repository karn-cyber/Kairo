'use client';
import React, { useState } from 'react';
import { Heart, MessageCircle, Play, Copy } from 'lucide-react';
import useSession from '@/hooks/useSession';

export default function ProfileGrid({ posts = [], onPostClick }) {
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [postLikes, setPostLikes] = useState({});
  const [likingPostId, setLikingPostId] = useState(null);
  const user = useSession();

  // Initialize like states from posts
  React.useEffect(() => {
    const likes = {};
    posts.forEach(post => {
      likes[post.id] = {
        count: post.likes || 0,
        isLiked: post.isLiked || false,
      };
    });
    setPostLikes(likes);
  }, [posts]);

  const getPostBadge = (postType) => {
    if (postType === 'carousel') return <Copy size={20} color="#fff" strokeWidth={1.5} />;
    if (postType === 'video' || postType === 'reel') return <Play size={20} color="#fff" strokeWidth={1} fill="#fff" />;
    return null;
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    if (!user || likingPostId === postId) return;

    setLikingPostId(postId);
    try {
      const currentLikeState = postLikes[postId];
      const action = currentLikeState?.isLiked ? 'unlike' : 'like';

      const response = await fetch(`/api/reels/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          userId: user._id || user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPostLikes(prev => ({
          ...prev,
          [postId]: {
            count: data.reel.likes,
            isLiked: data.reel.isLiked,
          },
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLikingPostId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '60px 16px', textAlign: 'center', background: 'var(--cream)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>No posts yet</div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>Photos and videos you post will appear here</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', background: 'var(--cream)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {posts.map((post) => {
          const likeData = postLikes[post.id] || { count: post.likes || 0, isLiked: false };
          return (
            <div
              key={post.id}
              onClick={() => onPostClick?.(post, likeData)}
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
              {post.videoUrl ? (
                <video
                  src={post.videoUrl}
                  muted
                  playsInline
                  preload="metadata"
                  loop
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img src={post.imageUrl} alt={post.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}

              {/* Post type badge - top right */}
              {getPostBadge(post.postType) && (
                <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                  {getPostBadge(post.postType)}
                </div>
              )}

              {/* Hover overlay */}
              {hoveredPostId === post.id && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,12,8,0.58)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, zIndex: 3 }}>
                  <button
                    onClick={(e) => handleLike(e, post.id)}
                    disabled={likingPostId === post.id || !user}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#fff',
                      fontWeight: 700,
                      border: 'none',
                      background: 'transparent',
                      cursor: likingPostId === post.id || !user ? 'not-allowed' : 'pointer',
                      opacity: likingPostId === post.id || !user ? 0.6 : 1,
                    }}
                  >
                    <Heart size={20} fill={likeData.isLiked ? '#ff4458' : '#fff'} color={likeData.isLiked ? '#ff4458' : '#fff'} strokeWidth={1} />
                    {Math.max(0, Math.round(likeData.count))}
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 700 }}>
                    <MessageCircle size={20} color="#fff" strokeWidth={1.5} />
                    {post.comments || 0}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

