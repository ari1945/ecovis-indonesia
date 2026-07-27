import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { companySetup as c } from '@/lib/content/company-setup';
import { serviceChrome } from '@/lib/content/service-types';
import { bi, t, type Lang } from '@/lib/i18n';

/**
 * PT PMA establishment. Structurally the same conversion funnel as the other
 * service pages, but the process section is a dated vertical timeline rather
 * than a row of equal-width steps.
 */
export default function CompanySetupPage({ lang }: { lang: Lang }) {
  const chrome = serviceChrome(lang);

  return (
    <>
      {/* Hero */}
      <section className="panel-maroon panel-maroon--service">
        <div className="blob blob--svc-a" aria-hidden="true" />
        <div className="blob blob--svc-b" aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: '34px 82px' }}>
          <nav className="breadcrumb" aria-label={t(lang, 'Breadcrumb', 'Remah roti')}>
            <Link href={`/${lang}`}>{chrome.home}</Link>
            &nbsp;/&nbsp;
            <Link href={`/${lang}/services`}>{chrome.servicesCrumb}</Link>
            &nbsp;/&nbsp;
            <span className="breadcrumb__current">{bi(lang, c.crumbLast)}</span>
          </nav>
          <div className="kicker kicker--tight kicker--on-dark" style={{ marginBottom: 18, letterSpacing: '0.18em' }}>
            {bi(lang, c.kicker)}
          </div>
          <h1 className="h1 h1--service" style={{ maxWidth: 860 }}>
            {bi(lang, c.heroTitle)}
          </h1>
          <p className="lede lede--service" style={{ maxWidth: 680 }}>
            {bi(lang, c.heroSub)}
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href={`/${lang}/contact`} className="btn btn--white">
              {bi(lang, c.ctaPrimary)}
            </Link>
            <a href="#guide" className="btn btn--ghost">
              {bi(lang, c.ctaSecondary)}
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-bottom">
        <div className="wrap grid grid--trust" style={{ paddingBlock: 34 }}>
          {c.trust.map((item) => (
            <div key={item.k[0]} className="trust-item">
              <div className="trust-item__key">{bi(lang, item.k)}</div>
              <div className="trust-item__value">{bi(lang, item.v)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem → solution */}
      <section className="bg-cream">
        <div className="wrap section--sm grid grid--two">
          <div>
            <div className="kicker kicker--tight">{chrome.situation}</div>
            <h2 className="h2 h2--sm" style={{ marginBottom: 26 }}>
              {bi(lang, c.situationTitle)}
            </h2>
            <div className="bullet-list">
              {c.problems.map((item) => (
                <div key={item.t[0]} className="bullet">
                  <span className="bullet__mark bullet__mark--problem" aria-hidden="true">
                    —
                  </span>
                  <div>
                    <div className="bullet__title">{bi(lang, item.t)}</div>
                    <div className="bullet__text">{bi(lang, item.d)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="kicker kicker--tight">{chrome.howHelps}</div>
            <h2 className="h2 h2--sm" style={{ marginBottom: 26 }}>
              {bi(lang, c.howHelpsTitle)}
            </h2>
            <div className="bullet-list">
              {c.solutions.map((item) => (
                <div key={item.t[0]} className="bullet">
                  <span className="bullet__mark bullet__mark--solution" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <div className="bullet__title">{bi(lang, item.t)}</div>
                    <div className="bullet__text">{bi(lang, item.d)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="bg-white border-top">
        <div className="wrap section--sm">
          <div className="kicker kicker--tight">{chrome.included}</div>
          <h2 className="h2 h2--md" style={{ margin: '0 0 44px', maxWidth: 640 }}>
            {bi(lang, c.scopeTitle)}
          </h2>
          <div className="grid grid--scope">
            {c.scope.map((item) => (
              <div key={item.t[0]} className="card card--scope">
                <div className="card__rule" style={{ marginBottom: 4 }} aria-hidden="true" />
                <div className="card__title card__title--lg">{bi(lang, item.t)}</div>
                <div className="card__text--md">{bi(lang, item.d)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ink">
        <div className="wrap section--sm">
          <div className="kicker kicker--tight kicker--on-dark">{bi(lang, c.timelineKicker)}</div>
          <h2 className="h2 h2--md h2--on-dark" style={{ margin: '0 0 48px', maxWidth: 680 }}>
            {bi(lang, c.processTitle)}
          </h2>
          <ol className="timeline">
            {c.steps.map((step) => (
              <li key={step.n} className="timeline__row">
                <div>
                  <div className="timeline__step">
                    {chrome.step} {step.n}
                  </div>
                  <div className="timeline__time">{bi(lang, step.time)}</div>
                </div>
                <div>
                  <div className="timeline__title">{bi(lang, step.t)}</div>
                  <div className="timeline__text">{bi(lang, step.d)}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-cream">
        <div className="wrap section--sm grid grid--proof">
          <div>
            <div className="kicker kicker--tight">{chrome.credentials}</div>
            <h2 className="h2 h2--sm" style={{ marginBottom: 18 }}>
              {bi(lang, c.proofTitle)}
            </h2>
            <p className="prose" style={{ margin: '0 0 16px' }}>
              {bi(lang, c.proofBody)}
            </p>
            <figure className="quote" style={{ margin: 0 }}>
              <blockquote className="quote__text" style={{ margin: '0 0 10px' }}>
                {bi(lang, c.quote)}
              </blockquote>
              <figcaption className="quote__by">{bi(lang, c.quoteBy)}</figcaption>
            </figure>
          </div>
          <div className="grid grid--tiles">
            {c.proof.map((item) => (
              <div key={item.k[0]} className="proof-tile">
                <div className="proof-tile__value">{bi(lang, item.k)}</div>
                <div className="proof-tile__label">{bi(lang, item.v)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gated lead magnet */}
      <section id="guide" className="panel-maroon panel-maroon--flat">
        <div className="blob blob--cta-left" aria-hidden="true" />
        <div className="wrap section--xs grid grid--proof">
          <div>
            <div className="kicker kicker--tight kicker--on-dark" style={{ marginBottom: 14 }}>
              {chrome.freeDownload}
            </div>
            <h2 className="h2 h2--md h2--on-dark" style={{ margin: '0 0 14px' }}>
              {bi(lang, c.guideTitle)}
            </h2>
            <p style={{ margin: '0 0 22px', fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
              {bi(lang, c.guideBody)}
            </p>
            <div className="check-list">
              {c.guidePoints.map((point) => (
                <div key={point[0]} className="check-list__item">
                  <span className="check-list__mark" aria-hidden="true">
                    ✓
                  </span>
                  {bi(lang, point)}
                </div>
              ))}
            </div>
          </div>
          <LeadMagnetForm
            lang={lang}
            source="service:company-setup"
            submitLabel={bi(lang, c.guideSubmit)}
            sentLabel={bi(lang, c.guideSent)}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="wrap wrap--narrow section--sm">
          <div className="kicker kicker--tight" style={{ textAlign: 'center' }}>
            {chrome.faqKicker}
          </div>
          <h2 className="h2 h2--md" style={{ margin: '0 0 44px', textAlign: 'center' }}>
            {bi(lang, c.faqTitle)}
          </h2>
          <FaqAccordion items={c.faqs.map((faq) => ({ q: bi(lang, faq.q), a: bi(lang, faq.a) }))} />
        </div>
      </section>

      <CtaBand
        lang={lang}
        title={bi(lang, c.ctaTitle)}
        subtitle={bi(lang, c.ctaSub)}
        ctaLabel={bi(lang, c.ctaPrimary)}
        blob="right"
      />
    </>
  );
}
