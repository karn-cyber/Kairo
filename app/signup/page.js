'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import { useState } from 'react';
import PhotoStrips from '@/components/PhotoStrips';

export default function Signup() {
  const router = useRouter();
  const [mode, setMode] = useState('signup');
  const [role, setRole] = useState('traveller');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'traveller', label: 'Enter as Traveller', desc: 'Discover trips, save plans, and join the community.' },
    { id: 'agency', label: 'Enter as Agency', desc: 'List departures, manage bookings, and reply to travellers.' }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const endpoint = mode === 'signup' ? '/api/signup/' : '/api/login/';
      const payload = mode === 'signup'
        ? {
            fullName,
            email,
            password,
            role,
          }
        : {
            email,
            password,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong.');
      }

      setStatus(`Welcome, ${result.user?.fullName || 'traveller'} — your account is ready.`);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      router.push('/trip-hub/');
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
              <Badge type="orange">Access Kairo</Badge>
              <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 900, color: 'var(--ink)', lineHeight: 1.02, margin: '18px 0 18px'}}>
                Sign up or sign in to continue.
              </h1>
              <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '28px'}}>
                Create your account once, then use it to access Explore, Community, and the rest of Kairo.
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
                <Button variant={mode === 'signup' ? 'primary' : 'ghost'} onClick={() => setMode('signup')}>
                  Create account
                </Button>
                <Button variant={mode === 'login' ? 'primary' : 'ghost'} onClick={() => setMode('login')}>
                  Sign in
                </Button>
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
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px'}}>
                <Button variant={mode === 'signup' ? 'primary' : 'ghost'} onClick={() => setMode('signup')} style={{width: '100%'}}>
                  Create account
                </Button>
                <Button variant={mode === 'login' ? 'primary' : 'ghost'} onClick={() => setMode('login')} style={{width: '100%'}}>
                  Sign in
                </Button>
              </div>

              <div style={{fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '8px'}}>
                Secure access
              </div>
              <div style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 800, color: 'var(--ink)', marginBottom: '18px'}}>
                {mode === 'signup' ? 'Create your account' : 'Sign in with your password'}
              </div>

              <div style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '18px'}}>
                {mode === 'signup'
                  ? 'Choose whether you are entering as a traveller or an agency, then create your password.'
                  : 'Use the email and password you already saved to get back in.'}
              </div>

              <form onSubmit={handleSubmit} style={{display: 'grid', gap: '14px'}}>
                {mode === 'signup' && (
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
                )}

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

                {mode === 'signup' && (
                  <>
                    <div>
                      <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>Password</div>
                      <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Create a password"
                        style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(26,22,18,0.12)', padding: '14px 16px', fontFamily: 'var(--DS)', fontSize: '14px', outline: 'none'}}
                        required
                      />
                    </div>

                    <div>
                      <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>Confirm password</div>
                      <input
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type="password"
                        placeholder="Confirm password"
                        style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(26,22,18,0.12)', padding: '14px 16px', fontFamily: 'var(--DS)', fontSize: '14px', outline: 'none'}}
                        required
                      />
                    </div>
                  </>
                )}

                {mode === 'login' && (
                  <div>
                    <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>Password</div>
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      placeholder="Your password"
                      style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(26,22,18,0.12)', padding: '14px 16px', fontFamily: 'var(--DS)', fontSize: '14px', outline: 'none'}}
                      required
                    />
                  </div>
                )}

                <Button variant="primary" type="submit" disabled={loading} style={{width: '100%'}}>
                  {loading ? 'Saving...' : mode === 'signup' ? 'Create account' : 'Sign in'}
                </Button>

                {status && <div style={{fontSize: '13px', color: 'var(--ink3)', lineHeight: 1.5}}>{status}</div>}

                <div style={{fontSize: '12px', color: 'var(--muted)', textAlign: 'center'}}>
                  {mode === 'signup' ? (
                    <>
                      Already have an account?{' '}
                      <button type="button" onClick={() => setMode('login')} style={{border: 'none', background: 'transparent', color: 'var(--orange)', fontWeight: 600, cursor: 'pointer', padding: 0}}>
                        Sign in
                      </button>
                    </>
                  ) : (
                    <>
                      New to Kairo?{' '}
                      <button type="button" onClick={() => setMode('signup')} style={{border: 'none', background: 'transparent', color: 'var(--orange)', fontWeight: 600, cursor: 'pointer', padding: 0}}>
                        Create account
                      </button>
                    </>
                  )}
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
