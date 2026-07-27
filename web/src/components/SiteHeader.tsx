'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LANGS, swapLocale, t, type Lang } from '@/lib/i18n';
import { aboutNavItems, ctaLabel, primaryNavItems, serviceNavItems, SITE } from '@/lib/site';
import styles from './SiteHeader.module.css';

type OpenMenu = 'about' | 'services' | null;

export default function SiteHeader({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<OpenMenu>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobSection, setMobSection] = useState<OpenMenu>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const services = serviceNavItems(lang);
  const about = aboutNavItems(lang);
  const primary = primaryNavItems(lang);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setMobSection(null);
    // Return focus to the control that opened the drawer.
    burgerRef.current?.focus();
  }, []);

  // Escape closes the drawer first, then any open dropdown.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (drawerOpen) closeDrawer();
      else setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  // Navigating away should never leave the drawer or a menu hanging open.
  useEffect(() => {
    setDrawerOpen(false);
    setMobSection(null);
    setOpen(null);
  }, [pathname]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  const switchLang = (next: Lang) => {
    if (next === lang) return;
    router.push(swapLocale(pathname, next));
  };

  const dropdown = (key: Exclude<OpenMenu, null>, label: string, href: string, items: { label: string; href: string }[], wide = false) => {
    const isOpen = open === key;
    return (
      <div
        className={styles.dropdown}
        onMouseEnter={() => setOpen(key)}
        onMouseLeave={() => setOpen(null)}
      >
        <Link
          href={href}
          className={`${styles.dropdownTrigger} ${isOpen ? styles.dropdownTriggerOpen : ''}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={(event) => {
            // Click toggles rather than navigating, so the menu is reachable
            // by keyboard and touch — not hover only.
            event.preventDefault();
            setOpen(isOpen ? null : key);
          }}
        >
          {label}
          <span className={`${styles.caret} ${isOpen ? styles.caretOpen : ''}`} aria-hidden="true">
            ▼
          </span>
        </Link>
        {isOpen && (
          <div className={`${styles.menu} ${wide ? styles.menuWide : ''}`}>
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={styles.menuItem}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className={styles.header}>
        <a href="#main" className={styles.skip}>
          {t(lang, 'Skip to main content', 'Lewati ke konten utama')}
        </a>

        <div className={styles.topbar}>
          <div className={styles.topbarNote}>
            {t(
              lang,
              'A member of ECOVIS International  ·  90+ countries',
              'Anggota ECOVIS International  ·  90+ negara',
            )}
          </div>
          <div className={styles.topbarActions}>
            <a href={SITE.whatsapp} className={styles.waLink} target="_blank" rel="noopener noreferrer">
              <span className={`wa-badge ${styles.waDot}`} aria-hidden="true">
                W
              </span>
              WhatsApp
            </a>
            <span className={`${styles.sep} ${styles.hideNarrow}`} aria-hidden="true">
              |
            </span>
            <a href={`mailto:${SITE.email}`} className={`${styles.topbarLink} ${styles.hideNarrow}`}>
              {SITE.email}
            </a>
            <span className={`${styles.sep} ${styles.hideNarrow}`} aria-hidden="true">
              |
            </span>
            <div className={styles.langSwitch}>
              {LANGS.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => switchLang(code)}
                  aria-current={code === lang ? 'true' : undefined}
                  className={`${styles.langButton} ${code === lang ? styles.langButtonActive : ''}`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bar}>
          <Link href={`/${lang}`} className={styles.logo}>
            <Image src="/logo.png" alt="Ecovis Indonesia" width={200} height={52} priority />
          </Link>

          <nav className={styles.nav} aria-label={t(lang, 'Main', 'Utama')}>
            {dropdown('about', t(lang, 'About', 'Tentang'), `/${lang}/about`, about)}
            {dropdown('services', t(lang, 'Services', 'Layanan'), `/${lang}/services`, services.map((s) => ({ label: s.name, href: s.href })), true)}
            {primary.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href={`/${lang}/contact`} className={styles.cta}>
            {ctaLabel(lang)}
          </Link>

          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-label="Menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className={styles.drawerRoot}>
          <button
            type="button"
            className={styles.scrim}
            aria-label={t(lang, 'Close menu', 'Tutup menu')}
            onClick={closeDrawer}
          />
          <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Menu">
            <div className={styles.panelHead}>
              <Image src="/logo.png" alt="Ecovis" width={170} height={44} />
              <button
                type="button"
                className={styles.closeButton}
                aria-label={t(lang, 'Close', 'Tutup')}
                onClick={closeDrawer}
              >
                ×
              </button>
            </div>

            <div className={styles.panelBody}>
              {(
                [
                  ['about', t(lang, 'About', 'Tentang'), about] as const,
                  ['services', t(lang, 'Services', 'Layanan'), services.map((s) => ({ label: s.name, href: s.href }))] as const,
                ]
              ).map(([key, label, items]) => {
                const expanded = mobSection === key;
                return (
                  <div key={key}>
                    <button
                      type="button"
                      className={styles.accordionButton}
                      aria-expanded={expanded}
                      onClick={() => setMobSection(expanded ? null : key)}
                    >
                      {label}
                      <span
                        className={styles.accordionCaret}
                        style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </button>
                    {expanded && (
                      <div className={styles.accordionPanel}>
                        {items.map((item) => (
                          <Link key={item.href} href={item.href} className={styles.accordionLink}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {primary.map((item) => (
                <Link key={item.href} href={item.href} className={styles.drawerLink}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className={styles.panelFoot}>
              <Link href={`/${lang}/contact`} className={styles.drawerCta}>
                {ctaLabel(lang)}
              </Link>
              <a href={SITE.whatsapp} className={styles.drawerWa} target="_blank" rel="noopener noreferrer">
                <span className={`wa-badge ${styles.waDot}`} aria-hidden="true">
                  W
                </span>
                WhatsApp
              </a>
              <div className={styles.drawerEmail}>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
