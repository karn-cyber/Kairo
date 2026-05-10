'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function ReelPlayer({ reel, onEnded, autoPlay=true, muted: externalMuted, onMuteToggle }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(externalMuted ?? true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef(null);

  // Update local mute state when external muted changes
  useEffect(() => {
    if (externalMuted !== undefined) {
      setMuted(externalMuted);
    }
  }, [externalMuted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress((v.currentTime / Math.max(1, v.duration)) * 100);
    const onLoaded = () => setDuration(v.duration || 0);
    const onWaiting = () => setBuffering(true);
    const onPlaying = () => setBuffering(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('playing', onPlaying);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('playing', onPlaying);
    };
  }, [reel]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [playing, reel]);

  useEffect(() => {
    setProgress(0);
    setDuration(0);
    setPlaying(autoPlay);
  }, [reel, autoPlay]);

  const togglePlay = () => {
    setPlaying((p) => !p);
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  const toggleMuted = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (videoRef.current) videoRef.current.muted = newMuted;
    onMuteToggle?.(newMuted);
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    if (videoRef.current) videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const handleEnded = () => {
    if (videoRef.current) {
      if (videoRef.current._playedOnce) {
        onEnded?.();
      } else {
        videoRef.current._playedOnce = true;
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: '#0a0a0a' }}>
      <div style={{ width: '100%', maxWidth: 420, height: '94vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {buffering && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <div style={{ width: 80, height: 80, borderRadius: 40, border: '6px solid rgba(255,255,255,0.06)', borderTopColor: 'var(--orange)', animation: 'spin .8s linear infinite' }} />
          </div>
        )}

        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted={muted}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
          onClick={togglePlay}
          onEnded={handleEnded}
          loop={false}
          playsInline
          autoPlay={autoPlay}
        />

        {/* Control Overlay */}
        {showControls && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: 12, zIndex: 3 }}>
            <button onClick={togglePlay} style={{ background: 'transparent', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              {playing ? <Pause size={64} fill="#fff" color="#fff" strokeWidth={1} /> : <Play size={64} fill="#fff" color="#fff" strokeWidth={1} />}
            </button>
          </div>
        )}

        {/* Mute Button - top right */}
        <button
          onClick={toggleMuted}
          style={{ position: 'absolute', right: 12, top: 12, background: 'rgba(0,0,0,0.45)', border: '1px solid var(--line)', color: '#fff', padding: '8px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4 }}
        >
          {muted ? <VolumeX size={20} color="#fff" strokeWidth={1.5} /> : <Volume2 size={20} color="#fff" strokeWidth={1.5} />}
        </button>

        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'rgba(255,255,255,0.04)', cursor: 'pointer', borderRadius: '0 0 12px 0' }}
        >
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--orange)' }} />
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
