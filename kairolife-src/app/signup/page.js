'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import { useState } from 'react';
import PhotoStrips from '@/components/PhotoStrips';

export default function Signup() {
  const [role, setRole] = useState('traveller');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'traveller', label: 'Traveller', desc: 'Discover and book trips' },
    { id: 'agency', label: 'Agency', desc: 'List and manage departures' },
    { id: 'creator', label: 'Creator', desc: 'Curate trips and earn' }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, role })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong.');
      }

      setStatus('Thanks! We saved your signup and will reach out soon.');
      setFullName('');
      setEmail('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to save signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav variant="light" />

      <section className="section warm">
        <div className="container" style={{maxWidth: '1120px'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '36px', alignItems: 'center'}}>
            <div>
              <Badge type="orange">Join Kairo</Badge>
              <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 900, color: 'var(--ink)', lineHeight: 1.02, margin: '18px 0 18px'}}>
                Create your travel identity.
              </h1>
              <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '28px'}}>
                Sign up to save trips, chat with your group, and get verified access to the best agencies, creators, and community-led adventures.
              </p>

              <div style={{display: 'grid', gap: '12px', marginBottom: '24px'}}>
                {roles.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRole(item.id)}
                    style={{
                      border: `1px solid ${role === item.id ? 'var(--orange)' : 'rgba(26,22,18,0.10)'}`,
                      background: role === item.id ? 'rgba(200,90,26,0.08)' : '#fff',
                      borderRadius: '16px',
                      padding: '16px 18px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center'}}>
                      <div>
                        <div style={{fontWeight: 700, color: 'var(--ink)', marginBottom: '4px'}}>{item.label}</div>
                        <div style={{fontSize: '13px', color: 'var(--muted)'}}>{item.desc}</div>
                      </div>
                      {role === item.id && <Badge type="orange">Selected</Badge>}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <Button variant="primary">Continue with Email</Button>
                <Link href="/" style={{alignSelf: 'center', color: 'var(--ink3)', fontWeight: 600, fontSize: '14px'}}>
                  Back to home
                </Link>
              </div>
            </div>

            <div style={{position: 'relative', minHeight: '520px'}}>
              <div style={{position: 'absolute', inset: '14px 10px 14px 30px', borderRadius: '28px', overflow: 'hidden', opacity: 0.95}}>
                <PhotoStrips labels={false} overlay={true} />
              </div>

              <Card style={{padding: '28px', borderRadius: '24px', position: 'relative', zIndex: 2, background: 'rgba(255,253,248,0.88)', backdropFilter: 'blur(16px)'}}>
              <div style={{fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '8px'}}>
                Account details
              </div>
              <div style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 800, color: 'var(--ink)', marginBottom: '18px'}}>
                Join the waitlist
              </div>

              <form onSubmit={handleSubmit} style={{display: 'grid', gap: '14px'}}>
                <div>
                  <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>Full name</div>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    type="text"
                    placeholder="Full name"
                    style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(26,22,18,0.12)', padding: '14px 16px', fontFamily: 'var(--DS)', fontSize: '14px', outline: 'none'}}
                    required
                  />
                </div>

                <div>
                  <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>Email address</div>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Email address"
                    style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(26,22,18,0.12)', padding: '14px 16px', fontFamily: 'var(--DS)', fontSize: '14px', outline: 'none'}}
                    required
                  />
                </div>

                <div>
                  <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>Selected role</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'}}>
                    <Badge type="orange">{roles.find((item) => item.id === role)?.label}</Badge>
                    <span style={{fontSize: '12px', color: 'var(--muted)'}}>We’ll use this to tailor your onboarding.</span>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={loading} style={{width: '100%'}}>
                  {loading ? 'Saving...' : 'Join the waitlist'}
                </Button>

                {status && <div style={{fontSize: '13px', color: 'var(--ink3)', lineHeight: 1.5}}>{status}</div>}

                <div style={{fontSize: '12px', color: 'var(--muted)', textAlign: 'center'}}>
                  Already on Kairo? <Link href="/" style={{color: 'var(--orange)', fontWeight: 600}}>Back to home</Link>
                </div>
              </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
