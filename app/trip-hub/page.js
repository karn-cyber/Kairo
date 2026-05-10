'use client';

import { useMemo, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import TripFilters from '@/components/TripFilters';

const SAMPLE_TRIPS = [
  {
    slug: 'kedarkantha-winter-trek',
    title: 'What no travel blog will tell you about Kedarkantha in winter',
    author: 'Aarav Singh',
    authorType: 'Verified Creator',
    duration: '6 days',
    group: 'Small group',
    price: '₹24,900',
    priceNote: 'All-in incl. stays',
    nodes: [
      { type: 'stay', label: 'Dehradun' },
      { type: 'activity', label: 'Sankri drive' },
      { type: 'note', label: 'Raju chai' },
      { type: 'food', label: 'Juda kitchen' },
      { type: 'stay', label: 'Juda camp' }
    ],
    tags: ['Trek','Winter','Offbeat']
  },
  {
    slug: 'coorg-monsoon-thread',
    title: 'Coorg in monsoon — what worked for our group',
    author: 'Mitali Roy',
    authorType: 'Verified Creator',
    duration: '3 days',
    group: 'Couple',
    price: '₹7,200',
    priceNote: 'Excl. bike rental',
    nodes: [
      { type: 'stay', label: 'Madikeri' },
      { type: 'activity', label: 'Coffee estate' },
      { type: 'activity', label: 'Abbey Falls' },
      { type: 'food', label: 'Local cafe' },
      { type: 'note', label: 'Monsoon detour' }
    ],
    tags: ['Road trip','Budget-friendly']
  }
];

export default function TripHub() {
  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('Trending');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_TRIPS.filter(t => {
      if (!q) return true;
      return (t.title + ' ' + t.author + ' ' + (t.tags||[]).join(' ')).toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <>
      <Nav variant="light" />

      <section className="section cream" style={{ paddingTop: '90px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ marginBottom: 10 }}>
            <div>
              <div className="section-eyebrow">Trip Section</div>
              <h1 className="section-title ink">Curated Trip Feed</h1>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>Only verified creators and trip providers publish — everyone can browse and book.</div>
            </div>

            {/* centered search + tabs + filters */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
              <TripFilters query={query} setQuery={setQuery} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </div>
          </div>

          {/* shared legend (black-border white nodes) */}
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 12, justifyContent: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginRight: 8 }}>Legend</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 12, height: 12, borderRadius: 12, background: '#fff', border: '2px solid #111' }} /> Stay</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 12, height: 12, borderRadius: 12, background: '#fff', border: '2px solid #111' }} /> Activity</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 12, height: 12, borderRadius: 12, background: '#fff', border: '2px solid #111' }} /> Food</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 12, height: 12, borderRadius: 12, background: '#fff', border: '2px solid #111' }} /> Note</div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {filtered.map(trip => (
              <TripCard key={trip.slug} trip={trip} onView={() => { window.location.href = `/trip/${trip.slug}` }} onBook={() => { window.location.href = `/trip/${trip.slug}` }} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
