'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, profile }) {
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
    link: profile?.links?.[0]?.url || '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: '100%',
          maxWidth: 500,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--line)' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Edit profile</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
            <X size={20} color="#111" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Profile photo</label>
            <button style={{ padding: '8px 16px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>Change photo</button>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Name</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Bio ({formData.bio.length}/150)</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value.slice(0, 150))}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, boxSizing: 'border-box', minHeight: 100, fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Website</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => handleChange('link', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 12, padding: 16, borderTop: '1px solid var(--line)' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px 16px', border: '1px solid var(--line)', borderRadius: 8, background: '#fff', cursor: 'pointer', fontWeight: 600 }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ flex: 1, padding: '10px 16px', border: 'none', borderRadius: 8, background: '#1D9E75', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
