'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Button, Card } from '@/components/UI';

export default function Investors() {
  return (
    <>
      <Nav variant="light" />
      <section className="section warm">
        <div className="container" style={{maxWidth: '900px'}}>
          <h1 className="section-title ink">Investors</h1>
          <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '24px'}}>
            Kairo is building the category-defining layer for adventure travel discovery, booking, and group coordination.
          </p>
          <Card style={{padding: '24px', marginBottom: '18px'}}>
            <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px'}}>Request our deck</div>
            <div style={{fontSize: '13px', color: 'var(--muted)'}}>Reach out and we’ll share the current company story and roadmap.</div>
          </Card>
          <Link href="/contact"><Button variant="primary">Contact the team</Button></Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
