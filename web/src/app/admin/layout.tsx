import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import './admin.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Admin Console · Ecovis Indonesia',
  // Internal tooling — never index it.
  robots: { index: false, follow: false },
};

/**
 * Second root layout, separate from the public site: the console has its own
 * chrome, its own background, and is English-only.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${plex.variable} ${plexMono.variable}`}>
      <body className="admin-body">{children}</body>
    </html>
  );
}
