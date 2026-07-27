import Link from 'next/link';
import { notFound as content } from '@/lib/content/pages/notFound';
import { bi, DEFAULT_LANG } from '@/lib/i18n';
import styles from './not-found.module.css';

/**
 * Rendered for unmatched routes under a locale. Next.js does not pass route
 * params to not-found boundaries, so this renders in the default language and
 * links back into it.
 */
export default function NotFound() {
  const lang = DEFAULT_LANG;

  // Same order as the prototype's popular-destinations list.
  const hrefs = [
    `/${lang}/services`,
    `/${lang}/industries`,
    `/${lang}/insights`,
    `/${lang}/resources`,
    `/${lang}/contact`,
  ];
  const links = content.links.map((link, index) => ({
    label: link.name,
    href: hrefs[index] ?? `/${lang}`,
  }));

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div>
          <div className={styles.code}>404</div>
          <h1 className={styles.title}>{bi(lang, content.tTitle)}</h1>
          <p className={styles.sub}>{bi(lang, content.tSub)}</p>
          <div className={styles.actions}>
            <Link href={`/${lang}`} className={styles.primary}>
              {bi(lang, content.tBtnHome)}
            </Link>
            <Link href={`/${lang}/contact`} className={styles.secondary}>
              {bi(lang, content.tBtnContact)}
            </Link>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHead}>{bi(lang, content.tPopular)}</div>
          <div className={styles.links}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                <span>{bi(lang, link.label)}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
