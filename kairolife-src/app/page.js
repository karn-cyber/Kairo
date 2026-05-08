'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import PhotoStrips from '@/components/PhotoStrips';

export default function Home() {
  return (
    <>
      <Nav variant="dark" />
      
      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        marginTop: '-68px',
        background: 'linear-gradient(160deg,#0E0C08 0%,#1A1208 35%,#1C1A10 60%,#0E1A10 100%)'
      }}>
        {/* Background gradient layers */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(ellipse 70% 50% at 60% 40%,rgba(200,90,26,0.15),transparent 60%),radial-gradient(ellipse 50% 60% at 20% 80%,rgba(61,107,53,0.10),transparent 55%)',
          zIndex: 1
        }}></div>
        
        {/* Grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 80%)',
          zIndex: 1
        }}></div>

        {/* Left hero photo */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '38%',
          overflow: 'hidden',
          zIndex: 2
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "linear-gradient(to right, rgba(14,12,8,0.45), rgba(14,12,8,0.18)), url('/travelPhotos/618f54deac2ccb4cbc9573b29876a4a0.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>

        {/* Center background photo (subtle) - placed behind content so text remains above */}
        <div style={{position: 'absolute', top: 0, bottom: 0, left: '30%', right: '30%', zIndex: 1, pointerEvents: 'none'}}>
          <div style={{position: 'absolute', inset: 0, backgroundImage: "linear-gradient(to top, rgba(14,12,8,0.12), rgba(14,12,8,0.06)), url('/travelPhotos/2962f1ea3ecbbfa631ba870e79d193d8.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.62}} />
        </div>

        {/* Right image strips */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '38%',
          overflow: 'hidden',
          zIndex: 2
        }}>
          <PhotoStrips />
        </div>

        {/* Hero content */}
        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '160px 60px 100px',
          zIndex: 3,
          width: '62%'
        }}>
          
          <Badge type="orange" dot>Launching in India 2025</Badge>
          
          <h1 style={{
            fontFamily: 'var(--PD)',
            fontSize: 'clamp(52px, 7vw, 88px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.0,
            letterSpacing: '-2px',
            marginBottom: '28px',
            marginTop: '28px'
          }}>
            Every great<br/>
            <em style={{color: 'var(--orange2)', fontStyle: 'italic'}}>Indian journey</em><br/>
            starts here.
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.48)',
            lineHeight: 1.75,
            maxWidth: '520px',
            marginBottom: '44px',
            fontWeight: 300
          }}>
            Verified agencies. No middlemen. Group trip tools built for real travel. And a creator community where inspiration converts directly into bookings.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '64px' }}>
            <Link href="/signup"><Button variant="primary">Get Early Access</Button></Link>
            <Link href="/signup"><Button variant="ghost">List your Agency</Button></Link>
          </div>

          {/* Hero stats */}
          <div style={{
            display: 'flex',
            gap: '48px',
            paddingTop: '36px',
            borderTop: '1px solid rgba(255,255,255,0.07)'
          }}>
            <div>
              <div style={{fontFamily: 'var(--PD)', fontSize: '30px', fontWeight: 700, color: 'var(--orange2)', lineHeight: 1}}>35M+</div>
              <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.32)', marginTop: '5px', lineHeight: 1.4, maxWidth: '130px'}}>
                Active adventure travellers in India
              </div>
            </div>
            <div>
              <div style={{fontFamily: 'var(--PD)', fontSize: '30px', fontWeight: 700, color: 'var(--orange2)', lineHeight: 1}}>12,000+</div>
              <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.32)', marginTop: '5px', lineHeight: 1.4, maxWidth: '130px'}}>
                Trek agencies with no digital presence
              </div>
            </div>
            <div>
              <div style={{fontFamily: 'var(--PD)', fontSize: '30px', fontWeight: 700, color: 'var(--orange2)', lineHeight: 1}}>6 apps</div>
              <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.32)', marginTop: '5px', lineHeight: 1.4, maxWidth: '130px'}}>
                To plan one trip today — all broken
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: 0.35,
          zIndex: 3
        }}>
          <div style={{width: '1px', height: '40px', background: 'linear-gradient(to bottom,#fff,transparent)'}}></div>
          <span style={{fontSize: '10px', color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase'}}>
            Scroll
          </span>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="section warm">
        <div className="container" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center'}}>
          <div>
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-title ink">
              Planning a trek in India takes <em style={{fontStyle: 'italic', color: 'var(--orange)'}}>6 different apps.</em>
            </h2>
            <p style={{fontFamily: 'var(--CG)', fontSize: '20px', color: 'var(--ink3)', lineHeight: 1.7, marginBottom: '28px', fontStyle: 'italic'}}>
              "Discover on Instagram. Coordinate on WhatsApp. Split costs on Splitwise. Navigate on Google Maps. Book on a random website. Post back on Instagram. The loop is broken at every seam."
            </p>
            <p style={{fontSize: '15px', color: 'var(--ink3)', lineHeight: 1.75}}>
              And on the other side — 12,000+ trek agencies doing extraordinary work, invisible online, paying 20–30% to middlemen platforms that mark up their packages and own their customer relationships.
            </p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {[
              {num: '01', title: 'No trusted place to discover and book', desc: 'Agencies are found through Instagram DMs with zero verification, zero accountability, and surprise redirections before departure.'},
              {num: '02', title: 'Group trips are a coordination disaster', desc: 'Planning, splitting costs, tracking location, and building shared memories across five apps with no continuity between them.'},
              {num: '03', title: 'Creators inspire travel but earn nothing', desc: 'A reel gets 500K views. Every viewer goes elsewhere to book. The creator who built the demand captures zero value.'},
              {num: '04', title: 'Agencies are invisible and exploited', desc: 'The agency does the work. The middleman takes the margin. 12,000+ operators with no direct line to their customers.'},
            ].map((item, i) => (
              <Card key={i} style={{display: 'flex', gap: '16px'}}>
                <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'var(--og)', border: '1.5px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--orange)', flexShrink: 0, fontFamily: 'var(--DS)'}}>
                  {item.num}
                </div>
                <div>
                  <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px'}}>
                    {item.title}
                  </div>
                  <div style={{fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6}}>
                    {item.desc}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section dark" style={{position: 'relative'}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 60% 50% at 80% 50%,rgba(200,90,26,0.07),transparent)', pointerEvents: 'none'}}></div>
        <div className="container" style={{position: 'relative'}}>
          <div style={{textAlign: 'center', marginBottom: '64px'}}>
            <div className="section-eyebrow white">The Platform</div>
            <h2 className="section-title white">
              Four pillars. One <em style={{fontStyle: 'italic', color: 'var(--orange2)'}}>complete</em> platform.
            </h2>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
            <div>
              <Badge type="orange">Marketplace</Badge>
              <h3 style={{fontFamily: 'var(--PD)', fontSize: '32px', fontWeight: 800, color: 'var(--cream)', lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-.5px', marginTop: '20px'}}>
                Verified agencies. Direct bookings. No middlemen.
              </h3>
              <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, marginBottom: '24px'}}>
                Every agency on Kairo is verified — insurance, guide certifications, reviews. Travellers book directly. Agencies set their own prices. Kairo takes a flat transparent 10%. If an agency redirects your booking, you are notified 48 hours before departure.
              </p>
              <div style={{background: 'rgba(200,90,26,0.12)', borderLeft: '3px solid var(--orange)', borderRadius: '0 10px 10px 0', padding: '14px 18px', fontFamily: 'var(--CG)', fontSize: '17px', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5}}>
                The agency does the work. Kairo ensures they get the credit — and the customer.
              </div>
            </div>
            <Card style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '24px', overflow: 'hidden'}}>
              <div style={{height: '160px', borderRadius: '16px', marginBottom: '18px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg,#1C2E18,#2A4428,#1A3020)'}}>
                <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.6),transparent)'}}></div>
                <Badge type="white" style={{position: 'absolute', top: '12px', left: '12px'}}>Bestseller</Badge>
                <Badge type="verified" style={{position: 'absolute', top: '12px', right: '12px'}}>Verified</Badge>
              </div>
              <div style={{fontSize: '10px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '4px'}}>
                Uttarakhand · Moderate
              </div>
              <div style={{fontFamily: 'var(--PD)', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px'}}>
                Kedarkantha Winter Trek
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '16px'}}>
                {[{label: 'Days', value: '6'}, {label: 'Group', value: '12'}, {label: 'Stars', value: '4.9'}, {label: 'Reviews', value: '127'}].map((item, i) => (
                  <div key={i} style={{background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px', textAlign: 'center'}}>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '14px', fontWeight: 700, color: '#fff'}}>
                      {item.value}
                    </div>
                    <div style={{fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: '2px'}}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontFamily: 'var(--PD)', fontSize: '26px', fontWeight: 700, color: 'var(--orange2)'}}>₹8,500</div>
                  <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px'}}>per person · all inclusive</div>
                </div>
                <button style={{background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer'}}>
                  Book Direct
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section black" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(200,90,26,0.11),transparent)'}}></div>
        <div className="container" style={{position: 'relative', textAlign: 'center', maxWidth: '700px'}}>
          <h2 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, color: 'var(--cream)', lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-1.5px'}}>
            Be part of what India travels with next.
          </h2>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, marginBottom: '44px'}}>
            Early access for travellers, trek agencies, and travel creators.<br/>
            Launching with the Himalayan corridor first.
          </p>
          <Card style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px'}}>
            <div style={{display: 'flex', gap: '8px', marginBottom: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '4px'}}>
              {['Traveller', 'Agency', 'Creator'].map((role, i) => (
                <div key={i} style={{flex: 1, padding: '9px 0', background: i === 0 ? 'var(--orange)' : 'transparent', borderRadius: i === 0 ? '9px' : '0', textAlign: 'center', fontSize: '12px', fontWeight: i === 0 ? 600 : 500, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.38)', cursor: 'pointer'}}>
                  {role}
                </div>
              ))}
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <input placeholder="Enter your email" style={{flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', fontSize: '14px', color: '#fff', outline: 'none', fontFamily: 'var(--DS)'}} />
              <button className="btn-nav" style={{padding: '14px 24px', whiteSpace: 'nowrap'}}>Get Access</button>
            </div>
            <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.18)', marginTop: '12px'}}>
              No spam. Just your launch invite when we go live.
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}
