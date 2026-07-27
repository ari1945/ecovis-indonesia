import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GuideLandingForm from '@/components/GuideLandingForm';
import { guideLanding as c } from '@/lib/content/pages/guideLanding';
import { bi, isLang, LANGS, t, type Lang } from '@/lib/i18n';
import styles from './guide.module.css';

/**
 * Distraction-free lead-magnet landing page — logo-only header, single-focus
 * form, no site navigation. Rendered outside the `(site)` chrome layout on
 * purpose. Currently one guide; add entries here as campaigns are created.
 */
const GUIDES = ['company-establishment'] as const;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => GUIDES.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  if (!GUIDES.includes(slug as (typeof GUIDES)[number])) return {};
  return {
    title: bi(lang, c.title),
    description: bi(lang, c.subtitle),
    alternates: { canonical: `/${lang}/guides/${slug}` },
  };
}

export default async function GuideLandingPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  if (!GUIDES.includes(slug as (typeof GUIDES)[number])) notFound();
  const lang: Lang = raw;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href={`/${lang}`} className={styles.logo}>
          <Image src="/logo.png" alt="Ecovis Indonesia" width={180} height={46} priority />
        </Link>
        <div className={styles.trust}>
          <span className={styles.dot} aria-hidden="true" />
          {t(
            lang,
            'A member of ECOVIS International · 90+ countries',
            'Anggota ECOVIS International · 90+ negara',
          )}
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.blobA} aria-hidden="true" />
        <div className={styles.blobB} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.pitch}>
            <div className={styles.badge}>{t(lang, 'Free Guide · 2026 Edition', 'Panduan Gratis · Edisi 2026')}</div>
            <h1 className={styles.title}>{bi(lang, c.title)}</h1>
            <p className={styles.subtitle}>{bi(lang, c.subtitle)}</p>

            <div className={styles.pitchBody}>
              {/* Stylised guide cover — artwork stand-in, decorative only. */}
              <div className={styles.cover} aria-hidden="true">
                <div className={styles.coverBg} />
                <div className={styles.coverSpine} />
                <div className={styles.coverInner}>
                  {/* Wordmark rather than the logo file: the PNG has a white
                      background, so inverting it to sit on maroon renders a
                      solid white block. */}
                  <div className={styles.coverLogo}>
                    ECOVIS <span>INDONESIA</span>
                  </div>
                  <div className={styles.coverEyebrow}>GUIDE · 2026</div>
                  <div className={styles.coverTitle}>{bi(lang, c.coverTitle)}</div>
                  <div className={styles.coverRule} />
                </div>
              </div>

              <ul className={styles.bullets}>
                {c.bullets.map((bullet) => (
                  <li key={bullet[0]} className={styles.bullet}>
                    <span className={styles.bulletMark} aria-hidden="true">
                      ✓
                    </span>
                    {bi(lang, bullet)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.formCard}>
            <GuideLandingForm lang={lang} guide={slug} />
          </div>
        </div>
      </section>

      <section className={styles.proofStrip}>
        <div className={styles.proofInner}>
          <div className={styles.proofLabel}>
            {t(
              lang,
              'Trusted by companies entering & operating in Indonesia',
              'Dipercaya perusahaan yang masuk & beroperasi di Indonesia',
            )}
          </div>
          <div className={styles.proofItems}>
            {c.proof.map((item) => (
              <div key={item.value[0]} className={styles.proofItem}>
                <div className={styles.proofValue}>{bi(lang, item.value)}</div>
                <div className={styles.proofText}>{bi(lang, item.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          {t(
            lang,
            '© 2026 ECOVIS Indonesia. All rights reserved.',
            '© 2026 ECOVIS Indonesia. Hak cipta dilindungi.',
          )}
        </div>
        <div className={styles.footerLinks}>
          <Link href={`/${lang}/privacy`}>{t(lang, 'Privacy Policy', 'Kebijakan Privasi')}</Link>
          <Link href={`/${lang}`}>{t(lang, 'Back to main site', 'Kembali ke situs utama')}</Link>
        </div>
      </footer>
    </div>
  );
}
