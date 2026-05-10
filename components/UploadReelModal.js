'use client';
import React, { useState, useRef } from 'react';

export default function UploadReelModal({ isOpen, onClose, onPublish }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const preview = URL.createObjectURL(file);
      setVideoPreview(preview);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handlePublish = async () => {
    if (!videoFile || !title.trim()) {
      alert('Please select a video and add a title');
      return;
    }
    setIsPublishing(true);
    try {
      // read file as base64
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          // result is data:<type>;base64,XXXXX
          const comma = result.indexOf(',');
          resolve(result.slice(comma + 1));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64 = await toBase64(videoFile);
      const filename = `upload_${Date.now()}_${videoFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;

      const resp = await fetch('/api/reels/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, contentBase64: base64, title, description, creatorName: 'You' }),
      });

      const json = await resp.json();
      if (json?.success) {
        onPublish?.(json.data);
        resetForm();
        onClose();
      } else {
        alert('Upload failed: ' + (json?.error || 'Unknown'));
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setIsPublishing(false);
    }
  };

  const resetForm = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setTitle('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#111',
          borderRadius: 20,
          padding: 32,
          maxWidth: 600,
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid var(--line)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}
          >
            Create Reel
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 24,
              cursor: 'pointer',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Video Selection */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 10,
            }}
          >
            Select Video
          </label>

          {videoPreview ? (
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <video
                src={videoPreview}
                style={{
                  width: '100%',
                  height: 300,
                  borderRadius: 12,
                  objectFit: 'cover',
                  backgroundColor: '#000',
                }}
                controls
              />
              <button
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreview(null);
                }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: '#fff',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--line)',
                borderRadius: 12,
                padding: 40,
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--orange)';
                e.currentTarget.style.background = 'rgba(200,90,26,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>📹</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                Upload Video from Gallery
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                }}
              >
                Click to select or drag & drop
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>

        {/* Title Input */}
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 8,
            }}
          >
            Reel Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your reel a catchy title"
            maxLength={60}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#1a1a1a',
              border: '1px solid var(--line)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 13,
              fontFamily: 'var(--DS)',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              marginTop: 6,
            }}
          >
            {title.length}/60
          </div>
        </div>

        {/* Description Input */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 8,
            }}
          >
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share details about your reel, hashtags, locations..."
            maxLength={500}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#1a1a1a',
              border: '1px solid var(--line)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 13,
              fontFamily: 'var(--DS)',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              marginTop: 6,
            }}
          >
            {description.length}/500
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 18px',
              background: '#1a1a1a',
              border: '1px solid var(--line)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#2a2a2a')}
            onMouseLeave={(e) => (e.target.style.background = '#1a1a1a')}
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={!videoFile || isPublishing}
            style={{
              flex: 1,
              padding: '12px 18px',
              background: isPublishing ? 'rgba(200,90,26,0.5)' : 'var(--orange)',
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: isPublishing || !videoFile ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: !videoFile ? 0.5 : 1,
            }}
            onMouseEnter={(e) =>
              !isPublishing &&
              videoFile &&
              (e.target.style.background = '#A8480E')
            }
            onMouseLeave={(e) =>
              !isPublishing &&
              videoFile &&
              (e.target.style.background = 'var(--orange)')
            }
          >
            {isPublishing ? 'Publishing...' : 'Publish Reel'}
          </button>
        </div>
      </div>
    </div>
  );
}
