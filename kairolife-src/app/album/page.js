'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Badge, Button, Card } from '@/components/UI';
import PhotoStrips from '@/components/PhotoStrips';

export default function Album() {
  const photos = [
    {id:1, src: '/images/album1.jpg', by: 'Priya', caption: 'Sunrise at Kedarkantha'},
    {id:2, src: '/images/album2.jpg', by: 'Rajesh', caption: 'Trail to the ridge'},
    {id:3, src: '/images/album3.jpg', by: 'Sana', caption: 'Campfire stories'},
    {id:4, src: '/images/album4.jpg', by: 'Arjun', caption: 'Snow fields'},
    {id:5, src: '/images/album5.jpg', by: 'Neha', caption: 'Starry night'},
    {id:6, src: '/images/album6.jpg', by: 'Vikram', caption: 'Summit view'}
  ];

  return (
    <>
      <Nav variant="light" />

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
            {photos.map((p, index) => (
              <Card key={p.id} style={{padding: 0, overflow: 'hidden', cursor: 'pointer'}}>
                <div style={{height: '200px', background: index % 3 === 0 ? 'linear-gradient(135deg,#1C2E18,#2A4428)' : index % 3 === 1 ? 'linear-gradient(135deg,#1A2C3E,#2A4050)' : 'linear-gradient(135deg,#2A1E10,#3A2C18)', position: 'relative'}}>
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

      <Footer />
    </>
  );
}
