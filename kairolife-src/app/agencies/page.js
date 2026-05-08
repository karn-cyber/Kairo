'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';

export default function Agencies() {
  return (
    <>
      <Nav variant="dark" />
      
      {/* HERO */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg,#0E1A0E 0%,#1A2C1A 50%,#2A3820 100%)',
        marginTop: '-68px'
      }}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 60% 50% at 70% 50%,rgba(61,107,53,0.18),transparent)', zIndex: 1}}></div>
        <div style={{position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '160px 60px 100px', zIndex: 2}}>
          <Badge type="green">For Trek and Adventure Agencies</Badge>
          
          <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-2px', marginBottom: '24px', marginTop: '28px'}}>
            Your customers are searching for you.<br/>
            <em style={{fontStyle: 'italic', color: '#9FD49A'}}>They just can't find you.</em>
          </h1>

          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '44px', fontWeight: 300}}>
            Get a direct booking channel. No markups. No middlemen standing between you and the people who want to travel with you.
          </p>

          {/* Stats */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '560px', marginBottom: '48px'}}>
            {[
              {value: '₹0', label: 'Setup cost'},
              {value: '10%', label: 'Flat commission'},
              {value: 'Direct', label: 'Customer link'},
            ].map((stat, i) => (
              <div key={i} style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '20px', textAlign: 'center'}}>
                <div style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 700, color: '#fff', display: 'block'}}>
                  {stat.value}
                </div>
                <div style={{fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '4px'}}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{display: 'flex', gap: '14px'}}>
            <Button variant="primary">Apply to List on Kairo</Button>
            <Button variant="ghost">See how it works</Button>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section warm">
        <div className="container">
          <div style={{maxWidth: '700px', margin: '0 auto 56px', textAlign: 'center'}}>
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-title ink">
              The agency does the work.<br/>
              <em style={{fontStyle: 'italic', color: 'var(--orange)'}}>The middleman takes the margin.</em>
            </h2>
          </div>

          <div style={{background: '#FFF3ED', border: '1px solid rgba(200,90,26,0.18)', borderLeft: '4px solid var(--orange)', borderRadius: '16px', padding: '24px 28px', marginBottom: '40px'}}>
            <div style={{fontFamily: 'var(--PD)', fontSize: '20px', fontWeight: 700, color: 'var(--orange)', marginBottom: '10px'}}>
              What happens today
            </div>
            <p style={{fontSize: '15px', color: 'var(--ink2)', lineHeight: 1.75}}>
              Other platforms charge you 20 to 30 percent, mark up your packages without telling you, and own your customer relationship. You receive a booking with no name, no contact, no context. When something goes wrong, it is your reputation on the line — but the platform kept the margin. Kairo charges a flat 10 percent, shows your real price, and puts you in direct contact with every single person who books your trek.
            </p>
          </div>

          {/* Comparison */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
            <Card style={{borderTop: '3px solid var(--red)'}}>
              <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--red)', marginBottom: '10px', letterSpacing: '.04em'}}>
                OTHER PLATFORMS
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {[
                  '20–30% commission taken silently',
                  'Your package price marked up without consent',
                  'Platform owns the customer, not you',
                  'No visibility into your own booking pipeline',
                  'Off-season bookings drop to near zero',
                ].map((item, i) => (
                  <div key={i} style={{display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                    <span style={{color: 'var(--red)', fontSize: '16px', flexShrink: 0}}>✕</span>
                    <span style={{fontSize: '13px', color: 'var(--ink3)', lineHeight: 1.5}}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{borderTop: '3px solid var(--sage2)'}}>
              <div style={{fontSize: '12px', fontWeight: 700, color: 'var(--sage2)', marginBottom: '10px', letterSpacing: '.04em'}}>
                KAIRO
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {[
                  'Flat 10% — transparent, fair, published',
                  'You set your own prices. Always.',
                  'You own the customer relationship directly',
                  'Full dashboard: calendar, CRM, payouts',
                  'Creator discovery keeps bookings year-round',
                ].map((item, i) => (
                  <div key={i} style={{display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
                    <span style={{color: 'var(--sage2)', fontSize: '16px', flexShrink: 0}}>✓</span>
                    <span style={{fontSize: '13px', color: 'var(--ink3)', lineHeight: 1.5}}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section parch">
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '56px'}}>
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-title ink">
              From invisible to booked<br/>
              <em style={{fontStyle: 'italic', color: 'var(--orange)'}}>in 48 hours.</em>
            </h2>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px'}}>
            {[
              {num: '1', title: 'Apply and get verified', desc: 'Submit license, guide certifications, insurance. Verified within 48 hours by our team.'},
              {num: '2', title: 'List your trips', desc: 'Set your own prices and availability. Your listing, your terms, your voice.'},
              {num: '3', title: 'Receive direct bookings', desc: 'Travellers book and pay through Kairo. Payout within 3 working days of trip completion.'},
              {num: '4', title: 'Manage everything here', desc: 'Booking calendar, CRM, review management, payout history — all in one dashboard.'},
            ].map((step, i) => (
              <Card key={i} style={{textAlign: 'center', padding: '32px 20px'}}>
                <div style={{width: '52px', height: '52px', borderRadius: '50%', background: 'var(--og)', border: '1.5px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--orange)', margin: '0 auto 16px'}}>
                  {step.num}
                </div>
                <div style={{fontFamily: 'var(--PD)', fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px'}}>
                  {step.title}
                </div>
                <div style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6}}>
                  {step.desc}
                </div>
              </Card>
            ))}
          </div>

          <div style={{textAlign: 'center'}}>
            <Button variant="primary">Apply to List on Kairo — Free</Button>
            <div style={{fontSize: '12px', color: 'var(--muted)', marginTop: '10px'}}>
              Takes 10 minutes · Verified in 48 hours · No setup cost
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
