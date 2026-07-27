import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsletterSignup from '@/components/NewsletterSignup';
import { resources as c } from '@/lib/content/pages/resources';
import { bi, isLang, type Lang } from '@/lib/i18n';
import styles from './resources.module.css';

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
      canonical: `/${lang}/resources`,
      languages: { en: '/en/resources', 'id-ID': '/id/resources', 'x-default': '/en/resources' },
    },
  };
}

export default async function ResourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  // The company-establishment guide has its own dedicated landing page; the
  // rest funnel into the request form below.
  const guideHref = (title: string) =>
    title.toLowerCase().includes('establishment') || title.toLowerCase().includes('pma')
      ? `/${lang}/guides/company-establishment`
      : '#newsletter';

  return (
    <>
      <section className="panel-maroon panel-maroon--flat">
        <div className={styles.heroBlob} aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: '72px 80px' }}>
          <div className="kicker kicker--on-dark">{bi(lang, c.tKicker)}</div>
          <h1 className="h1" style={{ fontSize: 'clamp(32px,5vw,46px)', maxWidth: 760, marginBottom: 18 }}>
            {bi(lang, c.tHeroTitle)}
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', margin: 0, maxWidth: 640 }}>
            {bi(lang, c.tHeroSub)}
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap" style={{ paddingBlock: 72 }}>
          <div className={styles.guideGrid}>
            {c.guides.map((guide) => (
              <div key={guide.title[0]} className={styles.guide}>
                <div className={styles.guideTop}>
                  <div className={styles.cover} aria-hidden="true">
                    <div className={styles.coverBand} />
                  </div>
                  <span className={styles.badge}>{bi(lang, guide.badge)}</span>
                </div>
                <div className={styles.guideTitle}>{bi(lang, guide.title)}</div>
                <div className={styles.guideDesc}>{bi(lang, guide.desc)}</div>
                <Link href={guideHref(guide.title[0])} className={styles.guideCta}>
                  {bi(lang, guide.cta)} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="wrap" style={{ paddingBlock: 88 }}>
          <div className="kicker">{bi(lang, c.tCalKicker)}</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 12px' }}>
            {bi(lang, c.tCalTitle)}
          </h2>
          <p className="prose" style={{ fontSize: 15.5, margin: '0 0 40px', maxWidth: 600 }}>
            {bi(lang, c.tCalSub)}
          </p>
          <div className={styles.deadlineGrid}>
            {c.deadlines.map((deadline) => (
              <div key={deadline.day[0]} className={styles.deadline}>
                <div className={styles.deadlineDay}>{bi(lang, deadline.day)}</div>
                <div className={styles.deadlineWhat}>{bi(lang, deadline.what)}</div>
                <div className={styles.deadlineDetail}>{bi(lang, deadline.detail)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="panel-maroon panel-maroon--flat">
        <div className="blob blob--cta-left" aria-hidden="true" />
        <div className="wrap section--xs grid grid--proof">
          <div>
            <h2 className="h2 h2--md h2--on-dark" style={{ margin: '0 0 12px' }}>
              {bi(lang, c.tNlTitle)}
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>
              {bi(lang, c.tNlSub)}
            </p>
          </div>
          <NewsletterSignup lang={lang} source="resources" variant="card" />
        </div>
      </section>
    </>
  );
}
