'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useReelFeed } from '@/hooks/useReelFeed';
import ReelPlayer from '@/components/ReelPlayer';
import ReelActions from '@/components/ReelActions';
import BottomCaption from '@/components/BottomCaption';
import UploadReelModal from '@/components/UploadReelModal';
import CommentsPanel from '@/components/CommentsPanel';
import ShareSheet from '@/components/ShareSheet';

export default function ReelsPage() {
  const { reels, loading, prependReel } = useReelFeed();
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(() => {
    // Load mute state from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('reelsMuted') === 'true';
    }
    return true;
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCommentsFor, setShowCommentsFor] = useState(null);
  const [showShareFor, setShowShareFor] = useState(null);
  const containerRef = useRef(null);
  const prevReelRef = useRef(null);

  // Save mute state to localStorage
  useEffect(() => {
    localStorage.setItem('reelsMuted', muted);
  }, [muted]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') setIndex((i) => Math.min(reels.length - 1, i + 1));
      if (e.key === 'ArrowUp') setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reels.length]);

  useEffect(() => {
    // scroll the container to index (snap)
    const el = containerRef.current;
    if (!el) return;
    const child = el.children[index];
    if (child) child.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [index]);

  const handlePublish = (newReel) => prependReel(newReel);

  const handleLike = (reel) => {
    reel.isLiked = !reel.isLiked;
    reel.likes = reel.isLiked ? reel.likes + 1 : Math.max(0, reel.likes - 1);
    setIndex((i) => i);
  };

  const handleComment = (reel) => setShowCommentsFor(reel);
  const handleShare = (reel) => setShowShareFor(reel);
  const handleSave = (reel) => { reel.isSaved = !reel.isSaved; setIndex((i) => i); };
  const handleMore = (reel) => alert('More options');

  const handleMuteToggle = (newMuted) => {
    setMuted(newMuted);
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', background: '#0a0a0a', overflow: 'hidden' }}>
      {/* Full-screen video feed */}
      <div ref={containerRef} style={{ flex: 1, overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
        {reels.map((reel, idx) => (
          <div
            key={reel.id}
            style={{
              height: '100vh',
              scrollSnapAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: '#000',
            }}
          >
            <div style={{ width: '100%', maxWidth: 420, height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Video Player */}
              <ReelPlayer
                reel={reel}
                onEnded={() => setIndex((i) => Math.min(reels.length - 1, i + 1))}
                autoPlay={idx === index}
                muted={muted}
                onMuteToggle={handleMuteToggle}
              />

              {/* Action buttons overlay */}
              <ReelActions reel={reel} onLike={handleLike} onComment={handleComment} onShare={handleShare} onSave={handleSave} onMore={handleMore} />

              {/* Bottom caption */}
              <BottomCaption reel={reel} onFollow={() => {}} />
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <UploadReelModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} onPublish={handlePublish} />
      {showCommentsFor && <CommentsPanel reel={showCommentsFor} onClose={() => setShowCommentsFor(null)} />}
      {showShareFor && <ShareSheet reel={showShareFor} onClose={() => setShowShareFor(null)} onShare={(p, r) => { alert(`Shared ${r.title} to ${p}`); }} />}
    </div>
  );
}
