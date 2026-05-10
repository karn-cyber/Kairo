import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Card } from '@/components/UI';

export default function TripDetail() {
  return (
    <>
      <Nav variant="light" />
      <section className="section cream" style={{ paddingTop: '90px', paddingBottom: '90px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 className="section-title ink" style={{ marginBottom: '12px' }}>
            Trip Section Updated
          </h1>
          <p className="section-body" style={{ maxWidth: '780px', marginBottom: '18px' }}>
            The Trip section now follows a curated guide format: only verified creators and verified trip providers can publish,
            while all travellers can browse and book item-wise or full package.
          </p>

          <Card style={{ background: '#fff', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--ink3)', lineHeight: 1.7, marginBottom: '14px' }}>
              Open a curated trip to see day-by-day storytelling with inline bookable items and a sticky
              <strong style={{ color: 'var(--ink)' }}> Book this entire trip</strong> CTA.
            </div>
            <Link
              href="/trip-hub"
              style={{
                display: 'inline-block',
                background: '#111',
                color: '#fff',
                padding: '11px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Go to Curated Trips
            </Link>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}

