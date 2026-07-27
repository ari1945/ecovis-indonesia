/**
 * Extracts copy from the remaining design prototypes.
 *
 * Same technique as extract-services.mjs: evaluate each prototype's logic class
 * once per language, then zip matching English/Indonesian strings into
 * `[en, id]` pairs. Interaction-only values the prototype computed inline
 * (background colours, open/closed icons, click handlers) are dropped — those
 * are the React component's job now.
 *
 * Run: node scripts/extract-pages.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PROTOTYPES = join(here, '..', '..', 'project');
const OUT = join(here, '..', 'src', 'lib', 'content', 'pages');

/** Presentation state the prototype computed inline; not content. */
const DROP_KEYS = new Set([
  'bg', 'display', 'icon', 'toggle', 'select', 'border', 'color',
  'submitBg', 'submitCursor', 'submitDisabled', 'consent', 'onConsent', 'submit',
  'anchor', 'hasDetail', 'detailHref', 'href', 'slug', 'tag', 'tagLabel',
  'isHeading', 'isPara', 'isQuote', 'isList',
]);

class DCLogic {
  constructor(props = {}) {
    this.props = props;
  }
  setState() {}
}

function loadComponent(file) {
  const source = readFileSync(join(PROTOTYPES, `${file}.dc.html`), 'utf8');
  const match = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`No logic script in ${file}`);
  return new Function('DCLogic', `${match[1]}\n;return Component;`)(DCLogic);
}

function evaluate(file, lang, stateOverrides = {}) {
  const Component = loadComponent(file);
  const instance = new Component({});
  instance.state = { ...instance.state, lang, ...stateOverrides };
  return instance.renderVals();
}

/** Recursively pair English and Indonesian values. */
function zip(en, id) {
  if (typeof en === 'string') return { __bi: [en, typeof id === 'string' ? id : en] };
  if (typeof en === 'number' || typeof en === 'boolean' || en == null) return en;
  if (typeof en === 'function') return undefined;
  if (Array.isArray(en)) {
    return en.map((item, i) => zip(item, Array.isArray(id) ? id[i] : undefined)).filter((v) => v !== undefined);
  }
  if (typeof en === 'object') {
    const out = {};
    for (const [key, value] of Object.entries(en)) {
      if (DROP_KEYS.has(key)) continue;
      const zipped = zip(value, id && typeof id === 'object' ? id[key] : undefined);
      if (zipped !== undefined) out[key] = zipped;
    }
    return out;
  }
  return undefined;
}

/** Render the zipped tree as a TypeScript literal. */
function emit(node, indent = 2) {
  const pad = ' '.repeat(indent);
  const padIn = ' '.repeat(indent + 2);

  if (node && typeof node === 'object' && '__bi' in node) {
    return `[${JSON.stringify(node.__bi[0])}, ${JSON.stringify(node.__bi[1])}]`;
  }
  if (Array.isArray(node)) {
    if (node.length === 0) return '[]';
    return `[\n${node.map((item) => `${padIn}${emit(item, indent + 2)},`).join('\n')}\n${pad}]`;
  }
  if (node && typeof node === 'object') {
    const entries = Object.entries(node);
    if (entries.length === 0) return '{}';
    return `{\n${entries
      .map(([key, value]) => `${padIn}${JSON.stringify(key)}: ${emit(value, indent + 2)},`)
      .join('\n')}\n${pad}}`;
  }
  return JSON.stringify(node);
}

const PAGES = [
  { file: 'Services', name: 'services' },
  { file: 'About', name: 'about' },
  { file: 'Industries', name: 'industries' },
  { file: 'Insights', name: 'insights' },
  { file: 'Resources', name: 'resources' },
  { file: 'Careers', name: 'careers' },
  { file: 'Contact', name: 'contact' },
  { file: 'PrivacyPolicy', name: 'privacy' },
  { file: 'ThankYou', name: 'thankYou' },
  { file: 'NotFound', name: 'notFound' },
  { file: 'GuideLanding', name: 'guideLanding' },
];

mkdirSync(OUT, { recursive: true });

for (const page of PAGES) {
  const en = evaluate(page.file, 'EN');
  const id = evaluate(page.file, 'ID');
  const zipped = zip(en, id);

  const body = `// Generated from the design prototype project/${page.file}.dc.html
// by scripts/extract-pages.mjs — copy is verbatim from the approved design.
// Each [a, b] pair is [English, Bahasa Indonesia]; read with t(lang, ...pair).

export const ${page.name} = ${emit(zipped)} as const;
`;

  writeFileSync(join(OUT, `${page.name}.ts`), body, 'utf8');
  console.log(`wrote pages/${page.name}.ts (${Object.keys(zipped).length} keys)`);
}
