'use client';
import React from 'react';
import { MapPin } from 'lucide-react';

const mockTrips = [
  {
    id: 'trip_1',
    title: 'Kedarkantha Winter Trek',
    price: '₹8,500',
    location: 'Uttarakhand',
    days: 6,
    rating: 4.9,
    reviews: 127,
    nodes: [
      { type: 'activity', label: 'Trek' },
      { type: 'food', label: 'Juda ki Chai' },
      { type: 'stay', label: 'Base camp stay' },
    ],
  },
  {
    id: 'trip_2',
    title: 'Coorg in Monsoon',
    price: '₹7,200',
    location: 'Karnataka',
    days: 3,
    rating: 4.8,
    reviews: 92,
    nodes: [
      { type: 'activity', label: 'Coffee estate' },
      { type: 'stay', label: 'Coffee stay' },
    ],
  },
  {
    id: 'trip_3',
    title: 'Spiti Valley Expedition',
    price: '₹24,900',
    location: 'Himachal Pradesh',
    days: 6,
    rating: 4.9,
    reviews: 145,
    nodes: [
      { type: 'activity', label: 'Road trip' },
      { type: 'food', label: 'Local meals' },
      { type: 'stay', label: 'Homestay' },
    ],
  },
];

export default function ProfileTripList({ trips = mockTrips, onTripClick, isCreator = true }) {
  if (!isCreator) {
    return (
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '60px 16px', textAlign: 'center', background: 'var(--cream)' }}>
        <MapPin size={48} color="var(--orange)" style={{ margin: '0 auto', display: 'block', marginBottom: 16 }} />
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>No trips published yet</div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>This creator hasn't published any trips yet</div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '60px 16px', textAlign: 'center', background: 'var(--cream)' }}>
        <MapPin size={48} color="var(--orange)" style={{ margin: '0 auto', display: 'block', marginBottom: 16 }} />
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>No trips published yet</div>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>Verified creators can publish curated trip guides</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', padding: '24px 16px', background: 'var(--cream)' }}>
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
              background: '#fff',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,90,26,0.10)')}
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
                <button style={{ padding: '6px 16px', border: '1px solid var(--orange)', borderRadius: 20, background: '#fff', color: 'var(--orange)', fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>
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
                      background: node.type === 'activity' ? 'var(--orange)' : node.type === 'food' ? 'var(--sage)' : 'var(--sky)',
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
