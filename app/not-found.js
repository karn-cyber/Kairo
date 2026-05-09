import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Button, Card } from '@/components/UI';

export default function NotFound() {
  return (
    <>
      <Nav variant="light" />
      <section className="section warm" style={{minHeight: '70vh', display: 'flex', alignItems: 'center'}}>
        <div className="container" style={{maxWidth: '760px', textAlign: 'center'}}>
          <Card style={{padding: '40px 32px'}}>
            <div style={{fontFamily: 'var(--PD)', fontSize: '96px', lineHeight: 1, color: 'var(--orange)', fontWeight: 900}}>404</div>
            <h1 style={{fontFamily: 'var(--PD)', fontSize: '40px', fontWeight: 900, color: 'var(--ink)', margin: '12px 0 14px'}}>
              This trail doesn’t exist.
            </h1>
            <p style={{fontSize: '16px', color: 'var(--ink3)', lineHeight: 1.8, marginBottom: '28px'}}>
              The page you’re looking for may have moved, or the route may not be mapped yet. Head back to the home page to continue exploring.
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap'}}>
              <Link href="/"><Button variant="primary">Go home</Button></Link>
              <Link href="/explore"><Button variant="ghost">Explore trips</Button></Link>
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}
