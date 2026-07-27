'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { contact as c } from '@/lib/content/pages/contact';
import { bi, t, type Lang } from '@/lib/i18n';
import { isValidEmail, submitLead } from '@/lib/submit';
import styles from './ContactWizard.module.css';

const STEP_META: Array<{ name: [string, string]; title: [string, string]; hint: [string, string] }> = [
  {
    name: ['Need', 'Kebutuhan'],
    title: ['What can we help with?', 'Apa yang bisa kami bantu?'],
    hint: ['Pick the area closest to your situation.', 'Pilih area yang paling dekat dengan situasi Anda.'],
  },
  {
    name: ['Details', 'Detail'],
    title: ['Tell us about you', 'Ceritakan tentang Anda'],
    hint: [
      'So the right partner can prepare before reaching out.',
      'Agar partner yang tepat bisa bersiap sebelum menghubungi.',
    ],
  },
  {
    name: ['Schedule', 'Jadwal'],
    title: ['When works best?', 'Kapan waktu terbaik?'],
    hint: ['We’ll confirm a slot within one business day.', 'Kami akan mengonfirmasi slot dalam satu hari kerja.'],
  },
];

/** Three-step consultation request: need → details → schedule and consent. */
export default function ContactWizard({ lang }: { lang: Lang }) {
  const id = useId();
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState('');
  const [slot, setSlot] = useState('');
  const [values, setValues] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const nameBad = touched && !values.name.trim();
  const emailBad = touched && !isValidEmail(values.email);
  const consentBad = touched && step === 3 && !consent;

  const advance = async () => {
    if (step === 1) {
      if (!need) {
        setTouched(true);
        return;
      }
      setStep(2);
      setTouched(false);
      return;
    }
    if (step === 2) {
      if (!values.name.trim() || !isValidEmail(values.email)) {
        setTouched(true);
        return;
      }
      setStep(3);
      setTouched(false);
      return;
    }
    if (!consent) {
      setTouched(true);
      return;
    }
    setStatus('sending');
    try {
      await submitLead({
        kind: 'consultation',
        source: 'contact',
        lang,
        fields: { ...values, need, slot },
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    const firstName = values.name.trim().split(/\s+/)[0] || t(lang, 'there', 'Anda');
    const needLabel = need || t(lang, 'advisory', 'advisory');
    const slotLabel = slot || t(lang, 'this week', 'minggu ini');
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <div className={styles.successMark} aria-hidden="true">
            ✓
          </div>
          <h2 className={styles.successTitle}>
            {bi(lang, c.tSuccessTitle)}, {firstName}
          </h2>
          <p className={styles.successBody}>
            {bi(lang, c.tSuccessLead)} <strong>{needLabel}</strong> {bi(lang, c.tSuccessMid)}{' '}
            <strong>{values.email}</strong> {bi(lang, c.tSuccessTail)} <strong>{slotLabel}</strong>.
          </p>
          <Link href={`/${lang}/resources`} className={styles.successLink}>
            {bi(lang, c.tWhileWait)} →
          </Link>
        </div>
      </div>
    );
  }

  const meta = STEP_META[step - 1];
  const summary = [
    { k: t(lang, 'Need', 'Kebutuhan'), v: need || '—' },
    { k: t(lang, 'Name', 'Nama'), v: values.name || '—' },
    { k: t(lang, 'Company', 'Perusahaan'), v: values.company || '—' },
    { k: t(lang, 'Email', 'Email'), v: values.email || '—' },
    { k: t(lang, 'Preferred', 'Waktu'), v: slot || t(lang, 'No preference', 'Tidak ada preferensi') },
  ];

  return (
    <div className={styles.card}>
      <div>
        <ol className={styles.progress}>
          {STEP_META.map((item, index) => {
            const number = index + 1;
            const isCurrent = number === step;
            const isComplete = number < step;
            return (
              <li key={item.name[0]} className={styles.progressStep}>
                <span
                  className={`${styles.bubble} ${isCurrent ? styles.bubbleActive : ''} ${
                    isComplete ? styles.bubbleDone : ''
                  }`}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <span className={`${styles.stepName} ${isCurrent ? styles.stepNameActive : ''}`}>
                  {bi(lang, item.name)}
                </span>
                {index < STEP_META.length - 1 && <span className={styles.connector} aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
        <h2 className={styles.stepTitle}>{bi(lang, meta.title)}</h2>
        <p className={styles.stepHint} aria-live="polite">
          {bi(lang, meta.hint)}
        </p>
      </div>

      {step === 1 && (
        <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
          <legend className="sr-only">{bi(lang, meta.title)}</legend>
          <div className={styles.needGrid}>
            {c.needOptions.map((option) => {
              const label = bi(lang, option.name);
              const selected = need === label;
              return (
                <button
                  key={option.name[0]}
                  type="button"
                  aria-pressed={selected}
                  className={`${styles.needOption} ${selected ? styles.needOptionActive : ''}`}
                  onClick={() => setNeed(label)}
                >
                  <span className={styles.radio} aria-hidden="true">
                    <span className={styles.radioDot} />
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
          {touched && !need && (
            <p className={styles.error} role="alert">
              {t(lang, 'Please choose an area.', 'Mohon pilih satu area.')}
            </p>
          )}
        </fieldset>
      )}

      {step === 2 && (
        <div className={styles.fields}>
          <div className={styles.fieldGrid}>
            <div>
              <label className={styles.label} htmlFor={`${id}-name`}>
                {bi(lang, c.tPhName)}
              </label>
              <input
                id={`${id}-name`}
                className={`${styles.control} ${nameBad ? styles.controlError : ''}`}
                autoComplete="name"
                placeholder={t(lang, 'e.g. Budi Santoso', 'mis. Budi Santoso')}
                value={values.name}
                onChange={set('name')}
                aria-invalid={nameBad || undefined}
                aria-describedby={nameBad ? `${id}-name-err` : undefined}
              />
              {nameBad && (
                <div id={`${id}-name-err`} className={styles.error}>
                  {bi(lang, c.tNameErr)}
                </div>
              )}
            </div>
            <div>
              <label className={styles.label} htmlFor={`${id}-company`}>
                {bi(lang, c.tPhCompany)}
              </label>
              <input
                id={`${id}-company`}
                className={styles.control}
                autoComplete="organization"
                placeholder={t(lang, 'e.g. PT Contoh Indonesia', 'mis. PT Contoh Indonesia')}
                value={values.company}
                onChange={set('company')}
              />
            </div>
            <div>
              <label className={styles.label} htmlFor={`${id}-email`}>
                {bi(lang, c.tPhEmail)}
              </label>
              <input
                id={`${id}-email`}
                type="email"
                className={`${styles.control} ${emailBad ? styles.controlError : ''}`}
                autoComplete="email"
                placeholder={t(lang, 'e.g. budi@company.co.id', 'mis. budi@perusahaan.co.id')}
                value={values.email}
                onChange={set('email')}
                aria-invalid={emailBad || undefined}
                aria-describedby={emailBad ? `${id}-email-err` : undefined}
              />
              {emailBad && (
                <div id={`${id}-email-err`} className={styles.error}>
                  {bi(lang, c.tEmailErr)}
                </div>
              )}
            </div>
            <div>
              <label className={styles.label} htmlFor={`${id}-phone`}>
                {bi(lang, c.tPhPhone)}
              </label>
              <input
                id={`${id}-phone`}
                type="tel"
                className={styles.control}
                autoComplete="tel"
                placeholder="+62 811 …"
                value={values.phone}
                onChange={set('phone')}
              />
            </div>
          </div>
          <div>
            <label className={styles.label} htmlFor={`${id}-message`}>
              {t(lang, 'Your situation', 'Situasi Anda')}
            </label>
            <textarea
              id={`${id}-message`}
              rows={4}
              className={`${styles.control} ${styles.textarea}`}
              placeholder={bi(lang, c.tPhMessage)}
              value={values.message}
              onChange={set('message')}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div className={styles.slotLabel}>{bi(lang, c.tPreferred)}</div>
              <div className={styles.slots}>
                {c.slotOptions.map((option) => {
                  const label = bi(lang, option.name);
                  const selected = slot === label;
                  return (
                    <button
                      key={option.name[0]}
                      type="button"
                      aria-pressed={selected}
                      className={`${styles.slot} ${selected ? styles.slotActive : ''}`}
                      onClick={() => setSlot(label)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={styles.review}>
              <div className={styles.reviewHead}>{bi(lang, c.tReview)}</div>
              {summary.map((row) => (
                <div key={row.k} className={styles.reviewRow}>
                  <span className={styles.reviewKey}>{row.k}</span>
                  <span className={styles.reviewValue}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          <label className={`${styles.consentBox} ${consentBad ? styles.consentBoxError : ''}`}>
            <input type="checkbox" checked={consent} onChange={() => setConsent((prev) => !prev)} />
            <span>
              {bi(lang, c.tConsent)} <Link href={`/${lang}/privacy`}>{bi(lang, c.tPrivacyLink)}</Link>.
            </span>
          </label>
          {consentBad && (
            <p className={styles.error} role="alert">
              {t(lang, 'Please accept to continue.', 'Mohon setujui untuk melanjutkan.')}
            </p>
          )}
        </>
      )}

      <div className={styles.nav}>
        {step > 1 && (
          <button type="button" className={styles.back} onClick={() => { setStep(step - 1); setTouched(false); }}>
            {bi(lang, c.tBack)}
          </button>
        )}
        <button type="button" className={styles.next} onClick={advance} disabled={status === 'sending'}>
          {step === 3 ? t(lang, 'Submit request', 'Kirim permintaan') : bi(lang, c.nextLabel)}
        </button>
      </div>

      {status === 'error' && (
        <p className={styles.error} role="alert">
          {t(
            lang,
            'Something went wrong sending your request. Please try again or email us directly.',
            'Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi atau email kami langsung.',
          )}
        </p>
      )}

      <p className={styles.privacyNote}>{bi(lang, c.tPrivacyNote)}</p>
    </div>
  );
}
