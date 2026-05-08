'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">K<em>a</em>iro</div>
          <p className="footer-desc">
            The operating system for the Indian adventure trip. Where travellers find their next journey, agencies find their next customer, and creators get paid for the travel they inspire.
          </p>
          <div className="footer-domain">kairolife.in</div>
        </div>
        <div>
          <div className="footer-col-title">Platform</div>
          <Link href="/explore" className="footer-link">For Travellers</Link>
          <Link href="/agencies" className="footer-link">For Agencies</Link>
          <Link href="/community" className="footer-link">Community</Link>
          <Link href="/creator-profile" className="footer-link">Creator Trips</Link>
          <Link href="/trip-hub" className="footer-link">Group Tools</Link>
        </div>
        <div>
          <div className="footer-col-title">Company</div>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/careers" className="footer-link">Careers</Link>
          <Link href="/press-kit" className="footer-link">Press Kit</Link>
          <Link href="/investors" className="footer-link">Investors</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>
        <div>
          <div className="footer-col-title">Starting Points</div>
          <Link href="/trip/kedarkantha-winter-trek" className="footer-link">Kedarkantha</Link>
          <Link href="/trip/spiti-valley-expedition" className="footer-link">Spiti Valley</Link>
          <Link href="/trip/hampta-pass" className="footer-link">Manali</Link>
          <Link href="/trip/valley-of-flowers" className="footer-link">Rishikesh</Link>
          <Link href="/trip/auli-snow-trek" className="footer-link">Mussoorie</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Kairo Technologies Pvt. Ltd. · kairolife.in</span>
        <span className="footer-tagline">Plan. Book. Travel. Share.</span>
      </div>
    </footer>
  );
}
