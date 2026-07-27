/**
 * Companion to extract-services.mjs for the one service page that does not
 * share the common template: PT PMA establishment renders its process as a
 * vertical timeline with per-stage durations.
 *
 * Run: node scripts/extract-company-setup.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PROTOTYPE = join(here, '..', '..', 'project', 'CompanySetup.dc.html');
const OUT = join(here, '..', 'src', 'lib', 'content', 'company-setup.ts');

class DCLogic {
  constructor(props = {}) {
    this.props = props;
  }
  setState() {}
}

const source = readFileSync(PROTOTYPE, 'utf8');
const match = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
const Component = new Function('DCLogic', `${match[1]}\n;return Component;`)(DCLogic);

function evaluate(lang, extra = {}) {
  const instance = new Component({});
  instance.state = { ...instance.state, lang, openFaq: 0, consent: false, sent: false, ...extra };
  return instance.renderVals();
}

const en = evaluate('EN');
const id = evaluate('ID');
const sentEn = evaluate('EN', { consent: true, sent: true }).submitLabel;
const sentId = evaluate('ID', { consent: true, sent: true }).submitLabel;

const q = (value) => JSON.stringify(String(value));
const pair = (a, b) => `[${q(a)}, ${q(b)}]`;

const biList = (enList, idList, keys) =>
  enList
    .map((item, i) => {
      const other = idList[i] ?? item;
      const body = keys
        .map((key) => (key === 'n' ? `n: ${q(item.n)}` : `${key}: ${pair(item[key], other[key])}`))
        .join(', ');
      return `    { ${body} },`;
    })
    .join('\n');

const out = `// Generated from the design prototype project/CompanySetup.dc.html
// by scripts/extract-company-setup.mjs — copy is verbatim from the approved design.
import type { Bi, Faq, KeyValue, TitleText } from './service-types';

/** PT PMA establishment: same conversion structure, but a dated timeline. */
export type TimelineStep = { n: string; time: Bi; t: Bi; d: Bi };

export type CompanySetupContent = {
  slug: string;
  crumbLast: Bi;
  kicker: Bi;
  heroTitle: Bi;
  heroSub: Bi;
  ctaPrimary: Bi;
  ctaSecondary: Bi;
  situationTitle: Bi;
  howHelpsTitle: Bi;
  scopeTitle: Bi;
  timelineKicker: Bi;
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
  steps: readonly TimelineStep[];
  proof: readonly KeyValue[];
  faqs: readonly Faq[];
};

export const companySetup: CompanySetupContent = {
  slug: "company-setup",
  crumbLast: ${pair(en.tCrumbLast, id.tCrumbLast)},
  kicker: ${pair(en.tKicker, id.tKicker)},
  heroTitle: ${pair(en.tHeroTitle, id.tHeroTitle)},
  heroSub: ${pair(en.tHeroSub, id.tHeroSub)},
  ctaPrimary: ${pair(en.tCtaPrimary, id.tCtaPrimary)},
  ctaSecondary: ${pair(en.tCtaSecondary, id.tCtaSecondary)},

  situationTitle: ${pair(en.tSituationTitle, id.tSituationTitle)},
  howHelpsTitle: ${pair(en.tHowHelpsTitle, id.tHowHelpsTitle)},
  scopeTitle: ${pair(en.tScopeTitle, id.tScopeTitle)},
  timelineKicker: ${pair(en.tTimelineKicker, id.tTimelineKicker)},
  processTitle: ${pair(en.tProcessTitle, id.tProcessTitle)},
  proofTitle: ${pair(en.tProofTitle, id.tProofTitle)},
  proofBody: ${pair(en.tProofBody, id.tProofBody)},
  quote: ${pair(en.tQuote, id.tQuote)},
  quoteBy: ${pair(en.tQuoteBy, id.tQuoteBy)},

  guideTitle: ${pair(en.tGuideTitle, id.tGuideTitle)},
  guideBody: ${pair(en.tGuideBody, id.tGuideBody)},
  guidePoints: [
${en.guidePoints.map((point, i) => `    ${pair(point, id.guidePoints[i])},`).join('\n')}
  ],
  guideSubmit: ${pair(en.submitLabel, id.submitLabel)},
  guideSent: ${pair(sentEn, sentId)},

  faqTitle: ${pair(en.tFaqTitle, id.tFaqTitle)},
  ctaTitle: ${pair(en.tCtaTitle, id.tCtaTitle)},
  ctaSub: ${pair(en.tCtaSub, id.tCtaSub)},

  trust: [
${biList(en.trust, id.trust, ['k', 'v'])}
  ],

  problems: [
${biList(en.problems, id.problems, ['t', 'd'])}
  ],

  solutions: [
${biList(en.solutions, id.solutions, ['t', 'd'])}
  ],

  scope: [
${biList(en.scope, id.scope, ['t', 'd'])}
  ],

  steps: [
${biList(en.steps, id.steps, ['n', 'time', 't', 'd'])}
  ],

  proof: [
${biList(en.proof, id.proof, ['k', 'v'])}
  ],

  faqs: [
${en.faqs.map((faq, i) => `    { q: ${pair(faq.q, id.faqs[i].q)}, a: ${pair(faq.a, id.faqs[i].a)} },`).join('\n')}
  ],
};
`;

writeFileSync(OUT, out, 'utf8');
console.log(`wrote company-setup.ts (${en.steps.length} timeline steps, ${en.faqs.length} faqs)`);
