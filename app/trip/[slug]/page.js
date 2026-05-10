import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Card } from '@/components/UI';
import { travelPhotos } from '@/components/PhotoStrips';

const tripMap = {
  'kedarkantha-winter-trek': {
    title: 'Kedarkantha Winter Trek · Curated by Aarav',
    destination: 'Uttarakhand, India',
    duration: '6 days',
    totalCost: '₹24,900',
    author: 'Aarav Singh',
    authorType: 'Verified Creator',
    commissionText: 'Creator earns commission on every booking through this guide.',
    note: 'I did this route in peak winter. The sequence below is exactly how we moved, where we stayed, and what I would book again.',
    cover: travelPhotos[0].src,
    days: [
      {
        label: 'Day 1 · Dehradun → Sankri',
        entries: [
          { type: 'bookable', itemType: 'Transport', title: 'Dehradun to Sankri shared cab', provider: 'Rawat Cabs', price: '₹1,200 / seat' },
          { type: 'note', text: 'After check-in, walk 5 minutes to the chai stall near the old bus point. Ask for Raju — his ginger chai saved our evening.' },
          { type: 'bookable', itemType: 'Stay', title: 'Sankri base homestay', provider: 'Pahadi Nest', price: '₹1,700 / night' },
        ],
      },
      {
        label: 'Day 2 · Sankri → Juda Ka Talab',
        entries: [
          { type: 'bookable', itemType: 'Activity', title: 'Guided trail + permits', provider: 'Mountain Crew', price: '₹2,300 / person' },
          { type: 'note', text: 'Carry only one warm layer for the initial climb. You heat up quickly and sweating early makes summit day harder.' },
          { type: 'bookable', itemType: 'Stay', title: 'Juda camp setup', provider: 'Snowline Camps', price: '₹1,900 / night' },
        ],
      },
      {
        label: 'Day 3 · Summit push + return camp',
        entries: [
          { type: 'bookable', itemType: 'Activity', title: 'Summit day support package', provider: 'Mountain Crew', price: '₹2,600 / person' },
          { type: 'note', text: 'Start before sunrise. The ridge gets crowded late morning and the wind picks up fast after 10 AM.' },
        ],
      },
    ],
  },
  'spiti-valley-expedition': {
    title: 'Spiti Valley Road Story · Curated by Highland Trails',
    destination: 'Himachal Pradesh, India',
    duration: '8 days',
    totalCost: '₹41,500',
    author: 'Highland Trails Co.',
    authorType: 'Verified Trip Provider',
    commissionText: 'Provider commission applies on each item and full package booking.',
    note: 'This is our real operating route, refined after 40+ departures. Book only what you need, or take the full package.',
    cover: travelPhotos[1].src,
    days: [
      {
        label: 'Day 1 · Shimla → Kalpa',
        entries: [
          { type: 'bookable', itemType: 'Transport', title: 'Tempo traveller transfer', provider: 'Highland Fleet', price: '₹3,200 / seat' },
          { type: 'bookable', itemType: 'Stay', title: 'Kalpa view rooms', provider: 'Kinner Stay', price: '₹2,400 / night' },
        ],
      },
      {
        label: 'Day 2 · Kalpa → Tabo',
        entries: [
          { type: 'note', text: 'Keep one hour buffer for Nako stop. It is worth it, and rushing this stretch ruins the day.' },
          { type: 'bookable', itemType: 'Activity', title: 'Monastery walk + local guide', provider: 'Tabo Local Board', price: '₹850 / person' },
        ],
      },
      {
        label: 'Day 3 · Tabo → Kaza',
        entries: [
          { type: 'bookable', itemType: 'Stay', title: 'Kaza central hotel', provider: 'Altitude House', price: '₹2,900 / night' },
          { type: 'note', text: 'If anyone has altitude headache, skip heavy dinner and hydrate aggressively before sleeping.' },
        ],
      },
    ],
  },
  'valley-of-flowers': {
    title: 'Valley of Flowers Monsoon Story',
    destination: 'Chamoli, India',
    duration: '5 days',
    totalCost: '₹19,800',
    author: 'Mitali Roy',
    authorType: 'Verified Creator',
    commissionText: 'Creator commission is linked to every successful booking from this guide.',
    note: 'Built from my July trip. Distances, weather windows, and stays are all from first-hand experience.',
    cover: travelPhotos[5].src,
    days: [],
  },
  'hampta-pass': {
    title: 'Hampta Pass Transition Trail',
    destination: 'Manali, India',
    duration: '5 days',
    totalCost: '₹29,600',
    author: 'Summit Side Co.',
    authorType: 'Verified Trip Provider',
    commissionText: 'Commission applies on package and item-level bookings.',
    note: 'A practical crossover route from green valleys to high-altitude desert, based on repeated departures.',
    cover: travelPhotos[3].src,
    days: [],
  },
  'auli-snow-trek': {
    title: 'Auli Snow Weekender',
    destination: 'Uttarakhand, India',
    duration: '4 days',
    totalCost: '₹16,400',
    author: 'Raghav Mehta',
    authorType: 'Verified Creator',
    commissionText: 'Commission earned on full package and individual bookings.',
    note: 'A short, realistic winter plan with only the bookings that mattered for comfort and timing.',
    cover: travelPhotos[4].src,
    days: [],
  }
};

export function generateStaticParams() {
  return Object.keys(tripMap).map((slug) => ({ slug }));
}

export default function TripDetailRoute({ params }) {
  const trip = tripMap[params.slug] ?? tripMap['kedarkantha-winter-trek'];
  const timeline = trip.days?.length ? trip.days : tripMap['kedarkantha-winter-trek'].days;

  return (
    <>
      <Nav variant="light" />
      <section className="section cream" style={{ paddingTop: '90px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.38fr 0.78fr', gap: '26px', alignItems: 'start' }}>
          <div>
            <div
              style={{
                height: '330px',
                borderRadius: '20px',
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05)), url(${trip.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '18px',
              }}
            />

            <h1 style={{ fontFamily: 'var(--PD)', fontSize: 'clamp(34px,4.8vw,58px)', lineHeight: 1.05, color: 'var(--ink)', marginBottom: '10px' }}>
              {trip.title}
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '10px' }}>
              {trip.destination} · {trip.duration} · Total est. {trip.totalCost}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--ink3)', marginBottom: '8px' }}>
              By {trip.author} · {trip.authorType}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '14px' }}>{trip.commissionText}</div>

            <Card style={{ background: '#fff', borderRadius: '16px', padding: '18px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '8px', fontWeight: 700 }}>
                Trip Overview
              </div>
              <p style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.7 }}>{trip.note}</p>
            </Card>

            <div style={{ display: 'grid', gap: '16px' }}>
              {timeline.map((day) => (
                <Card key={day.label} style={{ background: '#fff', borderRadius: '16px', padding: '18px' }}>
                  <h2 style={{ fontFamily: 'var(--PD)', fontSize: '26px', color: 'var(--ink)', marginBottom: '12px' }}>{day.label}</h2>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {day.entries.map((entry, idx) => (
                      entry.type === 'bookable' ? (
                        <div key={`${day.label}-${idx}`} style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px', fontWeight: 700 }}>
                                {entry.itemType}
                              </div>
                              <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 700, marginBottom: '2px' }}>{entry.title}</div>
                              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{entry.provider} · {entry.price}</div>
                            </div>
                            <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '9px', padding: '9px 13px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                              Book
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p key={`${day.label}-${idx}`} style={{ fontSize: '14px', color: 'var(--ink2)', lineHeight: 1.75 }}>
                          {entry.text}
                        </p>
                      )
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card style={{ position: 'sticky', top: '86px', background: '#fff', borderRadius: '16px', padding: '18px' }}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '8px', fontWeight: 700 }}>
              Full Package
            </div>
            <div style={{ fontFamily: 'var(--PD)', fontSize: '34px', lineHeight: 1, color: 'var(--ink)', marginBottom: '6px' }}>{trip.totalCost}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px' }}>
              One-click booking for the complete curated trip.
            </div>

            <button style={{ width: '100%', background: '#111', color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 14px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '10px' }}>
              Book this entire trip
            </button>

            <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '12px' }}>
              Includes all listed bookable items in this guide. Experience notes remain informational.
            </div>

            <Link href="/trip-hub" style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 700, textDecoration: 'none' }}>
              Back to curated trips
            </Link>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}
