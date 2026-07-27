'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { t, type Lang } from '@/lib/i18n';
import { legalEntities, SITE } from '@/lib/site';
import styles from './SiteFooter.module.css';

const COOKIE_KEY = 'ecovis-cookie';

export default function SiteFooter({ lang }: { lang: Lang }) {
  // `undefined` until the stored choice is read, so the banner never flashes
  // for visitors who already answered it.
  const [choice, setChoice] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    try {
      setChoice(localStorage.getItem(COOKIE_KEY));
    } catch {
      setChoice(null);
    }
  }, []);

  const save = (value: string) => {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      /* storage unavailable — the choice simply won't persist */
    }
    setChoice(value);
  };

  const serviceLinks = [
    { label: t(lang, 'Audit & Assurance', 'Audit & Asurans'), href: `/${lang}/services/audit` },
    { label: t(lang, 'Tax', 'Pajak'), href: `/${lang}/services/tax` },
    { label: t(lang, 'PT PMA Establishment', 'Pendirian PT PMA'), href: `/${lang}/services/company-setup` },
    { label: t(lang, 'Accounting & Payroll', 'Akuntansi & Penggajian'), href: `/${lang}/services/accounting` },
    { label: t(lang, 'Advisory', 'Advisory'), href: `/${lang}/services/advisory` },
    { label: t(lang, 'Transfer Pricing', 'Transfer Pricing'), href: `/${lang}/services/transfer-pricing` },
  ];

  const companyLinks = [
    { label: t(lang, 'About Us', 'Tentang Kami'), href: `/${lang}/about` },
    { label: t(lang, 'Industries', 'Industri'), href: `/${lang}/industries` },
    { label: t(lang, 'Insights', 'Wawasan'), href: `/${lang}/insights` },
    { label: t(lang, 'Resources', 'Sumber Daya'), href: `/${lang}/resources` },
    { label: t(lang, 'Careers', 'Karier'), href: `/${lang}/careers` },
    { label: t(lang, 'Contact', 'Kontak'), href: `/${lang}/contact` },
  ];

  const privacyLabel = t(lang, 'Privacy Policy', 'Kebijakan Privasi');

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.grid}>
          <div className={`${styles.col} ${styles.brandCol}`}>
            <div className={styles.wordmark}>
              ECOVIS <span>INDONESIA</span>
            </div>
            <p className={styles.tagline}>
              {t(
                lang,
                'Integrated audit, tax, accounting, payroll and business advisory services — backed by the global ECOVIS network in 90+ countries.',
                'Layanan audit, pajak, akuntansi, penggajian, dan advisory bisnis yang terintegrasi — didukung jaringan global ECOVIS di 90+ negara.',
              )}
            </p>
            <div className={styles.entities}>
              <div className={styles.eyebrow}>
                {t(lang, 'Legal entities & licences', 'Entitas & izin')}
              </div>
              {legalEntities(lang).map((entity) => (
                <span key={entity.name}>
                  <span className={styles.entityName}>{entity.name}</span>
                  <br />
                  {entity.detail}
                </span>
              ))}
              <span style={{ color: 'var(--on-dark-400)' }}>
                {t(
                  lang,
                  'Registered with IAPI, IKPI and MAPPI. An independent member of ECOVIS International.',
                  'Terdaftar pada IAPI, IKPI, dan MAPPI. Anggota independen ECOVIS International.',
                )}
              </span>
            </div>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>{t(lang, 'Services', 'Layanan')}</div>
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
            <Link href={`/${lang}/services`} className={styles.linkAccent}>
              {t(lang, 'All services', 'Semua layanan')} →
            </Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>{t(lang, 'Company', 'Perusahaan')}</div>
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>{t(lang, 'Jakarta Office', 'Kantor Jakarta')}</div>
            <address className={styles.address}>
              {SITE.address.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < SITE.address.length - 1 && <br />}
                </span>
              ))}
            </address>
            <span className={styles.address}>
              {t(lang, 'Monday–Friday, 08.30–17.30 WIB', 'Senin–Jumat, 08.30–17.30 WIB')}
            </span>
            <a href={`mailto:${SITE.email}`} className={styles.linkAccent}>
              {SITE.email}
            </a>
            <a href={SITE.phoneHref} className={styles.link}>
              {SITE.phone}
            </a>
            <a href={SITE.whatsapp} className={styles.iconLink} target="_blank" rel="noopener noreferrer">
              <span className={`${styles.iconBadge} ${styles.iconBadgeWa}`} aria-hidden="true">
                W
              </span>
              WhatsApp
            </a>
            <a href={SITE.linkedin} className={styles.iconLink} target="_blank" rel="noopener noreferrer">
              <span className={`${styles.iconBadge} ${styles.iconBadgeIn}`} aria-hidden="true">
                in
              </span>
              LinkedIn
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomInner}>
            <span>
              {t(
                lang,
                '© 2026 ECOVIS Indonesia. All rights reserved.',
                '© 2026 ECOVIS Indonesia. Hak cipta dilindungi.',
              )}
            </span>
            <div className={styles.bottomLinks}>
              <Link href={`/${lang}/privacy`} className={styles.bottomLink}>
                {privacyLabel}
              </Link>
              <button type="button" className={styles.bottomLink} onClick={() => setChoice(null)}>
                {t(lang, 'Cookie settings', 'Pengaturan cookie')}
              </button>
              <span>{t(lang, 'Member of ECOVIS International', 'Anggota ECOVIS International')}</span>
            </div>
          </div>
        </div>
      </footer>

      {choice === null && (
        <div className={styles.cookie} role="region" aria-label={t(lang, 'Cookie consent', 'Persetujuan cookie')}>
          <div className={styles.cookieInner}>
            <div className={styles.cookieBody}>
              {t(
                lang,
                'We use essential cookies to run this site and, with your consent, analytics cookies to improve it. See our',
                'Kami menggunakan cookie esensial untuk menjalankan situs ini dan, dengan persetujuan Anda, cookie analitik untuk meningkatkannya. Lihat',
              )}{' '}
              <Link href={`/${lang}/privacy`}>{privacyLabel}</Link>.
            </div>
            <div className={styles.cookieActions}>
              <button type="button" className={styles.cookieDecline} onClick={() => save('essential')}>
                {t(lang, 'Decline non-essential', 'Tolak non-esensial')}
              </button>
              <button type="button" className={styles.cookieAccept} onClick={() => save('all')}>
                {t(lang, 'Accept all', 'Terima semua')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
