import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import { bi, t, type Lang } from '@/lib/i18n';
import { serviceChrome, type ServiceContent } from '@/lib/content/service-types';

/**
 * Nine of the ten service pages share a byte-identical layout in the design
 * prototype, so they render through this one component and differ only by data.
 * (Company setup has its own timeline variant.)
 */
export default function ServicePage({ lang, content }: { lang: Lang; content: ServiceContent }) {
  const chrome = serviceChrome(lang);
  const kicker = bi(lang, content.kicker);

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
            <span className="breadcrumb__current">{kicker}</span>
          </nav>
          <div className="kicker kicker--tight kicker--on-dark" style={{ marginBottom: 18 }}>
            {kicker}
          </div>
          <h1 className="h1 h1--service">{bi(lang, content.heroTitle)}</h1>
          <p className="lede lede--service">{bi(lang, content.heroSub)}</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href={`/${lang}/contact`} className="btn btn--white">
              {bi(lang, content.ctaPrimary)}
            </Link>
            <a href="#guide" className="btn btn--ghost">
              {bi(lang, content.ctaSecondary)}
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-bottom">
        <div className="wrap grid grid--trust" style={{ paddingBlock: 34 }}>
          {content.trust.map((item) => (
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
              {bi(lang, content.situationTitle)}
            </h2>
            <div className="bullet-list">
              {content.problems.map((item) => (
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
              {bi(lang, content.howHelpsTitle)}
            </h2>
            <div className="bullet-list">
              {content.solutions.map((item) => (
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
            {bi(lang, content.scopeTitle)}
          </h2>
          <div className="grid grid--scope">
            {content.scope.map((item) => (
              <div key={item.t[0]} className="card card--scope">
                <div className="card__rule" style={{ marginBottom: 4 }} aria-hidden="true" />
                <div className="card__title card__title--lg">{bi(lang, item.t)}</div>
                <div className="card__text--md">{bi(lang, item.d)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink">
        <div className="wrap section--sm">
          <div className="kicker kicker--tight kicker--on-dark">{chrome.howWeWork}</div>
          <h2 className="h2 h2--md h2--on-dark" style={{ margin: '0 0 48px', maxWidth: 680 }}>
            {bi(lang, content.processTitle)}
          </h2>
          <div className="grid grid--steps">
            {content.steps.map((step) => (
              <div key={step.n} className="step">
                <div className="step__n">
                  {chrome.step} {step.n}
                </div>
                <div className="step__title">{bi(lang, step.t)}</div>
                <div className="step__text">{bi(lang, step.d)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-cream">
        <div className="wrap section--sm grid grid--proof">
          <div>
            <div className="kicker kicker--tight">{chrome.credentials}</div>
            <h2 className="h2 h2--sm" style={{ marginBottom: 18 }}>
              {bi(lang, content.proofTitle)}
            </h2>
            <p className="prose" style={{ margin: '0 0 16px' }}>
              {bi(lang, content.proofBody)}
            </p>
            <figure className="quote" style={{ margin: 0 }}>
              <blockquote className="quote__text" style={{ margin: '0 0 10px' }}>
                {bi(lang, content.quote)}
              </blockquote>
              <figcaption className="quote__by">{bi(lang, content.quoteBy)}</figcaption>
            </figure>
          </div>
          <div className="grid grid--tiles">
            {content.proof.map((item) => (
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
              {bi(lang, content.guideTitle)}
            </h2>
            <p style={{ margin: '0 0 22px', fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65 }}>
              {bi(lang, content.guideBody)}
            </p>
            <div className="check-list">
              {content.guidePoints.map((point) => (
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
            source={`service:${content.slug}`}
            submitLabel={bi(lang, content.guideSubmit)}
            sentLabel={bi(lang, content.guideSent)}
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
            {bi(lang, content.faqTitle)}
          </h2>
          <FaqAccordion
            items={content.faqs.map((faq) => ({ q: bi(lang, faq.q), a: bi(lang, faq.a) }))}
          />
        </div>
      </section>

      <CtaBand
        lang={lang}
        title={bi(lang, content.ctaTitle)}
        subtitle={bi(lang, content.ctaSub)}
        ctaLabel={bi(lang, content.ctaPrimary)}
        blob="right"
      />
    </>
  );
}
