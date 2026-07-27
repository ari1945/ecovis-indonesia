/**
 * One-off migration helper.
 *
 * The design prototypes express every page as a `renderVals()` method that
 * returns fully-resolved copy for one language at a time. Rather than
 * hand-transcribing that copy (and risking drift), this script evaluates each
 * prototype's logic class twice — once with lang EN, once with ID — and zips
 * the two results into typed `ServiceContent` modules.
 *
 * Run: node scripts/extract-services.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PROTOTYPES = join(here, '..', '..', 'project');
const OUT = join(here, '..', 'src', 'lib', 'content', 'services');

/** Prototype file → { slug, exportName } */
const PAGES = [
  { file: 'Audit', slug: 'audit', exportName: 'audit' },
  { file: 'Tax', slug: 'tax', exportName: 'tax' },
  { file: 'Accounting', slug: 'accounting', exportName: 'accounting' },
  { file: 'Payroll', slug: 'payroll', exportName: 'payroll' },
  { file: 'Advisory', slug: 'advisory', exportName: 'advisory' },
  { file: 'CorporateFinance', slug: 'corporate-finance', exportName: 'corporateFinance' },
  { file: 'TransferPricing', slug: 'transfer-pricing', exportName: 'transferPricing' },
  { file: 'ESG', slug: 'esg', exportName: 'esg' },
  { file: 'DigitalSolutions', slug: 'digital-solutions', exportName: 'digitalSolutions' },
];

/** Minimal stand-in for the prototype runtime's logic base class. */
class DCLogic {
  constructor(props = {}) {
    this.props = props;
  }
  setState() {}
}

function evaluatePage(file, lang) {
  const source = readFileSync(join(PROTOTYPES, `${file}.dc.html`), 'utf8');
  const match = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`No logic script found in ${file}`);

  const factory = new Function('DCLogic', `${match[1]}\n;return Component;`);
  const Component = factory(DCLogic);
  const instance = new Component({});
  // renderVals() reads these directly; `openFaq: 0` matches the prototype default.
  instance.state = { ...instance.state, lang, openFaq: 0, consent: false, sent: false };
  return instance.renderVals();
}

const q = (value) => JSON.stringify(String(value));
const pair = (en, id) => `[${q(en)}, ${q(id)}]`;

function biList(enList, idList, keys) {
  const rows = enList.map((enItem, i) => {
    const idItem = idList[i] ?? enItem;
    const body = keys
      .map((key) => (key === 'n' ? `n: ${q(enItem.n)}` : `${key}: ${pair(enItem[key], idItem[key])}`))
      .join(', ');
    return `    { ${body} },`;
  });
  return rows.join('\n');
}

for (const page of PAGES) {
  const en = evaluatePage(page.file, 'EN');
  const id = evaluatePage(page.file, 'ID');

  // The submit label flips to a "sent" message; re-evaluate with sent:true to
  // capture the confirmation copy the prototype shows after submission.
  const sentEn = (() => {
    const source = readFileSync(join(PROTOTYPES, `${page.file}.dc.html`), 'utf8');
    const match = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
    const Component = new Function('DCLogic', `${match[1]}\n;return Component;`)(DCLogic);
    const instance = new Component({});
    instance.state = { ...instance.state, lang: 'EN', openFaq: 0, consent: true, sent: true };
    return instance.renderVals().submitLabel;
  })();
  const sentId = (() => {
    const source = readFileSync(join(PROTOTYPES, `${page.file}.dc.html`), 'utf8');
    const match = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
    const Component = new Function('DCLogic', `${match[1]}\n;return Component;`)(DCLogic);
    const instance = new Component({});
    instance.state = { ...instance.state, lang: 'ID', openFaq: 0, consent: true, sent: true };
    return instance.renderVals().submitLabel;
  })();

  const out = `// Generated from the design prototype project/${page.file}.dc.html
// by scripts/extract-services.mjs — copy is verbatim from the approved design.
import type { ServiceContent } from '../service-types';

export const ${page.exportName}: ServiceContent = {
  slug: ${q(page.slug)},
  kicker: ${pair(en.tKicker, id.tKicker)},
  heroTitle: ${pair(en.tHeroTitle, id.tHeroTitle)},
  heroSub: ${pair(en.tHeroSub, id.tHeroSub)},
  ctaPrimary: ${pair(en.tCtaPrimary, id.tCtaPrimary)},
  ctaSecondary: ${pair(en.tCtaSecondary, id.tCtaSecondary)},

  situationTitle: ${pair(en.tSituationTitle, id.tSituationTitle)},
  howHelpsTitle: ${pair(en.tHowHelpsTitle, id.tHowHelpsTitle)},
  scopeTitle: ${pair(en.tScopeTitle, id.tScopeTitle)},
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
${biList(en.steps, id.steps, ['n', 't', 'd'])}
  ],

  proof: [
${biList(en.proof, id.proof, ['k', 'v'])}
  ],

  faqs: [
${en.faqs.map((faq, i) => `    { q: ${pair(faq.q, id.faqs[i].q)}, a: ${pair(faq.a, id.faqs[i].a)} },`).join('\n')}
  ],
};
`;

  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, `${page.slug}.ts`), out, 'utf8');
  console.log(`wrote ${page.slug}.ts  (${en.faqs.length} faqs, ${en.scope.length} scope items)`);
}
