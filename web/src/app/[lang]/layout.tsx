import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { HTML_LANG, LANGS, isLang, t, type Lang } from '@/lib/i18n';
import { IS_PRODUCTION_SITE, SITE } from '@/lib/site';
import '@/styles/globals.css';

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

// Used for article metadata, the privacy contents list and dev notes.
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';

  return {
    metadataBase: new URL(SITE.url),
    // robots.txt is only advisory; preview deployments also carry a meta tag.
    ...(IS_PRODUCTION_SITE ? {} : { robots: { index: false, follow: false } }),
    title: {
      default: t(
        lang,
        'ECOVIS Indonesia — Audit, Tax, Accounting & Business Advisory',
        'ECOVIS Indonesia — Audit, Pajak, Akuntansi & Advisory Bisnis',
      ),
      template: `%s | ${SITE.name}`,
    },
    description: t(
      lang,
      'Integrated audit, tax, accounting, payroll and business advisory services in Indonesia — backed by the global ECOVIS network in 90+ countries.',
      'Layanan audit, pajak, akuntansi, penggajian, dan advisory bisnis yang terintegrasi di Indonesia — didukung jaringan global ECOVIS di 90+ negara.',
    ),
    alternates: {
      canonical: `/${lang}`,
      // Both language versions get their own indexable URL — the design
      // evaluation flagged the prototype's toggle-only approach as a P0 defect.
      languages: { en: '/en', 'id-ID': '/id', 'x-default': '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: t(lang, 'en_US', 'id_ID'),
      url: `/${lang}`,
    },
  };
}

/**
 * Root layout for the public site. Deliberately holds no chrome — the marketing
 * pages add header and footer in `(site)/layout.tsx`, while the lead-magnet
 * landing pages under `(landing)` stay distraction-free by design.
 */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();

  return (
    <html lang={HTML_LANG[raw]} className={`${manrope.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
