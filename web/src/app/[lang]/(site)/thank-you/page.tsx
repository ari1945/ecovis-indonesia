import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { thankYou as c } from '@/lib/content/pages/thankYou';
import { bi, isLang, type Lang } from '@/lib/i18n';
import styles from './thank-you.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  return {
    title: bi(lang, c.tTitle),
    // This is a conversion confirmation, not a page anyone should reach from search.
    robots: { index: false, follow: true },
    alternates: { canonical: `/${lang}/thank-you` },
  };
}

export default async function ThankYouPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  return (
    <>
      <section className={`panel-maroon panel-maroon--service ${styles.hero}`}>
        <div className={styles.blobA} aria-hidden="true" />
        <div className={styles.blobB} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.mark} aria-hidden="true">
            ✓
          </div>
          <h1 className={styles.title}>{bi(lang, c.tTitle)}</h1>
          <p className={styles.sub}>{bi(lang, c.tSub)}</p>
          <div className={styles.actions}>
            <Link href={`/${lang}/resources`} className="btn btn--white">
              {bi(lang, c.tBtnGuides)}
            </Link>
            <Link href={`/${lang}/insights`} className="btn btn--ghost">
              {bi(lang, c.tBtnInsights)}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-top">
        <div className={styles.stepsWrap}>
          <div className={styles.stepsLabel}>{bi(lang, c.tNextLabel)}</div>
          <div className={styles.steps}>
            {c.steps.map((step) => (
              <div key={step.n[0]} className={styles.step}>
                <div className={styles.stepNum}>{bi(lang, step.n)}</div>
                <div className={styles.stepTitle}>{bi(lang, step.title)}</div>
                <div className={styles.stepText}>{bi(lang, step.text)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
