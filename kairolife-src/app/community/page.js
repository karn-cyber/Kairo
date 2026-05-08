'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Card } from '@/components/UI';
import { travelPhotos } from '@/components/PhotoStrips';

export default function Community() {
  return (
    <>
      <Nav variant="light" />
      
      <section className="section warm" style={{paddingTop: '48px'}}>
        <div className="container" style={{display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start'}}>
          {/* Feed */}
          <div>
            <div style={{display: 'flex', gap: 0, borderBottom: '1px solid var(--line)', marginBottom: '24px'}}>
              {['Feed', 'Communities', 'Creator Trips', 'Trending'].map((tab, i) => (
                <div key={i} style={{padding: '11px 20px', fontSize: '13px', fontWeight: i === 0 ? 600 : 500, color: i === 0 ? 'var(--ink)' : 'var(--muted)', borderBottom: i === 0 ? '2px solid var(--orange)' : 'none', cursor: 'pointer'}}>
                  {tab}
                </div>
              ))}
            </div>

            {/* Sample posts */}
            {[
              {author: 'meera.moves', avatar: 'ME', badge: 'Top Creator', location: 'Kudremukh National Park, Karnataka', title: 'The best part of Kudremukh...', likes: 128, photo: travelPhotos[6].src},
              {author: 'alpinefolks', avatar: 'AF', badge: 'Verified Agency', location: 'Hampta Pass', title: 'Three seats just opened up...', likes: 84, photo: travelPhotos[3].src},
            ].map((post, i) => (
              <Card key={i} style={{marginBottom: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--line2)', marginBottom: '12px'}}>
                  <div style={{width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg,#8B5E3C,#C4864A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0}}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{fontSize: '14px', fontWeight: 600, color: 'var(--ink)'}}>
                      {post.author}
                    </div>
                    <div style={{fontSize: '11px', color: 'var(--muted)'}}>
                      14 minutes ago · 847 community pts
                    </div>
                  </div>
                  <Badge type="orange" style={{marginLeft: 'auto'}}>
                    {post.badge}
                  </Badge>
                </div>
                <div style={{fontSize: '15px', color: 'var(--ink2)', lineHeight: 1.7, marginBottom: '14px'}}>
                  {post.title}
                </div>
                <div style={{height: '260px', marginBottom: '0', borderRadius: '12px', backgroundImage: `url(${post.photo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div>
            <Card style={{marginBottom: '16px'}}>
              <div style={{fontFamily: 'var(--PD)', fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px'}}>
                Discover Communities
              </div>
              <div style={{fontSize: '12px', color: 'var(--muted)', marginBottom: '16px'}}>
                Find crews by route, budget, pace, or city
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
                {[
                  {name: 'Himalayan First-Timers', members: '8,290', latest: 'Rhea: Is June too early...', photo: travelPhotos[0].src},
                  {name: 'Western Ghats Weekends', members: '12,104', latest: 'Nikhil: Any leech sock...', photo: travelPhotos[6].src},
                  {name: 'Budget Trail Plans', members: '3,918', latest: 'Aditi: Raigad route on...', photo: travelPhotos[1].src},
                  {name: 'Solo Women Trekkers', members: '6,220', latest: 'Safety tips, partners...', photo: travelPhotos[7].src},
                ].map((community, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--line2)' : 'none', cursor: 'pointer'}}>
                    <div style={{width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, backgroundImage: `url(${community.photo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{fontSize: '13px', fontWeight: 600, color: 'var(--ink)'}}>
                        {community.name}
                      </div>
                      <div style={{fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {community.members} members · {community.latest}
                      </div>
                    </div>
                    <span style={{color: 'var(--dust)', fontSize: '16px'}}>›</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div style={{fontFamily: 'var(--PD)', fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px'}}>
                Trending Creator Trips
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {[
                  {title: "Priya's Spiti in October", pts: '847', saves: '2.1K', photo: travelPhotos[1].src},
                  {title: "Rohan's Meghalaya Rains", pts: '612', saves: '1.4K', photo: travelPhotos[7].src},
                  {title: "Asha's Budget Kedarkantha", pts: '524', saves: '980', photo: travelPhotos[0].src},
                ].map((trip, i) => (
                  <div key={i} style={{display: 'flex', gap: '12px', cursor: 'pointer', alignItems: 'center'}}>
                    <div style={{width: '56px', height: '56px', borderRadius: '10px', flexShrink: 0, backgroundImage: `url(${trip.photo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div>
                      <div style={{fontSize: '12px', fontWeight: 600, color: 'var(--ink)'}}>
                        {trip.title}
                      </div>
                      <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '2px'}}>
                        {trip.pts} pts · {trip.saves} saves
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
