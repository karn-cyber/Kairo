import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';

const tripMap = {
  'kedarkantha-winter-trek': {
    title: 'Kedarkantha Winter Trek',
    location: 'Uttarakhand, India',
    days: '6 Days',
    price: '₹8,500',
    rating: '4.9',
    level: 'Moderate'
  },
  'spiti-valley-expedition': {
    title: 'Spiti Valley Expedition',
    location: 'Himachal Pradesh, India',
    days: '8 Days',
    price: '₹14,500',
    rating: '4.8',
    level: 'Challenging'
  },
  'valley-of-flowers': {
    title: 'Valley of Flowers Trek',
    location: 'Chamoli, India',
    days: '5 Days',
    price: '₹7,200',
    rating: '4.7',
    level: 'Easy'
  },
  'hampta-pass': {
    title: 'Hampta Pass Trek',
    location: 'Manali, India',
    days: '5 Days',
    price: '₹11,800',
    rating: '4.8',
    level: 'Moderate'
  },
  'auli-snow-trek': {
    title: 'Auli Snow Trek',
    location: 'Uttarakhand, India',
    days: '4 Days',
    price: '₹7,500',
    rating: '4.6',
    level: 'Easy'
  }
};

export function generateStaticParams() {
  return Object.keys(tripMap).map((slug) => ({ slug }));
}

export default function TripDetailRoute({ params }) {
  const trip = tripMap[params.slug] ?? tripMap['kedarkantha-winter-trek'];

  return (
    <>
      <Nav variant="dark" />
      <section className="section dark">
        <div className="container" style={{display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '28px', alignItems: 'start'}}>
          <div>
            <Badge type="orange">{trip.level}</Badge>
            <h1 style={{fontFamily: 'var(--PD)', fontSize: 'clamp(42px, 5vw, 72px)', fontWeight: 900, color: 'var(--cream)', lineHeight: 1.02, margin: '18px 0 14px'}}>
              {trip.title}
            </h1>
            <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '18px'}}>
              {trip.location} · {trip.days} · ★ {trip.rating}
            </p>
            <div style={{height: '360px', borderRadius: '26px', background: 'linear-gradient(135deg,#1C2E18,#2A4428,#1A3020)', marginBottom: '22px'}}></div>
            <Card style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}>
              <div style={{fontFamily: 'var(--PD)', fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '12px'}}>Itinerary</div>
              <div style={{display: 'grid', gap: '12px'}}>
                {['Drive to base camp', 'Acclimatization hike', 'Summit attempt', 'Buffer + return'].map((item, index) => (
                  <div key={item} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)'}}>
                    <div style={{color: '#fff', fontWeight: 600}}>Day {index + 1} · {item}</div>
                    <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.38)'}}>Included</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card style={{position: 'sticky', top: '20px', padding: '24px', borderRadius: '24px'}}>
            <div style={{fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '8px'}}>Book this trek</div>
            <div style={{fontFamily: 'var(--PD)', fontSize: '34px', fontWeight: 900, color: 'var(--ink)', lineHeight: 1, marginBottom: '6px'}}>{trip.price}</div>
            <div style={{fontSize: '13px', color: 'var(--muted)', marginBottom: '18px'}}>per person</div>

            <div style={{display: 'grid', gap: '12px'}}>
              {['Travel date', 'Group size', 'Phone number'].map((label) => (
                <div key={label}>
                  <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '6px'}}>{label}</div>
                  <input style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(26,22,18,0.12)', padding: '13px 14px', fontSize: '14px'}} />
                </div>
              ))}
            </div>

            <div style={{marginTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{color: 'var(--ink3)', fontSize: '14px'}}>Total</span>
              <span style={{fontFamily: 'var(--PD)', fontSize: '28px', fontWeight: 800, color: 'var(--orange)'}}>₹8,500</span>
            </div>
            <Button variant="primary" style={{width: '100%', marginTop: '16px'}}>Reserve now</Button>
            <div style={{fontSize: '12px', color: 'var(--muted)', textAlign: 'center', marginTop: '12px'}}>
              Secure booking · no hidden fees
            </div>
            <div style={{marginTop: '18px', borderTop: '1px solid rgba(26,22,18,0.08)', paddingTop: '16px'}}>
              <div style={{fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px'}}>Need another route?</div>
              <Link href="/explore" style={{fontSize: '13px', color: 'var(--orange)', fontWeight: 600}}>Back to explore</Link>
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}
