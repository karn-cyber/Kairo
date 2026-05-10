'use client';
import React from 'react';
import { Copy } from 'lucide-react';

export default function ShareSheet({ reel, onClose, onShare }) {
  const copyLink = () => {
    const link = `${window.location.origin}/reels/${reel.id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', zIndex: 1300 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 520, maxWidth: '94%', background: '#111', borderRadius: 12, padding: 16, color: '#fff' }}>
        <h3 style={{ margin: 0, marginBottom: 12 }}>Share reel</h3>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Share to Kairo chats</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[{name:'Priya Sharma'},{name:'Trek Squad'},{name:'Arjun Verma'}].map((p,i)=> (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, borderRadius: 8, background: '#1a1a1a' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                  <div>{p.name}</div>
                </div>
                <button onClick={() => onShare?.('chat', reel, p)} style={{ background: 'var(--orange)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8 }}>Send</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Share externally</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onShare?.('whatsapp', reel)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#25D366', color: '#fff' }}>WhatsApp</button>
            <button onClick={() => onShare?.('twitter', reel)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#1DA1F2', color: '#fff' }}>Twitter</button>
            <button onClick={() => onShare?.('instagram', reel)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#C13584', color: '#fff' }}>Instagram</button>
            <button onClick={copyLink} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--line)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}><Copy size={16} strokeWidth={1.5} /> Copy link</button>
          </div>
        </div>
      </div>
    </div>
  );
}
