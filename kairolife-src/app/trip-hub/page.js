'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import PhotoStrips from '@/components/PhotoStrips';

export default function TripHub() {
  return (
    <>
      <Nav variant="light" />
      
      {/* ACTIVE TRIP HEADER */}
      <section style={{
        background: 'linear-gradient(135deg,#F2EDE3 0%,#FAF7F2 100%)',
        padding: '40px 60px',
        borderBottom: '1px solid rgba(26,22,18,0.07)'
      }}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', alignItems: 'stretch'}}>
            <div>
              <div style={{fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '8px', fontWeight: 600}}>
                Active Trip
              </div>
              <h1 style={{fontFamily: 'var(--PD)', fontSize: '48px', fontWeight: 900, color: 'var(--ink)', marginBottom: '12px'}}>
                Kedarkantha Trek
              </h1>
              <p style={{fontSize: '14px', color: 'var(--ink3)', marginBottom: '20px'}}>
                Uttarakhand · Moderate · 6 Days
              </p>
              <div style={{display: 'flex', gap: '16px'}}>
                <Badge type="orange">Day 2 of 6</Badge>
                <Badge type="green">12 People</Badge>
              </div>
            </div>
            <div style={{position: 'relative', minHeight: '180px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 18px 45px rgba(26,22,18,0.08)'}}>
              <PhotoStrips labels={false} overlay={true} />
              <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px', color: '#fff', zIndex: 1}}>
                <div style={{fontSize: '12px', opacity: 0.8, marginBottom: '4px'}}>Trip Lead</div>
                <div style={{fontSize: '16px', fontWeight: 600}}>Priya Sharma</div>
                <div style={{fontSize: '12px', opacity: 0.8, marginTop: '10px'}}>Leaves in 3 days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="section cream">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '40px'}}>Trip Hub Tools</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
            {[
              {
                icon: '💬',
                title: 'Trip Chat',
                desc: 'Coordinate with group',
                action: 'Open',
                badge: '5 NEW',
                color: 'var(--orange)'
              },
              {
                icon: '📍',
                title: 'Live Location',
                desc: 'See where everyone is',
                action: 'Track',
                color: 'var(--sage)'
              },
              {
                icon: '💸',
                title: 'Expenses',
                desc: 'Split costs easily',
                action: 'Manage',
                color: 'var(--gold)'
              },
              {
                icon: '🖼️',
                title: 'Shared Album',
                desc: 'Photos from the trip',
                action: 'View',
                badge: '34 NEW',
                color: '#0066CC'
              },
              {
                icon: '🗺️',
                title: 'Map',
                desc: 'Route & altitude',
                action: 'Explore',
                color: '#00AA00'
              },
              {
                icon: '📋',
                title: 'Itinerary',
                desc: 'What\'s happening today',
                action: 'Read',
                color: '#DD00DD'
              }
            ].map((tool, i) => (
              <Card 
                key={i}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{position: 'relative', zIndex: 2}}>
                  <div style={{fontSize: '36px', marginBottom: '12px'}}>
                    {tool.icon}
                  </div>
                  <h3 style={{fontFamily: 'var(--PD)', fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px'}}>
                    {tool.title}
                  </h3>
                  <p style={{fontSize: '13px', color: 'var(--muted)', marginBottom: '16px'}}>
                    {tool.desc}
                  </p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button variant="primary" style={{padding: '8px 16px', fontSize: '12px'}}>
                      {tool.action}
                    </Button>
                    {tool.badge && (
                      <Badge type="orange" style={{fontSize: '10px'}}>
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP MEMBERS */}
      <section className="section warm">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '40px'}}>Your Group</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'}}>
            {[
              {name: 'You', status: 'Joined', role: 'Traveller'},
              {name: 'Priya Sharma', status: 'Online', role: 'Trip Lead'},
              {name: 'Rajesh Kumar', status: 'Online', role: 'Co-organizer'},
              {name: 'Sana Mishra', status: 'Online', role: 'Traveller'},
              {name: 'Arjun Dutt', status: 'Offline', role: 'Traveller'},
              {name: 'Neha Singh', status: 'Online', role: 'Traveller'},
              {name: 'Vikram Patel', status: 'Online', role: 'Traveller'},
              {name: 'Anjali Roy', status: 'Offline', role: 'Traveller'},
              {name: 'Dev Nair', status: 'Online', role: 'Traveller'},
              {name: 'Priya Verma', status: 'Online', role: 'Traveller'},
              {name: 'Rohan Rao', status: 'Offline', role: 'Traveller'},
              {name: 'Karan Singh', status: 'Online', role: 'Traveller'}
            ].map((member, i) => (
              <Card key={i} style={{padding: '14px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: member.status === 'Online' ? 'var(--sage)' : 'var(--dust)',
                  marginBottom: '8px',
                  position: 'relative'
                }}>
                  {member.status === 'Online' && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#22BB44',
                      border: '2px solid #fff'
                    }}></div>
                  )}
                </div>
                <div style={{fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: '2px'}}>
                  {member.name}
                </div>
                <div style={{fontSize: '10px', color: 'var(--muted)', marginBottom: '4px'}}>
                  {member.role}
                </div>
                <div style={{fontSize: '9px', color: 'var(--dust)', textTransform: 'uppercase', letterSpacing: '.05em'}}>
                  {member.status}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY'S ITINERARY */}
      <section className="section cream">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '40px'}}>Today's Itinerary</h2>
          
          <div style={{maxWidth: '600px'}}>
            {[
              {time: '6:00 AM', activity: 'Wake up & breakfast', status: 'upcoming'},
              {time: '7:30 AM', activity: 'Trail begins', status: 'upcoming'},
              {time: '12:30 PM', activity: 'Lunch break at camp', status: 'upcoming'},
              {time: '3:00 PM', activity: 'Reach base camp', status: 'upcoming'},
              {time: '6:00 PM', activity: 'Dinner & rest', status: 'upcoming'}
            ].map((item, i) => (
              <div key={i} style={{display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'start'}}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: item.status === 'upcoming' ? 'var(--orange)' : 'var(--sage)',
                  flexShrink: 0,
                  marginTop: '2px'
                }}></div>
                <div>
                  <div style={{fontFamily: 'var(--PD)', fontSize: '14px', fontWeight: 700, color: 'var(--ink)'}}>
                    {item.time}
                  </div>
                  <div style={{fontSize: '14px', color: 'var(--ink3)', marginTop: '2px'}}>
                    {item.activity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY CONTACTS */}
      <section className="section warm">
        <div className="container">
          <h2 className="section-title ink" style={{marginBottom: '40px'}}>Emergency Contacts</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '600px'}}>
            {[
              {name: 'Trip Lead', contact: 'Priya Sharma', phone: '+91 98765 43210'},
              {name: 'Agency', contact: 'Mountain Trails Co.', phone: '+91 98765 12345'},
              {name: 'Local Hospital', contact: 'District Medical', phone: '+91 98765 99999'},
              {name: 'Emergency Services', contact: 'National Helpline', phone: '100'}
            ].map((contact, i) => (
              <Card key={i} style={{padding: '16px'}}>
                <div style={{fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px', fontWeight: 600}}>
                  {contact.name}
                </div>
                <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px'}}>
                  {contact.contact}
                </div>
                <div style={{fontSize: '13px', color: 'var(--orange)', fontFamily: 'var(--DS)'}}>
                  {contact.phone}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
