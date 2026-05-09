'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Card } from '@/components/UI';
import Link from 'next/link';
import AuthGate from '@/components/AuthGate';

export default function TripDetail({ params }) {
  const [groupSize, setGroupSize] = useState(2);
  const pricePerPerson = 8500;
  const totalPrice = groupSize * pricePerPerson;

  return (
    <>
      <Nav variant="dark" />
      <AuthGate title="Trip details are members only" description="Sign in to view the itinerary, reviews, and booking details.">

      {/* Hero */}
      <div style={{height: '520px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg,#1C2E18,#2A4428,#1A3020)', marginTop: '-68px'}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,12,8,0.96) 0%,rgba(15,12,8,0.3) 55%,rgba(0,0,0,0.1) 100%)'}}></div>
        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: '44px 60px'}}>
          <Badge type="verified">Himalayan Trails Co. · Verified Agency</Badge>
          <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-1.5px', marginBottom: '12px', marginTop: '14px'}}>
            Kedarkantha<br/>Winter Trek
          </h1>
          <div style={{display: 'flex', gap: '20px'}}>
            <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)'}}>Dec 20 — 26</span>
            <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)'}}>12,500 ft</span>
            <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)'}}>Moderate</span>
            <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)'}}>4.9 stars · 127 reviews</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section warm" style={{padding: '60px 60px 80px'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start'}}>
            {/* Left: Details */}
            <div>
              {/* Info chips */}
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '40px'}}>
                {[{label: 'Days', value: '6'}, {label: 'Max Group', value: '12'}, {label: 'Rating', value: '4.9'}, {label: 'Reviews', value: '127'}].map((item, i) => (
                  <Card key={i} style={{textAlign: 'center', padding: '18px 12px'}}>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 700, color: 'var(--ink)'}}>
                      {item.value}
                    </div>
                    <div style={{fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '4px'}}>
                      {item.label}
                    </div>
                  </Card>
                ))}
              </div>

              {/* About */}
              <div style={{marginBottom: '36px'}}>
                <h2 style={{fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)', marginBottom: '14px'}}>
                  About This Trek
                </h2>
                <p style={{fontSize: '15px', color: 'var(--ink3)', lineHeight: 1.8}}>
                  Kedarkantha is one of the most sought-after winter treks in Uttarakhand. Set amid dense pine forests and wide meadows, the trail takes you through quaint Himalayan villages before reaching the summit at 12,500 feet — offering 360-degree views of peaks like Swargarohini, Bandarpoonch, and Black Peak.
                </p>
              </div>

              {/* Itinerary */}
              <div style={{marginBottom: '36px'}}>
                <h2 style={{fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)', marginBottom: '20px'}}>
                  Itinerary
                </h2>
                <div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
                  {[
                    {day: 'D1', title: 'Dehradun to Sankri Base Camp', desc: 'Road drive approximately 8 hours · Overnight at Sankri base camp · Briefing with guide'},
                    {day: 'D2', title: 'Sankri to Juda Ka Talab', desc: 'Trek 4 km · 3.5 hours · Camp at 9,100 ft · Frozen lake nearby'},
                    {day: 'D3', title: 'Juda Ka Talab to Summit Camp', desc: 'Trek 6 km · 5 hours · Summit at 12,500 ft · Sunrise views over Bandarpoonch'},
                    {day: 'D4', title: 'Descent to Sankri', desc: 'Trek down · Celebration dinner · Certificate distribution'},
                    {day: 'D5', title: 'Sankri to Dehradun', desc: 'Return drive · Drop at railway station · Trip ends'},
                  ].map((item, i) => (
                    <div key={i} style={{display: 'flex', gap: '16px', paddingBottom: '20px', position: 'relative'}}>
                      {i < 4 && <div style={{position: 'absolute', left: '15px', top: '32px', bottom: 0, width: '1px', background: 'var(--line)'}}></div>}
                      <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'var(--og)', border: '1.5px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'var(--orange)', flexShrink: 0}}>
                        {item.day}
                      </div>
                      <div>
                        <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '3px'}}>
                          {item.title}
                        </div>
                        <div style={{fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5}}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's included */}
              <div style={{marginBottom: '28px'}}>
                <h2 style={{fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px'}}>
                  What's Included
                </h2>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                  {['Certified mountain guide', 'All meals on trail', 'Tents and sleeping bags', 'First aid and oxygen', 'Dehradun transport', 'Forest permits'].map((item, i) => (
                    <Card key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px'}}>
                      <div style={{width: '7px', height: '7px', borderRadius: '50%', background: 'var(--sage2)', flexShrink: 0}}></div>
                      <span style={{fontSize: '13px', color: 'var(--ink2)'}}>
                        {item}
                      </span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <h2 style={{fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, color: 'var(--ink)', marginBottom: '20px'}}>
                Reviews
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                {[
                  {author: 'Arjun Rawat', rating: '5.0', date: 'December 2024', text: 'The guide knew every inch of that mountain. Summit day was hard but the view from the top made every aching muscle worth it. Kairo\'s booking was seamless — no surprises, no hidden costs.'},
                  {author: 'Priya Menon', rating: '4.8', date: 'December 2024', text: 'Did this as a group of 8. The Kairo group tools made everything so much easier — shared chat, split expenses, live location. We didn\'t fight about money once. That\'s a first for our friend group.'},
                ].map((review, i) => (
                  <Card key={i}>
                    <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                      <div style={{width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--orange),#E89050)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#fff'}}>
                        {review.author.split(' ').map(w => w[0]).join('')}
                      </div>
                      <div>
                        <div style={{fontSize: '13px', fontWeight: 600, color: 'var(--ink)'}}>
                          {review.author}
                        </div>
                        <div style={{fontSize: '11px', color: 'var(--muted)'}}>
                          {review.date} · Verified booking
                        </div>
                      </div>
                      <div style={{marginLeft: 'auto', fontSize: '13px', color: 'var(--gold)', fontWeight: 600}}>
                        {review.rating}
                      </div>
                    </div>
                    <p style={{fontSize: '13px', color: 'var(--ink3)', lineHeight: 1.65}}>
                      {review.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right: Booking card */}
            <div style={{position: 'sticky', top: '80px'}}>
              <Card style={{borderTop: '3px solid var(--orange)'}}>
                <div style={{fontFamily: 'var(--PD)', fontSize: '32px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px'}}>
                  ₹{pricePerPerson} <span style={{fontFamily: 'var(--DS)', fontSize: '14px', fontWeight: 400, color: 'var(--muted)'}}>/ person</span>
                </div>
                <div style={{fontSize: '12px', color: 'var(--muted)', marginBottom: '20px'}}>
                  All inclusive · No hidden costs
                </div>

                {/* Date picker */}
                <div style={{marginBottom: '14px'}}>
                  <div style={{fontSize: '11px', fontWeight: 600, color: 'var(--ink2)', marginBottom: '8px', letterSpacing: '.03em'}}>
                    Select Departure
                  </div>
                  <select style={{width: '100%', background: 'var(--parch)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '12px 14px', fontSize: '13px', color: 'var(--ink)', fontFamily: 'var(--DS)', cursor: 'pointer'}}>
                    <option>Dec 20, 2025 — 8 spots left</option>
                    <option>Dec 27, 2025 — 12 spots left</option>
                    <option>Jan 3, 2026 — Full</option>
                  </select>
                </div>

                {/* Group size */}
                <div style={{marginBottom: '20px'}}>
                  <div style={{fontSize: '11px', fontWeight: 600, color: 'var(--ink2)', marginBottom: '8px', letterSpacing: '.03em'}}>
                    Number of Travellers
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid var(--line)', borderRadius: '10px', overflow: 'hidden'}}>
                    <button onClick={() => setGroupSize(Math.max(1, groupSize - 1))} style={{flex: '0 0 44px', height: '44px', background: 'var(--parch)', border: 'none', fontSize: '18px', color: 'var(--ink2)', cursor: 'pointer'}}>
                      −
                    </button>
                    <div style={{flex: 1, textAlign: 'center', fontSize: '15px', fontWeight: 600, color: 'var(--ink)', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)'}}>
                      {groupSize}
                    </div>
                    <button onClick={() => setGroupSize(groupSize + 1)} style={{flex: '0 0 44px', height: '44px', background: 'var(--parch)', border: 'none', fontSize: '18px', color: 'var(--ink2)', cursor: 'pointer'}}>
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div style={{background: 'var(--parch)', borderRadius: '12px', padding: '14px 16px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontSize: '13px', color: 'var(--muted)'}}>
                    {groupSize} × ₹{pricePerPerson}
                  </span>
                  <span style={{fontFamily: 'var(--PD)', fontSize: '20px', fontWeight: 700, color: 'var(--ink)'}}>
                    ₹{totalPrice}
                  </span>
                </div>

                <button className="btn-primary" style={{width: '100%', borderRadius: '12px', padding: '15px'}}>
                  Book This Trek
                </button>
                <div style={{textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--muted)'}}>
                  Free cancellation up to 7 days before
                </div>
              </Card>

              {/* Agency card */}
              <Card style={{marginTop: '14px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px'}}>
                  <div style={{width: '44px', height: '44px', borderRadius: '12px', backgroundImage: "url('/travelPhotos/381e714ee60f8c08d1a5b41d3a0b776f.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0}}></div>
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)'}}>
                      Himalayan Trails Co.
                    </div>
                    <div style={{fontSize: '11px', color: 'var(--muted)'}}>
                      Verified Agency · Since 2014
                    </div>
                  </div>
                </div>
                <div style={{fontSize: '12px', color: 'var(--ink3)', lineHeight: 1.6, marginBottom: '12px'}}>
                  Running treks in the Himalayas for 10+ years. 127 five-star reviews. All guides are certified by NIMAS.
                </div>
                <Link href="/agencies" style={{fontSize: '13px', color: 'var(--orange)', fontWeight: 500, cursor: 'pointer', textDecoration: 'none'}}>
                  View full agency profile →
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      </AuthGate>

      <Footer />
    </>
  );
}

