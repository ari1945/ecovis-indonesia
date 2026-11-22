import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { careers as c } from '@/lib/content/pages/careers';
import { bi, isLang, type Lang } from '@/lib/i18n';
import styles from './careers.module.css';

const CAREERS_EMAIL = 'careers@ecovisindonesia.com';

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
      canonical: `/${lang}/careers`,
      languages: { en: '/en/careers', 'id-ID': '/id/careers', 'x-default': '/en/careers' },
    },
  };
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  const programs = [
    { kicker: c.tInternKicker, title: c.tInternTitle, text: c.tInternText, cta: c.tInternCta },
    { kicker: c.tGradKicker, title: c.tGradTitle, text: c.tGradText, cta: c.tGradCta },
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

      <section className="bg-white">
        <div className="wrap section">
          <div className="grid grid--why">
            {c.culture.map((item) => (
              <div key={item.title[0]} className="why-point">
                <div className="card__rule" aria-hidden="true" />
                <div className="why-point__title">{bi(lang, item.title)}</div>
                <div className="why-point__text">{bi(lang, item.text)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap" style={{ paddingBlock: 80 }}>
          <div className="kicker">{bi(lang, c.tOpenKicker)}</div>
          <h2 className="h2" style={{ fontSize: 'clamp(28px,4vw,36px)', margin: '0 0 40px' }}>
            {bi(lang, c.tOpenTitle)}
          </h2>
          <div className={styles.jobs}>
            {c.jobs.map((job) => (
              <a
                key={job.role[0]}
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(job.role[0])}`}
                className={styles.job}
              >
                <div className={styles.jobRole}>{bi(lang, job.role)}</div>
                <div className={styles.jobEntity}>{bi(lang, job.entity)}</div>
                <div className={styles.jobType}>{bi(lang, job.type)}</div>
                <span className={styles.jobApply}>{bi(lang, c.tApply)} →</span>
              </a>
            ))}
          </div>
          <p className={styles.applyNote}>
            {bi(lang, c.tApplyNote)} <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>
            {bi(lang, c.tApplyNote2)}
          </p>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 20 }}>
          {programs.map((program) => (
            <div key={program.title[0]} className={styles.program}>
              <div className={styles.programKicker}>{bi(lang, program.kicker)}</div>
              <div className={styles.programTitle}>{bi(lang, program.title)}</div>
              <p className={styles.programText}>{bi(lang, program.text)}</p>
              <a href={`mailto:${CAREERS_EMAIL}`} className={styles.programCta}>
                {bi(lang, program.cta)} →
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
