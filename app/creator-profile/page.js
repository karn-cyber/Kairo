'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import AuthGate from '@/components/AuthGate';
import { travelPhotos } from '@/components/PhotoStrips';

export default function CreatorProfile() {
  return (
    <>
      <Nav variant="light" />
      <AuthGate title="Creator profiles are members only" description="Sign in to follow creators and view their trip drops.">

      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg,#FAF7F2 0%,#F2EDE3 100%)',
        padding: '60px 60px',
        borderBottom: '1px solid rgba(26,22,18,0.07)'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr 240px', gap: '60px', alignItems: 'start'}}>
          {/* Avatar */}
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#C85A1A,#E06B25)',
              margin: '0 auto 20px'
            }}></div>
            <Button variant="primary" style={{width: '100%'}}>Follow</Button>
          </div>

          {/* Profile Info */}
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
              <h1 style={{fontFamily: 'var(--PD)', fontSize: '40px', fontWeight: 900, color: 'var(--ink)'}}>
                Priya Sharma
              </h1>
              <Badge type="verified">Verified Creator</Badge>
            </div>
            <div style={{fontSize: '14px', color: 'var(--muted)', marginBottom: '20px'}}>
              Mountain enthusiast & travel storyteller
            </div>
            <p style={{fontSize: '15px', color: 'var(--ink3)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '28px'}}>
              I help adventurers discover India's most beautiful hiking trails. All my treks are personally verified, and my guides are trained to make every journey unforgettable.
            </p>
            <div style={{display: 'flex', gap: '20px'}}>
              {[
                {label: 'Community Pts', value: '847'},
                {label: 'Trips Verified', value: '12'},
                {label: 'Trip Guides', value: '4'},
                {label: 'Followers', value: '3.2K'}
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{fontFamily: 'var(--PD)', fontSize: '20px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1}}>
                    {stat.value}
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 500}}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Stats */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {[
              {platform: 'Instagram', value: '145K'},
              {platform: 'YouTube', value: '89K'},
              {platform: 'TikTok', value: '223K'}
            ].map((social, i) => (
              <Card key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px'}}>
                <span style={{fontSize: '13px', fontWeight: 500, color: 'var(--ink3)'}}>{social.platform}</span>
                <span style={{fontFamily: 'var(--PD)', fontSize: '14px', fontWeight: 700, color: 'var(--orange)'}}>{social.value}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRIP GUIDES SECTION */}
      <section className="section cream">
        <div className="container">
          <div style={{marginBottom: '44px'}}>
            <div className="section-eyebrow">Featured</div>
            <h2 className="section-title ink">Priya's Trip Guides</h2>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '44px'}}>
            {[
              {title: 'Himalayan Circuit', subtreks: 3, days: '21', rating: '4.9', photo: travelPhotos[0].src},
              {title: 'Spiti Valley Explorer', subtreks: 2, days: '14', rating: '4.8', photo: travelPhotos[1].src},
              {title: 'Northeast Adventure', subtreks: 4, days: '28', rating: '4.7', photo: travelPhotos[7].src}
            ].map((guide, i) => (
              <Card key={i} style={{overflow: 'hidden', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.3s'}}>
                <div style={{
                  height: '180px',
                  backgroundImage: `url(${guide.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '16px'
                }}>
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.55),rgba(0,0,0,0.12))'}}></div>
                  <Badge type="white">{guide.subtreks} Sub-treks</Badge>
                </div>
                <div style={{padding: '16px'}}>
                  <h3 style={{fontFamily: 'var(--PD)', fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px'}}>
                    {guide.title}
                  </h3>
                  <div style={{display: 'flex', gap: '16px', marginBottom: '12px'}}>
                    <div>
                      <div style={{fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '2px'}}>Days</div>
                      <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--ink)'}}>{guide.days}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '2px'}}>Rating</div>
                      <div style={{fontSize: '14px', fontWeight: 700, color: 'var(--orange)'}}>{guide.rating} ★</div>
                    </div>
                  </div>
                  <Button variant="primary" style={{width: '100%'}}>View Guide</Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Recommended Destinations */}
          <div style={{marginTop: '60px'}}>
            <h3 style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 700, color: 'var(--ink)', marginBottom: '24px'}}>
              Destinations She Recommends
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
              {[
                {type: 'Agency', name: 'Mountain Trails Co.', rating: '4.9', price: '₹6,500'},
                {type: 'Stay', name: 'High Altitude Lodges', rating: '4.8', price: '₹2,000/night'},
                {type: 'Food', name: 'Local Kitchen Experience', rating: '4.7', price: '₹800/meal'},
                {type: 'Guide', name: 'Expert Mountain Guides', rating: '5.0', price: '₹3,000/day'}
              ].map((rec, i) => (
                <Card key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
                  <div>
                    <Badge type="green" style={{marginBottom: '8px'}}>★ {rec.rating}</Badge>
                    <h4 style={{fontSize: '16px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px'}}>
                      {rec.name}
                    </h4>
                    <div style={{fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em'}}>
                      {rec.type}
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div style={{fontFamily: 'var(--PD)', fontSize: '16px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1, marginBottom: '8px'}}>
                      {rec.price}
                    </div>
                    <button style={{background: 'var(--orange)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'}}>
                      Learn More
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="section warm">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '40px'}}>
            Travellers Trust Her
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
            {[
              {name: 'Rajesh K.', trip: 'Kedarkantha Trek', rating: '5.0', review: 'Priya\'s guides made it unforgettable. Perfectly planned and executed!'},
              {name: 'Sana M.', trip: 'Spiti Valley', rating: '4.9', review: 'Best trip of my life. Priya\'s recommendations were spot on!'},
              {name: 'Arjun D.', trip: 'Himalayan Circuit', rating: '5.0', review: 'Worth every penny. Highly recommend!'},
              {name: 'Neha S.', trip: 'Northeast Adventure', rating: '4.8', review: 'Professional, friendly, and incredibly knowledgeable.'}
            ].map((review, i) => (
              <Card key={i} style={{padding: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px'}}>
                  <div>
                    <div style={{fontWeight: 600, color: 'var(--ink)'}}>
                      {review.name}
                    </div>
                    <div style={{fontSize: '12px', color: 'var(--muted)', marginTop: '2px'}}>
                      {review.trip}
                    </div>
                  </div>
                  <Badge type="orange">{review.rating} ★</Badge>
                </div>
                <p style={{fontSize: '14px', color: 'var(--ink3)', lineHeight: 1.6}}>
                  "{review.review}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      </AuthGate>

      <Footer />
    </>
  );
}
