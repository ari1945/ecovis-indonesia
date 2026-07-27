import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactWizard from '@/components/ContactWizard';
import { contact as c } from '@/lib/content/pages/contact';
import { bi, isLang, type Bi, type Lang } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import styles from './contact.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  return {
    title: bi(lang, c.tKicker),
    description: bi(lang, c.tHeroSub),
    alternates: {
      canonical: `/${lang}/contact`,
      languages: { en: '/en/contact', 'id-ID': '/id/contact', 'x-default': '/en/contact' },
    },
  };
}

const DIRECT_LINES: Array<{ label: Bi; address: string }> = [
  { label: c.tDirAudit, address: 'audit@ecovisindonesia.com' },
  { label: c.tDirTax, address: 'tax@ecovisindonesia.com' },
  { label: c.tDirValuation, address: 'valuation@ecovisindonesia.com' },
  { label: c.tDirCareers, address: 'careers@ecovisindonesia.com' },
];

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  return (
    <>
      <section className="panel-maroon panel-maroon--flat">
        <div className={styles.heroBlob} aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: '72px 80px' }}>
          <div className="kicker kicker--on-dark">{bi(lang, c.tKicker)}</div>
          <h1 className="h1" style={{ fontSize: 'clamp(32px,5vw,46px)', maxWidth: 720, marginBottom: 18 }}>
            {bi(lang, c.tHeroTitle)}
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', margin: 0, maxWidth: 640 }}>
            {bi(lang, c.tHeroSub)}
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className={`wrap ${styles.layout}`}>
          <ContactWizard lang={lang} />

          <aside className={styles.sidebar}>
            <div className={styles.panel}>
              <div className={styles.panelTitle}>{bi(lang, c.tOfficeLabel)}</div>
              <address className={styles.address}>
                {SITE.address.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < SITE.address.length - 1 && <br />}
                  </span>
                ))}
              </address>
              <div className={styles.contactLines}>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <span style={{ color: 'var(--text-800)' }}>{SITE.phone}</span>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
              <div className={styles.hours}>{bi(lang, c.tHours)}</div>
            </div>

            {/* Placeholder for the Google Maps embed — the design bundle flags
                this as pending a real embed and a cookie-consent gate. */}
            <div className={styles.mapPlaceholder} role="img" aria-label={bi(lang, c.tMapText)}>
              <div className={styles.mapPattern} aria-hidden="true" />
              <div className={styles.mapContent}>
                <div className={styles.mapPin} aria-hidden="true">
                  <div className={styles.mapPinDot} />
                </div>
                <div className={styles.mapText}>{bi(lang, c.tMapText)}</div>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelTitle}>{bi(lang, c.tDirectLines)}</div>
              <div className={styles.directLines}>
                {DIRECT_LINES.map((line) => (
                  <div key={line.address}>
                    {bi(lang, line.label)} — <a href={`mailto:${line.address}`}>{line.address}</a>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
