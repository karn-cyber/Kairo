'use client';
import React from 'react';

export default function CreatorStrip({ onCreate }) {
  const followed = [
    { id: 'user_102', name: 'alexwander', avatar: '🧗' },
    { id: 'user_104', name: 'beachvibes', avatar: '🏖️' },
  ];

  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 16px', overflowX: 'auto', alignItems: 'center', background: '#0f0f0f' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={onCreate}>
        <div style={{ width: 56, height: 56, borderRadius: 28, border: '2px dashed var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', background: 'transparent' }}>+</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Your reel</div>
      </div>
      {followed.map((f) => (
        <div key={f.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.avatar}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{f.name}</div>
        </div>
      ))}
    </div>
  );
}
