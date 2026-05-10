import React from 'react';

export default function TripFilters({ query, setQuery, selectedTab, setSelectedTab }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destination, vibe, or creator"
        style={{ width: 'min(1100px, 94%)', maxWidth: '1100px', padding: '12px 18px', borderRadius: 14, border: '1px solid var(--line)', background: '#fff', textAlign: 'left', boxShadow: '0 1px 0 rgba(0,0,0,0.03)' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 'min(1100px, 94%)', justifyContent: 'space-between', maxWidth: '1100px', overflowX: 'auto', padding: '6px 4px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {['Trending','Newest','Budget-friendly','Verified creators'].map(t => (
            <button key={t} onClick={() => setSelectedTab(t)} style={{ padding: '8px 12px', borderRadius: 10, background: selectedTab===t? '#111':'#fff', color: selectedTab===t? '#fff':'var(--ink)', border: '1px solid var(--line)', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {['All','Trek','Road trip','City','Offbeat'].map(f => (
            <button key={f} style={{ padding: '6px 12px', borderRadius: 10, border: '1px solid var(--line)', background: '#fff', color: 'var(--ink)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{f}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
