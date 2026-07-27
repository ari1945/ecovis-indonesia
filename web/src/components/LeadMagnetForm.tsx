'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { t, type Lang } from '@/lib/i18n';
import { isValidEmail, submitLead } from '@/lib/submit';

/**
 * The gated-download form shared by every service page and the Resources hub.
 * Labels sit above their inputs and placeholders carry example values — the
 * design evaluation flagged placeholder-as-label as an accessibility defect.
 */
export default function LeadMagnetForm({
  lang,
  source,
  submitLabel,
  sentLabel,
}: {
  lang: Lang;
  source: string;
  submitLabel: string;
  sentLabel: string;
}) {
  const id = useId();
  const [values, setValues] = useState({ name: '', email: '', company: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const fields = [
    {
      key: 'name' as const,
      label: t(lang, 'Full name', 'Nama lengkap'),
      example: t(lang, 'e.g. Budi Santoso', 'mis. Budi Santoso'),
      type: 'text',
      autoComplete: 'name',
    },
    {
      key: 'email' as const,
      label: t(lang, 'Work email', 'Email kantor'),
      example: t(lang, 'e.g. budi@company.co.id', 'mis. budi@perusahaan.co.id'),
      type: 'email',
      autoComplete: 'email',
    },
    {
      key: 'company' as const,
      label: t(lang, 'Company', 'Perusahaan'),
      example: t(lang, 'e.g. PT Contoh Indonesia', 'mis. PT Contoh Indonesia'),
      type: 'text',
      autoComplete: 'organization',
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = t(lang, 'Please enter your name.', 'Mohon isi nama Anda.');
    if (!isValidEmail(values.email)) {
      next.email = t(lang, 'Please enter a valid email address.', 'Mohon isi alamat email yang valid.');
    }
    if (!values.company.trim()) {
      next.company = t(lang, 'Please enter your company.', 'Mohon isi nama perusahaan Anda.');
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('sending');
    try {
      await submitLead({ kind: 'guide', source, lang, fields: values });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const disabled = !consent || status === 'sending' || status === 'sent';

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const fieldId = `${id}-${field.key}`;
        const errorId = `${fieldId}-error`;
        const error = errors[field.key];
        return (
          <div key={field.key} className="field">
            <label htmlFor={fieldId}>{field.label}</label>
            <input
              id={fieldId}
              className="input"
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.example}
              value={values[field.key]}
              onChange={set(field.key)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
            />
            {error && (
              <span id={errorId} className="field-error">
                {error}
              </span>
            )}
          </div>
        );
      })}

      <label className="consent">
        <input type="checkbox" checked={consent} onChange={() => setConsent((prev) => !prev)} />
        <span>
          {t(
            lang,
            'I agree that Ecovis Indonesia may process these details to send the material and follow up. See the',
            'Saya setuju Ecovis Indonesia memproses data ini untuk mengirim materi dan menindaklanjuti. Lihat',
          )}{' '}
          <Link href={`/${lang}/privacy`}>{t(lang, 'Privacy Policy', 'Kebijakan Privasi')}</Link>.
        </span>
      </label>

      <button type="submit" className="btn btn--maroon" disabled={disabled}>
        {status === 'sent' ? sentLabel : submitLabel}
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
        <strong>{t(lang, 'We reply within 1 business day.', 'Kami membalas dalam 1 hari kerja.')}</strong>{' '}
        {t(
          lang,
          'Used only to send this guide and our briefing. Unsubscribe anytime.',
          'Hanya digunakan untuk mengirim panduan ini dan briefing kami. Berhenti berlangganan kapan saja.',
        )}
      </p>
    </form>
  );
}
