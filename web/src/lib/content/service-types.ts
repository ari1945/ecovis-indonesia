import type { Lang } from '../i18n';

/** A string pair: [English, Bahasa Indonesia]. */
export type Bi = readonly [string, string];

export type KeyValue = { k: Bi; v: Bi };
export type TitleText = { t: Bi; d: Bi };
export type Step = { n: string; t: Bi; d: Bi };
export type Faq = { q: Bi; a: Bi };

/**
 * The conversion structure every service detail page follows:
 * hero → trust strip → problem/solution → scope → process → proof →
 * gated lead magnet → FAQ → CTA.
 */
export type ServiceContent = {
  slug: string;
  kicker: Bi;
  heroTitle: Bi;
  heroSub: Bi;
  ctaPrimary: Bi;
  ctaSecondary: Bi;

  situationTitle: Bi;
  howHelpsTitle: Bi;
  scopeTitle: Bi;
  processTitle: Bi;
  proofTitle: Bi;
  proofBody: Bi;
  quote: Bi;
  quoteBy: Bi;

  guideTitle: Bi;
  guideBody: Bi;
  guidePoints: readonly Bi[];
  guideSubmit: Bi;
  guideSent: Bi;

  faqTitle: Bi;
  ctaTitle: Bi;
  ctaSub: Bi;

  trust: readonly KeyValue[];
  problems: readonly TitleText[];
  solutions: readonly TitleText[];
  scope: readonly TitleText[];
  steps: readonly Step[];
  proof: readonly KeyValue[];
  faqs: readonly Faq[];
};

/** Labels shared verbatim by every service page. */
export function serviceChrome(lang: Lang) {
  const pick = (en: string, id: string) => (lang === 'id' ? id : en);
  return {
    home: pick('Home', 'Beranda'),
    servicesCrumb: pick('Services', 'Layanan'),
    situation: pick('The situation', 'Situasinya'),
    howHelps: pick('How Ecovis helps', 'Bagaimana Ecovis membantu'),
    included: pick("What's included", 'Yang termasuk'),
    howWeWork: pick('How we work', 'Cara kami bekerja'),
    step: pick('STEP', 'LANGKAH'),
    credentials: pick('Credentials & proof', 'Kredensial & bukti'),
    freeDownload: pick('Free download', 'Unduhan gratis'),
    faqKicker: pick('Frequently asked', 'Sering ditanyakan'),
  };
}
