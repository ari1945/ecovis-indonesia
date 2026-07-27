import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services as content } from '@/lib/content/pages/services';
import { bi, isLang, t, type Lang } from '@/lib/i18n';
import { SERVICE_SLUGS } from '@/lib/site';
import styles from './services.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  return {
    title: bi(lang, content.tKicker),
    description: bi(lang, content.tHeroSub),
    alternates: {
      canonical: `/${lang}/services`,
      languages: { en: '/en/services', 'id-ID': '/id/services', 'x-default': '/en/services' },
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  // The prototype lists services in the same order as SERVICE_SLUGS, so the
  // detail-page slug for each entry comes from its index.
  const items = content.services.map((service, index) => ({
    ...service,
    slug: SERVICE_SLUGS[index],
  }));

  return (
    <>
      <section className="panel-maroon panel-maroon--flat">
        <div className={styles.heroBlob} aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: '72px 80px' }}>
          <div className="kicker kicker--on-dark">{bi(lang, content.tKicker)}</div>
          <h1
            className="h1"
            style={{ fontSize: 'clamp(32px,5vw,46px)', maxWidth: 720, marginBottom: 18 }}
          >
            {bi(lang, content.tHeroTitle)}
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', margin: 0, maxWidth: 640 }}>
            {bi(lang, content.tHeroSub)}
          </p>
        </div>
      </section>

      {/* In-page jump nav */}
      <nav className={styles.jumpBar} aria-label={t(lang, 'Services', 'Layanan')}>
        <div className={styles.jumpInner}>
          {items.map((service) => (
            <a key={service.slug} href={`#${service.slug}`} className={styles.jumpLink}>
              {bi(lang, service.name)}
            </a>
          ))}
        </div>
      </nav>

      {items.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={styles.serviceBlock}
          style={{ background: index % 2 ? 'var(--cream)' : 'var(--white)' }}
        >
          <div className={`wrap ${styles.serviceGrid}`}>
            <div className={styles.serviceIntro}>
              <div className={styles.serviceRule} aria-hidden="true" />
              <h2 className={styles.serviceTitle}>{bi(lang, service.name)}</h2>
              <p className={styles.serviceOverview}>{bi(lang, service.overview)}</p>
              <div className={styles.chips}>
                {service.scope.map((chip) => (
                  <span key={chip[0]} className={styles.chip}>
                    {bi(lang, chip)}
                  </span>
                ))}
              </div>
              <div className={styles.serviceActions}>
                <Link href={`/${lang}/services/${service.slug}`} className={styles.exploreButton}>
                  {t(lang, 'Explore', 'Jelajahi')} {bi(lang, service.name)} →
                </Link>
                <Link href={`/${lang}/contact`} className={styles.discussLink}>
                  {bi(lang, content.tDiscuss)} →
                </Link>
              </div>
            </div>

            <div className={styles.serviceDetail}>
              <div className={styles.detailCol}>
                <div className={styles.detailHead}>{bi(lang, content.tChallenges)}</div>
                {service.challenges.map((item) => (
                  <div key={item[0]} className={styles.detailItem}>
                    <span className={styles.markProblem} aria-hidden="true">
                      —
                    </span>
                    <span>{bi(lang, item)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.detailCol}>
                <div className={styles.detailHead}>{bi(lang, content.tHowHelps)}</div>
                {service.solutions.map((item) => (
                  <div key={item[0]} className={styles.detailItem}>
                    <span className={styles.markSolution} aria-hidden="true">
                      ✓
                    </span>
                    <span>{bi(lang, item)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-ink">
        <div className="wrap" style={{ paddingBlock: 64 }}>
          <div className={styles.closing}>
            <h2 className={styles.closingTitle}>{bi(lang, content.tCtaTitle)}</h2>
            <Link href={`/${lang}/contact`} className={styles.closingCta}>
              {bi(lang, content.tCta)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
