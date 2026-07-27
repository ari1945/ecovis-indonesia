import Link from 'next/link';
import { t, type Lang } from '@/lib/i18n';

/**
 * The closing consultation band that every page ends on.
 * `align` mirrors the prototype: the home page floats its blob left, service
 * pages float it right.
 */
export default function CtaBand({
  lang,
  title,
  subtitle,
  ctaLabel,
  blob = 'left',
}: {
  lang: Lang;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  blob?: 'left' | 'right';
}) {
  return (
    <section className="panel-maroon panel-maroon--flat">
      <div className={`blob ${blob === 'left' ? 'blob--cta-left' : 'blob--cta-right'}`} aria-hidden="true" />
      <div className="wrap section--xs">
        <div className="cta-band">
          <div>
            <h2 className="cta-band__title">{title}</h2>
            {subtitle && <p className="cta-band__sub">{subtitle}</p>}
          </div>
          <Link href={`/${lang}/contact`} className="btn btn--white btn--lg">
            {ctaLabel || t(lang, 'Schedule a Consultation', 'Jadwalkan Konsultasi')}
          </Link>
        </div>
      </div>
    </section>
  );
}
