'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { resources as r } from '@/lib/content/pages/resources';
import { bi, t, type Lang } from '@/lib/i18n';
import { isValidEmail, submitLead } from '@/lib/submit';
import styles from './NewsletterSignup.module.css';

/**
 * Two presentations of the same subscription:
 * `inline` — the compact email-and-button strip used on the Insights page.
 * `card`   — the full form with name, interest and PDP consent on Resources.
 */
export default function NewsletterSignup({
  lang,
  source,
  variant,
}: {
  lang: Lang;
  source: string;
  variant: 'inline' | 'card';
}) {
  const id = useId();
  const [values, setValues] = useState({ name: '', email: '', interest: '' });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(values.email)) {
      setError(t(lang, 'Please enter a valid email address.', 'Mohon isi alamat email yang valid.'));
      return;
    }
    setError('');
    setStatus('sending');
    try {
      await submitLead({ kind: 'newsletter', source, lang, fields: values });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'inline') {
    return (
      <form className={styles.inline} onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor={`${id}-email`}>
          {t(lang, 'Work email', 'Email kantor')}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          className={styles.inlineInput}
          placeholder={t(lang, 'Work email', 'Email kantor')}
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit" className={styles.inlineButton} disabled={status === 'sending' || status === 'sent'}>
          {status === 'sent'
            ? t(lang, 'Subscribed', 'Terdaftar')
            : t(lang, 'Subscribe', 'Berlangganan')}
        </button>
        {error && (
          <p className={styles.inlineError} role="alert">
            {error}
          </p>
        )}
      </form>
    );
  }

  const interests = [r.tOptDefault, r.tOptTax, r.tOptCompany, r.tOptPayroll, r.tOptInvestment, r.tOptCalendar];

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor={`${id}-name`}>{bi(lang, r.tPhName)}</label>
        <input
          id={`${id}-name`}
          className="input"
          autoComplete="name"
          placeholder={bi(lang, r.tExName)}
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
        />
      </div>

      <div className="field">
        <label htmlFor={`${id}-email2`}>{bi(lang, r.tPhEmail)}</label>
        <input
          id={`${id}-email2`}
          type="email"
          className="input"
          autoComplete="email"
          placeholder={bi(lang, r.tExEmail)}
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-email-err` : undefined}
        />
        {error && (
          <span id={`${id}-email-err`} className="field-error">
            {error}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-interest`}>{t(lang, 'Interested in', 'Tertarik pada')}</label>
        <select
          id={`${id}-interest`}
          className="select"
          value={values.interest}
          onChange={(event) => setValues((prev) => ({ ...prev, interest: event.target.value }))}
        >
          {interests.map((option) => (
            <option key={option[0]} value={option[0]}>
              {bi(lang, option)}
            </option>
          ))}
        </select>
      </div>

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={() => setConsent((prev) => !prev)} />
        <span>
          {bi(lang, r.tConsent)} <Link href={`/${lang}/privacy`}>{bi(lang, r.tPrivacyLink)}</Link>.
        </span>
      </label>

      <button
        type="submit"
        className="btn btn--maroon"
        disabled={!consent || status === 'sending' || status === 'sent'}
      >
        {status === 'sent'
          ? t(lang, 'Thank you — check your inbox', 'Terima kasih — cek kotak masuk Anda')
          : bi(lang, r.submitLabel)}
      </button>

      {status === 'error' && (
        <p className="field-error" role="alert">
          {t(
            lang,
            'Something went wrong. Please try again or email us directly.',
            'Terjadi kesalahan. Silakan coba lagi atau email kami langsung.',
          )}
        </p>
      )}

      <p className="form-note">
        <strong>{bi(lang, r.tSla)}</strong>{' '}
        {t(
          lang,
          'Used only to send our briefing. Unsubscribe anytime.',
          'Hanya digunakan untuk mengirim briefing kami. Berhenti berlangganan kapan saja.',
        )}
      </p>
    </form>
  );
}
