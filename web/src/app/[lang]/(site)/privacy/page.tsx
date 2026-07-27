import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { privacy as c } from '@/lib/content/pages/privacy';
import { bi, isLang, type Lang } from '@/lib/i18n';
import styles from './privacy.module.css';

const PRIVACY_EMAIL = 'privacy@ecovisindonesia.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  return {
    title: bi(lang, c.tTitle),
    description: bi(lang, c.tIntro),
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { en: '/en/privacy', 'id-ID': '/id/privacy', 'x-default': '/en/privacy' },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  const sectionId = (index: number) => `section-${index + 1}`;

  return (
    <>
      <section className="panel-maroon panel-maroon--flat">
        <div className={styles.heroBlob} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className="kicker kicker--on-dark">{bi(lang, c.tKicker)}</div>
          <h1 className={styles.title}>{bi(lang, c.tTitle)}</h1>
          <p className={styles.intro}>{bi(lang, c.tIntro)}</p>
          <div className={styles.updated}>{bi(lang, c.tUpdated)}</div>
        </div>
      </section>

      <section className="bg-white">
        <div className={styles.layout}>
          <aside className={styles.toc}>
            <div className={styles.tocHead}>{bi(lang, c.tContents)}</div>
            <div className={styles.tocLinks}>
              {c.toc.map((item, index) => (
                <a key={item.text[0]} href={`#${sectionId(index)}`} className={styles.tocLink}>
                  {bi(lang, item.text)}
                </a>
              ))}
            </div>
          </aside>

          <div className={styles.body}>
            {c.sections.map((section, index) => (
              <section key={section.title[0]} id={sectionId(index)} className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  {section.num}. {bi(lang, section.title)}
                </h2>
                {section.paras.map((para) => (
                  <p key={para[0]} className={styles.para}>
                    {bi(lang, para)}
                  </p>
                ))}
                {'items' in section && Array.isArray(section.items) && section.items.length > 0 && (
                  <ul className={styles.list}>
                    {section.items.map((item) => (
                      <li key={item[0]} className={styles.listItem}>
                        <span className={styles.listMark} aria-hidden="true">
                          →
                        </span>
                        <span>{bi(lang, item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className={styles.contactBox}>
              <div className={styles.contactTitle}>{bi(lang, c.tContactTitle)}</div>
              <p className={styles.contactText}>
                {bi(lang, c.tContactLead)} <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
                {bi(lang, c.tContactMid)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
