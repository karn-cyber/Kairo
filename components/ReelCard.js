'use client';
import React, { useState } from 'react';

export default function ReelCard({ reel, onShare, onComment, onReply }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(reel.comments || []);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'You',
        avatar: '👤',
        text: commentText,
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      onComment?.(newComment);
    }
  };

  const handleShare = (platform) => {
    onShare?.(platform, reel);
    setShowShareMenu(false);
  };

  const shareToLink = () => {
    const link = `${window.location.origin}/reels/${reel.id}`;
    navigator.clipboard.writeText(link);
    alert('Reel link copied to clipboard!');
  };

  return (
    <div
      style={{
        background: '#111',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
        border: '1px solid var(--line)',
      }}
    >
      {/* Video Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '177.78%', // 16:9 ratio
          backgroundColor: '#000',
        }}
      >
        <video
          src={reel.videoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          controls
          preload="lazy"
        />
      </div>

      {/* Header: Creator Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '16px 16px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            color: '#fff',
          }}
        >
          {reel.creatorAvatar}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: '#fff',
            }}
          >
            {reel.creatorName}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--muted)',
            }}
          >
            {reel.createdAt}
          </div>
        </div>
        <button
          style={{
            background: 'var(--orange)',
            color: '#fff',
            border: 'none',
            padding: '6px 14px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Follow
        </button>
      </div>

      {/* Title & Description */}
      <div style={{ padding: '0 16px', paddingTop: 12 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#fff',
            marginBottom: 6,
          }}
        >
          {reel.title}
        </div>
        {reel.description && (
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: 12,
              lineHeight: 1.4,
            }}
          >
            {reel.description}
          </div>
        )}
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          padding: '12px 16px',
          fontSize: 12,
          color: 'var(--muted)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span>{reel.views} views</span>
        <span>{likeCount} likes</span>
        <span>{comments.length} comments</span>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 16px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <button
          onClick={handleLike}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px',
            borderRadius: 10,
            background: liked ? 'rgba(200, 90, 26, 0.2)' : '#1a1a1a',
            border: '1px solid var(--line)',
            color: liked ? 'var(--orange)' : '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 16 }}>❤️</span>
          Like
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px',
            borderRadius: 10,
            background: showComments ? 'rgba(200, 90, 26, 0.2)' : '#1a1a1a',
            border: '1px solid var(--line)',
            color: showComments ? 'var(--orange)' : '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 16 }}>💬</span>
          Comment
        </button>

        <div style={{ flex: 1, position: 'relative' }}>
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px',
              borderRadius: 10,
              background: '#1a1a1a',
              border: '1px solid var(--line)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 16 }}>📤</span>
            Share
          </button>

          {showShareMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: '#1a1a1a',
                border: '1px solid var(--line)',
                borderRadius: 12,
                padding: 12,
                marginTop: 8,
                zIndex: 10,
                minWidth: 160,
              }}
            >
              <button
                onClick={() => handleShare('chat')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: 6,
                  marginBottom: 6,
                }}
                onMouseEnter={(e) => (e.target.style.background = 'rgba(200,90,26,0.2)')}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                📨 Share to Chat
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: 6,
                  marginBottom: 6,
                }}
                onMouseEnter={(e) => (e.target.style.background = 'rgba(200,90,26,0.2)')}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                💚 WhatsApp
              </button>
              <button
                onClick={() => handleShare('instagram')}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: 6,
                  marginBottom: 6,
                }}
                onMouseEnter={(e) => (e.target.style.background = 'rgba(200,90,26,0.2)')}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                📷 Instagram Story
              </button>
              <button
                onClick={shareToLink}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: 6,
                }}
                onMouseEnter={(e) => (e.target.style.background = 'rgba(200,90,26,0.2)')}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                🔗 Copy Link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ padding: '16px', borderTop: '1px solid var(--line)' }}>
          {/* Add Comment */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 16,
              alignItems: 'flex-start',
            }}
          >
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              style={{
                flex: 1,
                padding: '10px 12px',
                background: '#1a1a1a',
                border: '1px solid var(--line)',
                borderRadius: 8,
                color: '#fff',
                fontSize: 13,
                fontFamily: 'var(--DS)',
              }}
            />
            <button
              onClick={handleAddComment}
              style={{
                padding: '8px 14px',
                background: 'var(--orange)',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Post
            </button>
          </div>

          {/* Comments List */}
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {comment.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                    {comment.author}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {comment.text}
                  </div>
                  <button
                    style={{
                      fontSize: 11,
                      color: 'var(--muted)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    ❤️ {comment.likes} • Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
