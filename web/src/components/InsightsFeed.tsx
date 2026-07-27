'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ARTICLES, CATEGORIES, categoryLabel, type Category } from '@/lib/content/articles';
import { insights as c } from '@/lib/content/pages/insights';
import { bi, t, type Lang } from '@/lib/i18n';
import styles from './InsightsFeed.module.css';

type Filter = Category | 'All';

/** Article grid with category filter chips. */
export default function InsightsFeed({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = filter === 'All' ? ARTICLES : ARTICLES.filter((article) => article.category === filter);

  const filters: Array<{ key: Filter; label: string }> = [
    { key: 'All', label: t(lang, 'All', 'Semua') },
    ...CATEGORIES.map((category) => ({ key: category as Filter, label: categoryLabel(lang, category) })),
  ];

  return (
    <>
      <div className={styles.filters} role="group" aria-label={t(lang, 'Filter by category', 'Saring menurut kategori')}>
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={filter === item.key}
            className={`${styles.filter} ${filter === item.key ? styles.filterActive : ''}`}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid--articles" aria-live="polite">
        {shown.map((article) => (
          <Link key={article.slug} href={`/${lang}/insights/${article.slug}`} className="card card--article">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <span className="tag">{categoryLabel(lang, article.category)}</span>
              <span style={{ fontSize: 12.5, color: 'var(--text-500)' }}>{article.date}</span>
            </div>
            <div className={styles.cardTitle}>{bi(lang, article.title)}</div>
            <div className={styles.cardExcerpt}>{bi(lang, article.excerpt)}</div>
            <span className={styles.readMore}>{bi(lang, c.tReadMore)} →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
