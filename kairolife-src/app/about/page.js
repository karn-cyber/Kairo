'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Card } from '@/components/UI';

export default function About() {
  return (
    <>
      <Nav variant="light" />
      
      <section className="section cream" style={{paddingTop: '80px'}}>
        <div className="container" style={{maxWidth: '800px', textAlign: 'center'}}>
          <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: 'var(--ink)', letterSpacing: '-1px', marginBottom: '20px'}}>
            About <em style={{fontStyle: 'italic', color: 'var(--orange)'}}>Kairo</em>
          </h1>
          <p style={{fontSize: '18px', color: 'var(--ink2)', lineHeight: 1.8, marginBottom: '40px'}}>
            Kairo is building the operating system for the Indian adventure traveller. A platform where agencies get direct customers, creators earn real money, and travellers have one place to discover, plan, and share real Indian adventures.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section warm">
        <div className="container" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center'}}>
          <div>
            <div className="section-eyebrow">Our Mission</div>
            <h2 className="section-title ink">
              Making adventure travel <em style={{fontStyle: 'italic', color: 'var(--orange)'}}>accessible, fair, and transparent.</em>
            </h2>
            <p style={{fontSize: '15px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '20px'}}>
              For too long, Indian adventure travel has been broken:
            </p>
            <ul style={{fontSize: '15px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '20px', marginLeft: '20px'}}>
              <li>Travellers can't find verified agencies without scrolling through sketchy Instagram DMs</li>
              <li>Agencies do all the work but give 20–30% of their revenue to middlemen</li>
              <li>Group trips require coordinating across 6 different apps</li>
              <li>Creators inspire wanderlust but earn nothing</li>
            </ul>
            <p style={{fontSize: '15px', color: 'var(--ink3)', lineHeight: 1.8}}>
              Kairo changes that. We're building infrastructure for adventure travel that works for everyone.
            </p>
          </div>
          <Card style={{background: 'linear-gradient(135deg, var(--parch), #FFF8F0)', padding: '40px'}}>
            <div style={{fontFamily: 'var(--CG)', fontSize: '24px', fontStyle: 'italic', color: 'var(--ink2)', lineHeight: 1.8}}>
              "We started Kairo because we loved trekking and hated booking trips. Every trip meant Instagram hunting, WhatsApp chaos, and zero visibility into what we were actually paying for. There had to be a better way."
            </div>
            <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginTop: '20px'}}>
              — The Kairo Team
            </div>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="section parch">
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '56px'}}>
            <div className="section-eyebrow">Our Values</div>
            <h2 className="section-title ink">Built on trust, transparency, and community</h2>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'}}>
            {[
              {title: 'Trust First', desc: 'Every agency is verified. Every price is transparent. No hidden costs, no middlemen surprises.'},
              {title: 'Direct & Fair', desc: 'Travellers talk to agencies directly. Agencies keep their customer relationships. 10% is our only margin.'},
              {title: 'Community-Driven', desc: 'Real travellers. Real creators. Real experiences. Built together, not dictated to you.'},
            ].map((value, i) => (
              <Card key={i} style={{background: 'var(--cream)', padding: '28px', textAlign: 'center'}}>
                <h3 style={{fontFamily: 'var(--PD)', fontSize: '20px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px'}}>
                  {value.title}
                </h3>
                <p style={{fontSize: '14px', color: 'var(--ink3)', lineHeight: 1.7}}>
                  {value.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Launch */}
      <section className="section black">
        <div className="container" style={{textAlign: 'center', maxWidth: '700px'}}>
          <div className="section-eyebrow white">Coming Soon</div>
          <h2 className="section-title white">Launching Q2 2025</h2>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '40px'}}>
            We're starting in the Himalayan region — Manali, Rishikesh, Mussoorie, Kedarkantha, and Spiti Valley. Early access for travellers, agencies, and creators is now open.
          </p>
          <button className="btn-primary">Get Early Access</button>
        </div>
      </section>

      <Footer />
    </>
  );
}
