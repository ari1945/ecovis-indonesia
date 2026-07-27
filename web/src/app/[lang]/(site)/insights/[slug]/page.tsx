import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ARTICLES,
  authorInitials,
  categoryLabel,
  getArticle,
  relatedArticles,
} from '@/lib/content/articles';
import { bi, isLang, LANGS, t, type Lang } from '@/lib/i18n';
import styles from './article.module.css';

export function generateStaticParams() {
  return LANGS.flatMap((lang) => ARTICLES.map((article) => ({ lang, slug: article.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang: Lang = isLang(raw) ? raw : 'en';
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: bi(lang, article.title),
    description: article.lede,
    alternates: {
      canonical: `/${lang}/insights/${slug}`,
      languages: {
        en: `/en/insights/${slug}`,
        'id-ID': `/id/insights/${slug}`,
        'x-default': `/en/insights/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: bi(lang, article.title),
      description: article.lede,
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  const article = getArticle(slug);
  if (!article) notFound();

  const initials = authorInitials(article.author);
  const related = relatedArticles(slug);

  return (
    <>
      <section className={`panel-maroon panel-maroon--flat ${styles.hero}`}>
        <div className={styles.heroBlob} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label={t(lang, 'Breadcrumb', 'Remah roti')}>
            <Link href={`/${lang}/insights`}>{t(lang, 'Insights', 'Wawasan')}</Link>
            <span aria-hidden="true">/</span>
            <span>{categoryLabel(lang, article.category)}</span>
          </nav>
          <span className={styles.category}>{categoryLabel(lang, article.category)}</span>
          <h1 className={styles.title}>{bi(lang, article.title)}</h1>
          <div className={styles.byline}>
            <div className={styles.avatar} aria-hidden="true">
              {initials}
            </div>
            <div>
              <div className={styles.author}>{article.author}</div>
              <div className={styles.authorTitle}>{article.authorTitle}</div>
            </div>
            <div className={styles.divider} aria-hidden="true" />
            <div className={styles.meta}>
              {article.date} · {article.readTime}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={styles.layout}>
          <article className={styles.body}>
            <p className={styles.lede}>{article.lede}</p>

            {article.body.map((block, index) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={block.id} id={block.id} className={styles.h2}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={index} className={styles.pullQuote}>
                    {block.text}
                  </blockquote>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={index} className={styles.list}>
                    {block.items.map((item) => (
                      <li key={item} className={styles.listItem}>
                        <span className={styles.listMark} aria-hidden="true">
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className={styles.para}>
                  {block.text}
                </p>
              );
            })}

            <div className={styles.authorCard}>
              <div className={styles.authorBadge} aria-hidden="true">
                {initials}
              </div>
              <div>
                <div className={styles.authorLabel}>{t(lang, 'Written by', 'Ditulis oleh')}</div>
                <div className={styles.authorCardName}>{article.author}</div>
                <div className={styles.authorCardTitle}>{article.authorTitle}</div>
                <div className={styles.authorBio}>{article.authorBio}</div>
              </div>
            </div>
          </article>

          <aside className={styles.aside}>
            <nav className={styles.toc} aria-label={t(lang, 'On this page', 'Di halaman ini')}>
              <div className={styles.tocHead}>{t(lang, 'On this page', 'Di halaman ini')}</div>
              <div className={styles.tocLinks}>
                {article.toc.map((item) => (
                  <a key={item.href} href={item.href} className={styles.tocLink}>
                    {item.text}
                  </a>
                ))}
              </div>
            </nav>
            <div className={styles.asideCta}>
              <div className={styles.asideCtaTitle}>
                {t(lang, 'Need help applying this to your business?', 'Butuh bantuan menerapkan ini ke bisnis Anda?')}
              </div>
              <p className={styles.asideCtaSub}>
                {t(
                  lang,
                  'First consultations with a partner are without obligation.',
                  'Konsultasi pertama dengan partner tanpa kewajiban.',
                )}
              </p>
              <Link href={`/${lang}/contact`} className={styles.asideCtaButton}>
                {t(lang, 'Schedule a Consultation', 'Jadwalkan Konsultasi')}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream border-top">
        <div className={styles.relatedWrap}>
          <h2 className={styles.relatedTitle}>{t(lang, 'Related insights', 'Wawasan terkait')}</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.slug} href={`/${lang}/insights/${item.slug}`} className={styles.relatedCard}>
                <span className="tag">{categoryLabel(lang, item.category)}</span>
                <div className={styles.relatedCardTitle}>{bi(lang, item.title)}</div>
                <span className={styles.relatedMore}>{t(lang, 'Read more', 'Baca selengkapnya')} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
