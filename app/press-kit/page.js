'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Button, Card } from '@/components/UI';

export default function PressKit() {
  return (
    <>
      <Nav variant="light" />
      <section className="section cream">
        <div className="container" style={{maxWidth: '900px'}}>
          <h1 className="section-title ink">Press kit</h1>
          <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '24px'}}>
            Logos, product screenshots, founder bios, and company info will live here.
          </p>
          <Card style={{padding: '24px', marginBottom: '18px'}}>
            <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px'}}>Media assets</div>
            <div style={{fontSize: '13px', color: 'var(--muted)'}}>Available on request while we finish the launch library.</div>
          </Card>
          <Link href="/about"><Button variant="primary">Learn about Kairo</Button></Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
