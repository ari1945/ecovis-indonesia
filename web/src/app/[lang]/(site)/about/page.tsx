import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { about as c } from '@/lib/content/pages/about';
import { bi, isLang, t, type Lang } from '@/lib/i18n';
import styles from './about.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  return {
    title: t(lang, 'About Us', 'Tentang Kami'),
    description: bi(lang, c.tHeroSub),
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: '/en/about', 'id-ID': '/id/about', 'x-default': '/en/about' },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  const networkStats = [
    { value: '90+', label: c.tStat1 },
    { value: '16,000+', label: c.tStat2 },
    { value: 'Top 15', label: c.tStat3 },
    { value: '2017', label: c.tStat4 },
  ];

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

      {/* Our story + the three member entities */}
      <section id="story" className="bg-white">
        <div className="wrap section grid grid--split" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">{bi(lang, c.tStoryKicker)}</div>
            <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 20px' }}>
              {bi(lang, c.tStoryTitle)}
            </h2>
            <p className="prose" style={{ margin: '0 0 16px' }}>
              {bi(lang, c.tStoryP1)}
            </p>
            <p className="prose" style={{ margin: 0 }}>
              {bi(lang, c.tStoryP2)}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {c.entities.map((entity) => (
              <div key={entity.name[0]} className={styles.entity}>
                <div className={styles.entityName}>{bi(lang, entity.name)}</div>
                <div className={styles.entityRole}>{bi(lang, entity.role)}</div>
                <div className={styles.entityDesc}>{bi(lang, entity.desc)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-cream">
        <div className="wrap" style={{ paddingBlock: 88 }}>
          <div className="kicker">{bi(lang, c.tLeadKicker)}</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 12px' }}>
            {bi(lang, c.tLeadTitle)}
          </h2>
          <p className="prose" style={{ margin: '0 0 44px', maxWidth: 640 }}>
            {bi(lang, c.tLeadSub)}
          </p>
          <div className={styles.partnerGrid}>
            {c.partners.map((partner) => (
              <div key={partner.name[0]} className={styles.partner}>
                {/* Initials stand in until partner photography is supplied. */}
                <div className={styles.partnerAvatar} aria-hidden="true">
                  {bi(lang, partner.initials)}
                </div>
                <div>
                  <div className={styles.partnerName}>{bi(lang, partner.name)}</div>
                  <div className={styles.partnerTitle}>{bi(lang, partner.title)}</div>
                  <div className={styles.partnerEntity}>{bi(lang, partner.entity)}</div>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.leadNote}>{bi(lang, c.tLeadNote)}</p>
        </div>
      </section>

      {/* Global network */}
      <section id="network" className="bg-ink">
        <div className="wrap section grid grid--split">
          <div>
            <div className="kicker kicker--on-dark">{bi(lang, c.tNetKicker)}</div>
            <h2 className="h2 h2--on-dark" style={{ fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 20px' }}>
              {bi(lang, c.tNetTitle)}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-200)', margin: '0 0 16px' }}>
              {bi(lang, c.tNetP1)}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-200)', margin: 0 }}>
              {bi(lang, c.tNetP2)}
            </p>
          </div>
          <div className="grid grid--tiles">
            {networkStats.map((stat) => (
              <div key={stat.value} className="stat-tile">
                <div className="stat-tile__value">{stat.value}</div>
                <div className="stat-tile__label" style={{ marginTop: 6 }}>
                  {bi(lang, stat.label)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & values */}
      <section id="values" className="bg-white">
        <div className="wrap section">
          <div className="kicker">{bi(lang, c.tValKicker)}</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 44px', maxWidth: 640 }}>
            {bi(lang, c.tValTitle)}
          </h2>
          <div className={styles.valueGrid}>
            {c.values.map((value) => (
              <div key={value.title[0]} className="why-point">
                <div className="card__rule" aria-hidden="true" />
                <div className={styles.valueTitle}>{bi(lang, value.title)}</div>
                <div className="why-point__text">{bi(lang, value.text)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream border-top">
        <div className="wrap" style={{ paddingBlock: 64 }}>
          <div className={styles.careersBand}>
            <div>
              <h2 className={styles.careersTitle}>{bi(lang, c.tCareersTitle)}</h2>
              <p className={styles.careersSub}>{bi(lang, c.tCareersSub)}</p>
            </div>
            <Link href={`/${lang}/careers`} className={styles.careersCta}>
              {bi(lang, c.tCareersBtn)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
