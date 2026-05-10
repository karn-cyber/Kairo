import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Kairo — Plan. Book. Travel. Share.',
  description: 'The operating system for the Indian adventure traveller. Verified agencies, no middlemen, group trip tools, and a creator community — all in one platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', minHeight: '100vh', background: '#fafafa' }}>
          <Sidebar />
          <div className="app-main-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
