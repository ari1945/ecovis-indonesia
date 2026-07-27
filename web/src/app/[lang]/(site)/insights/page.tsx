import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InsightsFeed from '@/components/InsightsFeed';
import NewsletterSignup from '@/components/NewsletterSignup';
import { insights as c } from '@/lib/content/pages/insights';
import { bi, isLang, type Lang } from '@/lib/i18n';
import styles from './insights.module.css';

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
      canonical: `/${lang}/insights`,
      languages: { en: '/en/insights', 'id-ID': '/id/insights', 'x-default': '/en/insights' },
    },
  };
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

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
        <div className="wrap" style={{ paddingBlock: '56px 88px' }}>
          <InsightsFeed lang={lang} />
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap" style={{ paddingBlock: 64 }}>
          <div className={styles.newsletter}>
            <div>
              <h2 className={styles.newsletterTitle}>{bi(lang, c.tNlTitle)}</h2>
              <p className={styles.newsletterSub}>{bi(lang, c.tNlSub)}</p>
            </div>
            <NewsletterSignup lang={lang} source="insights" variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}
