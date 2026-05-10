'use client';
import React from 'react';
import { MapPin, Star, Users, ExternalLink } from 'lucide-react';

export default function CreatorBadgeStrip({ profile, onBookClick }) {
  if (!profile?.creatorStats) return null;

  return (
    <div style={{ maxWidth: 935, margin: '0 auto', padding: '16px 16px', background: '#f8f8f8', borderRadius: 12, marginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={16} color="var(--muted)" strokeWidth={1.5} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{profile.creatorStats.tripsPublished} trips</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Star size={16} color="var(--muted)" strokeWidth={1.5} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{profile.creatorStats.avgRating} rating</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={16} color="var(--muted)" strokeWidth={1.5} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{profile.creatorStats.totalBookings.toLocaleString()} bookings</span>
          </div>
        </div>
        <button
          onClick={onBookClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            border: '1px solid #1D9E75',
            borderRadius: 20,
            background: '#fff',
            color: '#1D9E75',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <ExternalLink size={14} strokeWidth={1.5} />
          Book a trip
        </button>
      </div>
    </div>
  );
}
