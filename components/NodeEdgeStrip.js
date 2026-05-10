import React from 'react';

// NodeEdgeStrip: renders horizontal sequence of nodes with labels below.
export default function NodeEdgeStrip({ nodes = [], size = 12, gap = 28 }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'flex-start', gap: gap + 'px', padding: '6px 0' }}>
      {nodes.map((n, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 36 }}>
          <div style={{
            width: size + 'px',
            height: size + 'px',
            borderRadius: '50%',
            background: '#fff',
            border: '2px solid #111',
            boxSizing: 'border-box'
          }} />

          {/* connecting line: rendered to the right of each node except last */}
          <div style={{ position: 'relative', width: '100%', height: 0 }}>
            {i < nodes.length - 1 && (
              <div style={{ position: 'absolute', left: '50%', top: '-10px', transform: 'translateX(0)', width: gap + 'px', height: '2px', background: 'var(--line)', marginLeft: '18px' }} />
            )}
          </div>

          <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', maxWidth: 84, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {n.label || ''}
          </div>
        </div>
      ))}
    </div>
  );
}
