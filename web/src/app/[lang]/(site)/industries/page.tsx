import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries as c } from '@/lib/content/pages/industries';
import { INDUSTRIES } from '@/lib/content/home';
import { bi, isLang, type Lang } from '@/lib/i18n';
import { serviceHrefByLabel } from '@/lib/site';
import styles from './industries.module.css';

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
      canonical: `/${lang}/industries`,
      languages: { en: '/en/industries', 'id-ID': '/id/industries', 'x-default': '/en/industries' },
    },
  };
}

export default async function IndustriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  // Anchors match the slugs the home page links to.
  const items = c.industries.map((industry, index) => ({
    ...industry,
    slug: INDUSTRIES[index]?.slug ?? industry.name[0].toLowerCase().replace(/[^a-z]+/g, '-'),
  }));

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

      {items.map((industry, index) => (
        <section
          key={industry.slug}
          id={industry.slug}
          className={styles.block}
          style={{ background: index % 2 ? 'var(--cream)' : 'var(--white)' }}
        >
          <div className={`wrap ${styles.grid}`}>
            <div className={styles.intro}>
              <div className={styles.rule} aria-hidden="true" />
              <h2 className={styles.title}>{bi(lang, industry.name)}</h2>
              <p className={styles.desc}>{bi(lang, industry.desc)}</p>
              <div className={styles.chips}>
                {industry.services.map((service) => (
                  <Link
                    key={service.name[0]}
                    href={serviceHrefByLabel(lang, service.name[0])}
                    className={styles.chip}
                  >
                    {bi(lang, service.name)}
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.detail}>
              <div className={styles.detailCol}>
                <div className={styles.detailHead}>{bi(lang, c.tRegulatory)}</div>
                {industry.regulatory.map((item) => (
                  <div key={item[0]} className={styles.detailItem}>
                    <span className={styles.markProblem} aria-hidden="true">
                      —
                    </span>
                    <span>{bi(lang, item)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.detailCol}>
                <div className={styles.detailHead}>{bi(lang, c.tHowWeHelp)}</div>
                {industry.help.map((item) => (
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
            <h2 className={styles.closingTitle}>{bi(lang, c.tCtaTitle)}</h2>
            <Link href={`/${lang}/contact`} className={styles.closingCta}>
              {bi(lang, c.tCta)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
