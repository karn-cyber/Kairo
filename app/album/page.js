'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import PhotoStrips, { travelPhotos } from '@/components/PhotoStrips';
import AuthGate from '@/components/AuthGate';

export default function Album() {
  const photos = [
    {id:1, src: travelPhotos[0].src, by: 'Priya', caption: 'Sunrise at Kedarkantha'},
    {id:2, src: travelPhotos[1].src, by: 'Rajesh', caption: 'Trail to the ridge'},
    {id:3, src: travelPhotos[2].src, by: 'Sana', caption: 'Campfire stories'},
    {id:4, src: travelPhotos[3].src, by: 'Arjun', caption: 'Snow fields'},
    {id:5, src: travelPhotos[4].src, by: 'Neha', caption: 'Starry night'},
    {id:6, src: travelPhotos[5].src, by: 'Vikram', caption: 'Summit view'}
  ];

  return (
    <>
      <Nav variant="light" />

      <AuthGate title="Albums are members only" description="Sign in to see your trip albums and shared memories.">
      <section className="section cream">
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 0.72fr', gap: '20px', alignItems: 'stretch', marginBottom: '20px'}}>
            <div>
              <div className="section-eyebrow">Shared Album</div>
              <h1 className="section-title ink">Kedarkantha Trip Photos</h1>
            </div>
            <div style={{position: 'relative', minHeight: '120px', borderRadius: '20px', overflow: 'hidden'}}>
              <PhotoStrips labels={false} overlay={false} />
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <div></div>
            <div style={{display: 'flex', gap: '12px'}}>
              <Button variant="ghost">Download ZIP</Button>
              <Button variant="primary">Upload Photo</Button>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
            {photos.map((p) => (
              <Card key={p.id} style={{padding: 0, overflow: 'hidden', cursor: 'pointer'}}>
                <div style={{height: '200px', backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
                  <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.58),rgba(0,0,0,0.14))'}}></div>
                  <div style={{position: 'absolute', top: '12px', left: '12px'}}>
                    <Badge type="white">{p.by}</Badge>
                  </div>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'end', padding: '16px', color: '#fff', fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 700, textShadow: '0 2px 14px rgba(0,0,0,0.25)'}}>
                    {p.caption}
                  </div>
                </div>
                <div style={{padding: '10px'}}>
                  <div style={{fontSize: '13px', fontWeight: 700, color: 'var(--ink)'}}>{p.caption}</div>
                  <div style={{fontSize: '11px', color: 'var(--muted)', marginTop: '6px'}}>Uploaded by {p.by}</div>
                </div>
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
