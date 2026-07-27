'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { t, type Lang } from '@/lib/i18n';
import { isValidEmail, submitLead } from '@/lib/submit';
import styles from './GuideLandingForm.module.css';

/** Single-focus download form for the lead-magnet landing pages. */
export default function GuideLandingForm({ lang, guide }: { lang: Lang; guide: string }) {
  const id = useId();
  const [values, setValues] = useState({ name: '', email: '', company: '', phone: '' });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const nameBad = touched && !values.name.trim();
  const emailBad = touched && !isValidEmail(values.email);

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.name.trim() || !isValidEmail(values.email) || !consent) {
      setTouched(true);
      return;
    }
    setStatus('sending');
    try {
      await submitLead({ kind: 'guide', source: `landing:${guide}`, lang, fields: values });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    const firstName = values.name.trim().split(/\s+/)[0];
    return (
      <div className={styles.success}>
        <div className={styles.successMark} aria-hidden="true">
          ✓
        </div>
        <div className={styles.successTitle}>
          {t(lang, "You're all set", 'Semua siap')}, {firstName}
        </div>
        <p className={styles.successBody}>
          {t(lang, 'We’ve emailed the guide to', 'Kami telah mengirim panduan ke')}{' '}
          <strong>{values.email}</strong>.{' '}
          {t(
            lang,
            'It should arrive within a minute.',
            'Panduan akan tiba dalam satu menit.',
          )}
        </p>
        <Link href={`/${lang}/contact`} className={styles.successLink}>
          {t(lang, 'Have questions? Talk to a partner', 'Ada pertanyaan? Bicara dengan partner')} →
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={submit} noValidate>
      <div className={styles.heading}>{t(lang, 'Download the guide', 'Unduh panduan')}</div>
      <p className={styles.lede}>
        {t(
          lang,
          "Enter your details and we'll send the PDF to your inbox instantly.",
          'Isi data Anda dan kami akan mengirim PDF ke kotak masuk Anda seketika.',
        )}
      </p>

      <div className={styles.fields}>
        <div>
          <label className={styles.label} htmlFor={`${id}-name`}>
            {t(lang, 'Full name', 'Nama lengkap')}
          </label>
          <input
            id={`${id}-name`}
            className={`${styles.input} ${nameBad ? styles.inputError : ''}`}
            autoComplete="name"
            placeholder={t(lang, 'e.g. Budi Santoso', 'mis. Budi Santoso')}
            value={values.name}
            onChange={set('name')}
            aria-invalid={nameBad || undefined}
            aria-describedby={nameBad ? `${id}-name-err` : undefined}
          />
          {nameBad && (
            <div id={`${id}-name-err`} className={styles.error}>
              {t(lang, 'Please enter your name.', 'Mohon masukkan nama Anda.')}
            </div>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor={`${id}-email`}>
            {t(lang, 'Work email', 'Email kantor')}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            className={`${styles.input} ${emailBad ? styles.inputError : ''}`}
            autoComplete="email"
            placeholder={t(lang, 'e.g. budi@company.co.id', 'mis. budi@perusahaan.co.id')}
            value={values.email}
            onChange={set('email')}
            aria-invalid={emailBad || undefined}
            aria-describedby={emailBad ? `${id}-email-err` : undefined}
          />
          {emailBad && (
            <div id={`${id}-email-err`} className={styles.error}>
              {t(lang, 'Enter a valid work email.', 'Masukkan email kantor yang valid.')}
            </div>
          )}
        </div>

        <div className={styles.pair}>
          <div>
            <label className={styles.label} htmlFor={`${id}-company`}>
              {t(lang, 'Company', 'Perusahaan')}
            </label>
            <input
              id={`${id}-company`}
              className={styles.input}
              autoComplete="organization"
              placeholder={t(lang, 'e.g. PT Contoh Indonesia', 'mis. PT Contoh Indonesia')}
              value={values.company}
              onChange={set('company')}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor={`${id}-phone`}>
              {t(lang, 'Phone (optional)', 'Telepon (opsional)')}
            </label>
            <input
              id={`${id}-phone`}
              type="tel"
              className={styles.input}
              autoComplete="tel"
              placeholder="+62 811 …"
              value={values.phone}
              onChange={set('phone')}
            />
          </div>
        </div>

        <label className={styles.consent}>
          <input type="checkbox" checked={consent} onChange={() => setConsent((prev) => !prev)} />
          <span>
            {t(
              lang,
              'Send me this guide and occasional tax & regulatory updates. I can unsubscribe anytime.',
              'Kirimkan panduan ini dan pembaruan pajak & regulasi sesekali. Saya dapat berhenti berlangganan kapan saja.',
            )}{' '}
            <Link href={`/${lang}/privacy`}>{t(lang, 'Privacy Policy', 'Kebijakan Privasi')}</Link>.
          </span>
        </label>
        {touched && !consent && (
          <div className={styles.error} role="alert">
            {t(lang, 'Please accept to continue.', 'Mohon setujui untuk melanjutkan.')}
          </div>
        )}

        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
          {t(lang, 'Send me the guide', 'Kirim panduannya')} →
        </button>

        {status === 'error' && (
          <div className={styles.error} role="alert">
            {t(
              lang,
              'Something went wrong. Please try again.',
              'Terjadi kesalahan. Silakan coba lagi.',
            )}
          </div>
        )}

        <p className={styles.note}>
          {t(
            lang,
            'Your details are handled under our confidentiality protocols. No spam.',
            'Data Anda ditangani sesuai protokol kerahasiaan kami. Tanpa spam.',
          )}
        </p>
      </div>
    </form>
  );
}
