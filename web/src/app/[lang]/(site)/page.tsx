import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import { ARTICLES, categoryLabel } from '@/lib/content/articles';
import { homeContent } from '@/lib/content/home';
import { bi, isLang, type Lang } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const c = homeContent(lang);
  const featured = ARTICLES.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="panel-maroon">
        <div className="blob blob--hero-a" aria-hidden="true" />
        <div className="blob blob--hero-b" aria-hidden="true" />
        <div className="hero-rule hero-rule--a" aria-hidden="true" />
        <div className="hero-rule hero-rule--b" aria-hidden="true" />
        <div
          className="wrap"
          style={{ paddingBlock: 'clamp(64px,8vw,110px) clamp(72px,9vw,120px)' }}
        >
          <div className="kicker kicker--hero">{c.kicker}</div>
          <h1 className="h1">{c.heroTitle}</h1>
          <p className="lede">{c.heroSub}</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href={`/${lang}/contact`} className="btn btn--white">
              {c.cta}
            </Link>
            <Link href={`/${lang}/services`} className="btn btn--ghost">
              {c.explore}
            </Link>
          </div>
        </div>
      </section>

      {/* Network & Indonesia figures */}
      <section className="bg-white border-bottom">
        <div className="wrap grid grid--stats" style={{ paddingBlock: '56px 20px' }}>
          {c.stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="wrap" style={{ paddingBottom: 28 }}>
          <p className="source-note">{c.statsSource}</p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream">
        <div className="wrap section">
          <div className="sec-head">
            <div>
              <div className="kicker">{c.servicesKicker}</div>
              <h2 className="h2">{c.servicesTitle}</h2>
            </div>
            <Link href={`/${lang}/services`} className="link-arrow">
              {c.allServices} →
            </Link>
          </div>
          <div className="grid grid--services">
            {c.services.map((service) => (
              <Link key={service.href} href={service.href} className="card card--service">
                <div className="card__rule" aria-hidden="true" />
                <div className="card__title">{service.name}</div>
                <div className="card__text">{service.blurb}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white">
        <div className="wrap section">
          <div className="sec-head sec-head--tight">
            <div>
              <div className="kicker">{c.indKicker}</div>
              <h2 className="h2">{c.indTitle}</h2>
            </div>
            <Link href={`/${lang}/industries`} className="link-arrow">
              {c.allIndustries} →
            </Link>
          </div>
          <div className="grid grid--industries">
            {c.industries.map((industry) => (
              <Link key={industry.href} href={industry.href} className="row-link">
                <span>{industry.name}</span>
                <span className="row-link__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Indonesia */}
      <section className="bg-ink">
        <div
          className="wrap grid grid--split"
          style={{ paddingBlock: 'clamp(56px,8vw,96px)' }}
        >
          <div>
            <div className="kicker kicker--on-dark">{c.whyIdKicker}</div>
            <h2 className="h2 h2--on-dark" style={{ marginBottom: 20, lineHeight: 1.15 }}>
              {c.whyIdTitle}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-200)', margin: '0 0 18px' }}>
              {c.whyIdP1}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--on-dark-200)', margin: '0 0 32px' }}>
              {c.whyIdP2}
            </p>
            <Link href={`/${lang}/resources`} className="link-underline">
              {c.whyIdLink} →
            </Link>
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {c.idStats.map((stat) => (
              <div key={stat.value} className="stat-tile">
                <div className="stat-tile__value">{stat.value}</div>
                <div className="stat-tile__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ecovis */}
      <section className="bg-white">
        <div className="wrap section">
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <div className="kicker">{c.whyEcKicker}</div>
            <h2 className="h2">{c.whyEcTitle}</h2>
          </div>
          <div className="grid grid--why">
            {c.whyPoints.map((point) => (
              <div key={point.num} className="why-point">
                <div className="why-point__num">{point.num}</div>
                <div className="why-point__title">{point.title}</div>
                <div className="why-point__text">{point.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-cream">
        <div className="wrap section">
          <div className="sec-head">
            <div>
              <div className="kicker">{c.insKicker}</div>
              <h2 className="h2">{c.insTitle}</h2>
            </div>
            <Link href={`/${lang}/insights`} className="link-arrow">
              {c.allInsights} →
            </Link>
          </div>
          <div className="grid grid--articles">
            {featured.map((article) => (
              <Link
                key={article.slug}
                href={`/${lang}/insights/${article.slug}`}
                className="card card--article"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <span className="tag">{categoryLabel(lang, article.category)}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-500)' }}>{article.date}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, lineHeight: 1.3, textWrap: 'pretty' }}>
                  {bi(lang, article.title)}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-600)', lineHeight: 1.55 }}>
                  {bi(lang, article.excerpt)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} title={c.ctaTitle} subtitle={c.ctaSub} ctaLabel={c.cta} blob="left" />
    </>
  );
}
