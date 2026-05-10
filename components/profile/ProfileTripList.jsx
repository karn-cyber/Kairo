'use client';
import React from 'react';
import { MapPin } from 'lucide-react';

const mockTrips = [
  {
    id: 'trip_1',
    title: 'Spiti Valley Explorer',
    price: '₹45,000',
    location: 'Spiti Valley',
    days: 7,
    rating: 4.8,
    reviews: 24,
    nodes: [
      { type: 'activity', label: 'Trek' },
      { type: 'food', label: 'Local meal' },
      { type: 'stay', label: 'Homestay' },
    ],
  },
  {
    id: 'trip_2',
    title: 'Coffee Country Drive',
    price: '₹32,000',
    location: 'Coorg',
    days: 3,
    rating: 4.6,
    reviews: 18,
    nodes: [
      { type: 'activity', label: 'Coffee tour' },
      { type: 'stay', label: 'Resort' },
    ],
  },
  {
    id: 'trip_3',
    title: 'Hampi Heritage Trail',
    price: '₹28,000',
    location: 'Hampi',
    days: 4,
    rating: 4.9,
    reviews: 31,
    nodes: [
      { type: 'activity', label: 'Heritage walk' },
      { type: 'food', label: 'Brunch' },
    ],
  },
];

export default function ProfileTripList({ trips = mockTrips, onTripClick, isCreator = true }) {
  if (!isCreator) {
    return (
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '60px 16px', textAlign: 'center', background: '#fff' }}>
        <MapPin size={48} color="var(--muted)" style={{ margin: '0 auto', display: 'block', marginBottom: 16 }} />
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No trips published yet</div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>This creator hasn't published any trips yet</div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '60px 16px', textAlign: 'center', background: '#fff' }}>
        <MapPin size={48} color="var(--muted)" style={{ margin: '0 auto', display: 'block', marginBottom: 16 }} />
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No trips published yet</div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>Verified creators can publish curated trip guides</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', padding: '24px 16px', background: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onTripClick?.(trip)}
            style={{
              padding: 16,
              border: '1px solid var(--line)',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: 18, fontWeight: 600 }}>{trip.title}</h3>
                <div style={{ fontSize: 14, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  📍 {trip.location} · {trip.days} days
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{trip.price}</div>
                <button style={{ padding: '6px 16px', border: '1px solid #1D9E75', borderRadius: 20, background: '#fff', color: '#1D9E75', fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>
                  Book now
                </button>
              </div>
            </div>

            {/* Nodes preview */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              {trip.nodes.map((node, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: node.type === 'activity' ? '#FF6B6B' : node.type === 'food' ? '#4ECDC4' : '#45B7D1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: '#fff',
                    }}
                  >
                    {node.label[0]}
                  </div>
                  <span style={{ fontSize: 12, color: '#111' }}>{node.label}</span>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              ⭐ {trip.rating} ({trip.reviews} reviews)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
