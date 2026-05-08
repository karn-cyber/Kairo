'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Button, Card } from '@/components/UI';

export default function Contact() {
  return (
    <>
      <Nav variant="light" />
      <section className="section cream">
        <div className="container" style={{maxWidth: '900px'}}>
          <h1 className="section-title ink">Contact Kairo</h1>
          <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '24px'}}>
            For partnerships, support, media, or investor questions, start here.
          </p>
          <Card style={{padding: '24px', marginBottom: '18px'}}>
            <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px'}}>hello@kairolife.in</div>
            <div style={{fontSize: '13px', color: 'var(--muted)'}}>We usually reply within 1–2 business days.</div>
          </Card>
          <Link href="/signup"><Button variant="primary">Join the waitlist</Button></Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
