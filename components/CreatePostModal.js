'use client';
import React, { useRef, useState } from 'react';

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreatePostModal({ isOpen, onClose, onPublished }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const reset = () => {
    setTitle('');
    setBody('');
    setImagePreview('');
    setImageDataUrl('');
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const dataUrl = await fileToDataUrl(file);
    setImageDataUrl(dataUrl);
    setImagePreview(dataUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Please add both a title and body');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/community/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelSlug: '',
          title,
          body,
          imageDataUrl: imageDataUrl || '',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Unable to create post.');
      }

      reset();
      onPublished?.(result.post);
      onClose?.();
      window.location.href = '/community';
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ width: 'min(640px, 100%)', background: '#fff', borderRadius: 20, padding: 24, border: '1px solid var(--line)' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>Create Post</div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 24, cursor: 'pointer', color: 'var(--muted)' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" maxLength={100} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', fontFamily: 'var(--DS)', fontSize: 14 }} />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Share your trip story, tips, or recommendation..." rows={6} maxLength={2000} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--line)', fontFamily: 'var(--DS)', fontSize: 14, resize: 'vertical' }} />

          {imagePreview ? (
            <div style={{ position: 'relative' }}>
              <img src={imagePreview} alt="Post preview" style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 16, border: '1px solid var(--line)' }} />
              <button type="button" onClick={() => { setImagePreview(''); setImageDataUrl(''); }} style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'rgba(0,0,0,0.55)', color: '#fff', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}>×</button>
            </div>
          ) : null}

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => fileInputRef.current?.click()} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, color: 'var(--ink)' }}>
              {imagePreview ? 'Change image' : 'Add image'}
            </button>
            <div style={{ flex: 1 }} />
            <button type="button" onClick={onClose} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: 12, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, color: 'var(--ink)' }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} style={{ border: 'none', background: 'var(--orange)', borderRadius: 12, padding: '10px 16px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: 700, color: '#fff', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Posting...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
