'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Button, Card } from '@/components/UI';

export default function Careers() {
  return (
    <>
      <Nav variant="light" />
      <section className="section warm">
        <div className="container" style={{maxWidth: '900px'}}>
          <h1 className="section-title ink">Join the Kairo team</h1>
          <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '24px'}}>
            We’re building the operating system for Indian adventure travel. If you care about travel, product, design, or partnerships, we’d love to hear from you.
          </p>
          <Card style={{padding: '24px', marginBottom: '18px'}}>
            <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px'}}>Open roles</div>
            <div style={{fontSize: '13px', color: 'var(--muted)'}}>No live openings right now — send us your profile and tell us what you’d build.</div>
          </Card>
          <Link href="/signup"><Button variant="primary">Send your profile</Button></Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
