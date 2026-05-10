import React from 'react';
import NodeEdgeStrip from './NodeEdgeStrip';

export default function TripCard({ trip, onView, onBook }) {
  return (
    <article style={{ borderRadius: 12, background: '#fff', padding: 18, border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>{(trip.author||'')[0]?.toUpperCase()}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: 16, lineHeight: 1.1 }}>{trip.title}</div>
              <div style={{ marginTop: 6, fontSize: 13, color: 'var(--muted)' }}>{trip.author} · <span style={{ fontWeight: 700 }}>{trip.authorType}</span></div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)' }}>{trip.price}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{trip.priceNote || 'Per person'}</div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>{trip.duration} · {trip.group || 'Small group'}{trip.rating ? ` · ${trip.rating}` : ''}</div>
        </div>
      </header>

      <div style={{ marginTop: 4 }}>
        <NodeEdgeStrip nodes={trip.nodes || []} />
      </div>

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>{trip.priceNote ? trip.priceNote : ''}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onView && onView(trip)} style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid var(--line)', background: '#fff', color: 'var(--ink)', cursor: 'pointer', fontWeight: 700 }}>View</button>
          <button onClick={() => onBook && onBook(trip)} style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: '#111', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Book trip</button>
        </div>
      </footer>
    </article>
  );
}
