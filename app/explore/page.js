'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Card } from '@/components/UI';
import Link from 'next/link';
import PhotoStrips, { travelPhotos } from '@/components/PhotoStrips';
import AuthGate from '@/components/AuthGate';

const treks = [
  { id: 1, slug: 'kedarkantha-winter-trek', location: 'Uttarakhand', name: 'Kedarkantha Winter Trek', days: '6D / 4N', price: '₹8,500', photo: travelPhotos[0].src },
  { id: 2, slug: 'spiti-valley-expedition', location: 'Himachal Pradesh', name: 'Spiti Valley Expedition', days: '8D / 7N', price: '₹14,200', photo: travelPhotos[1].src },
  { id: 3, slug: 'kudremukh-ridge-weekend', location: 'Karnataka', name: 'Kudremukh Ridge Weekend', days: '2D / 1N', price: '₹4,200', photo: travelPhotos[2].src },
  { id: 4, slug: 'hampta-pass', location: 'Himachal', name: 'Hampta Pass', days: '5D / 4N', price: '₹11,800', photo: travelPhotos[3].src },
  { id: 5, slug: 'kudremukh-ridge', location: 'Karnataka', name: 'Kudremukh Ridge', days: '2D / 1N', price: '₹4,200', photo: travelPhotos[4].src },
  { id: 6, slug: 'chadar-trek', location: 'Ladakh', name: 'Chadar Trek', days: '9D / 8N', price: '₹22,500', photo: travelPhotos[5].src },
  { id: 7, slug: 'coorg-coffee-trail', location: 'Karnataka', name: 'Coorg Coffee Trail', days: '3D / 2N', price: '₹6,800', photo: travelPhotos[6].src },
  { id: 8, slug: 'valley-of-flowers', location: 'Uttarakhand', name: 'Valley of Flowers', days: '6D / 5N', price: '₹9,200', photo: travelPhotos[7].src },
  { id: 9, slug: 'living-root-bridge', location: 'Meghalaya', name: 'Living Root Bridge', days: '4D / 3N', price: '₹8,500', photo: travelPhotos[0].src },
  { id: 10, slug: 'triund-moonlight', location: 'Himachal', name: 'Triund Moonlight', days: '2D / 1N', price: '₹3,200', photo: travelPhotos[1].src },
  { id: 11, slug: 'pin-parvati-pass', location: 'Himachal', name: 'Pin Parvati Pass', days: '10D / 9N', price: '₹18,900', photo: travelPhotos[2].src },
  { id: 12, slug: 'auli-snow-trek', location: 'Uttarakhand', name: 'Auli Snow Trek', days: '4D / 3N', price: '₹7,500', photo: travelPhotos[3].src },
];

export default function Explore() {
  return (
    <>
      <Nav variant="light" />
      <AuthGate title="Explore is members only" description="Sign in to browse verified treks, trips, and agencies.">
        <section className="section warm" style={{paddingTop: '60px'}}>
          <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '24px', alignItems: 'stretch', marginBottom: '36px'}}>
            <div style={{paddingTop: '6px'}}>
              <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1px', marginBottom: '14px'}}>
                Explore <em style={{fontStyle: 'italic', color: 'var(--orange)'}}>India</em>
              </h1>
              <p style={{fontSize: '16px', color: 'var(--muted)', maxWidth: '500px', lineHeight: 1.7}}>
                Verified treks, camps, and adventures — all from agencies you can trust.
              </p>
            </div>
            <div style={{position: 'relative', minHeight: '170px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 18px 45px rgba(26,22,18,0.08)'}}>
              <PhotoStrips labels={false} overlay={true} />
            </div>
          </div>

          {/* Search and filters */}
          <div style={{display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '28px'}}>
            <div style={{flex: 1, background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '14px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span style={{fontSize: '14px', color: 'var(--muted)'}}>Search treks, camps, destinations, agencies...</span>
            </div>
            <div style={{background: 'var(--cream)', border: '1.5px solid var(--line)', borderRadius: '14px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink2)" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              <span style={{fontSize: '13px', fontWeight: 500, color: 'var(--ink2)'}}>Filters</span>
            </div>
          </div>

          {/* Filter chips */}
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px'}}>
            {['All', 'Treks', 'Camps', 'Weekends', 'Budget', 'Easy', 'Hard', 'Himachal', 'Uttarakhand', 'Karnataka'].map((filter, i) => (
              <div key={i} style={{background: i === 0 ? 'var(--orange)' : 'transparent', color: i === 0 ? '#fff' : 'var(--muted)', border: `1.5px solid ${i === 0 ? 'var(--orange)' : 'var(--line)'}`, borderRadius: '100px', padding: '8px 18px', fontSize: '12px', fontWeight: i === 0 ? 600 : 500, cursor: 'pointer'}}>
                {filter}
              </div>
            ))}
          </div>

          {/* Featured treks */}
          <div style={{marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <h2 style={{fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)'}}>Featured This Season</h2>
            <span style={{fontSize: '13px', color: 'var(--orange)', fontWeight: 500, cursor: 'pointer'}}>See all</span>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px'}}>
            {treks.slice(0, 3).map((trek) => (
              <Link key={trek.id} href={`/trip/${trek.slug}`}>
              <Card style={{padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s'}}>
                <div style={{height: '200px', position: 'relative', backgroundImage: `url(${trek.photo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.65),transparent)'}}></div>
                  <Badge type="white" style={{position: 'absolute', top: '14px', left: '14px'}}>Bestseller</Badge>
                  <Badge type="verified" style={{position: 'absolute', top: '14px', right: '14px'}}>Verified</Badge>
                  <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px'}}>
                    <div style={{fontSize: '9px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '.07em'}}>
                      {trek.location}
                    </div>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '16px', fontWeight: 700, color: '#fff', lineHeight: 1.2}}>
                      {trek.name}
                    </div>
                  </div>
                </div>
                <div style={{padding: '14px 16px 16px'}}>
                  <div style={{display: 'flex', gap: '10px', marginBottom: '12px'}}>
                    <span style={{fontSize: '11px', color: 'var(--muted)'}}>6 days</span>
                    <span style={{fontSize: '11px', color: 'var(--muted)'}}>12,500 ft</span>
                    <span style={{background: 'rgba(212,160,23,0.12)', color: 'var(--gold)', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '100px'}}>Moderate</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '20px', fontWeight: 700, color: 'var(--ink)'}}>
                      {trek.price}
                    </div>
                    <span style={{background: 'var(--orange)', color: '#fff', borderRadius: '9px', padding: '8px 16px', fontSize: '12px', fontWeight: 600}}>
                      Book
                    </span>
                  </div>
                </div>
              </Card>
              </Link>
            ))}
          </div>

          {/* All treks grid */}
          <div style={{marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <h2 style={{fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)'}}>All Trips</h2>
            <span style={{fontSize: '13px', color: 'var(--muted)'}}>Showing 12 of 84</span>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px'}}>
            {treks.map((trek) => (
              <Link key={trek.id} href={`/trip/${trek.slug}`}>
                <Card style={{padding: 0, overflow: 'hidden', cursor: 'pointer'}}>
                  <div style={{height: '120px', backgroundImage: `url(${trek.photo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div style={{padding: '12px'}}>
                    <div style={{fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '3px'}}>
                      {trek.location}
                    </div>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px'}}>
                      {trek.name}
                    </div>
                    <div style={{fontSize: '11px', color: 'var(--muted)', marginBottom: '6px'}}>
                      {trek.days}
                    </div>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '15px', fontWeight: 700, color: 'var(--orange)'}}>
                      {trek.price}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--line)'}}>
            {[1, 2, 3, '...', 7].map((page, i) => (
              <div key={i} style={{width: '36px', height: '36px', borderRadius: '9px', background: page === 1 ? 'var(--orange)' : 'transparent', border: page === 1 ? 'none' : '1px solid var(--line)', color: page === 1 ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', cursor: page !== '...' ? 'pointer' : 'default'}}>
                {page}
              </div>
            ))}
          </div>
          </div>
        </section>
      </AuthGate>

      <Footer />
    </>
  );
}
