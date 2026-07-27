/**
 * Extracts the Admin console's mock dataset from the design prototype.
 *
 * The prototype seeds all its demo content in the logic class constructor, so
 * we instantiate it and serialise the resulting state. Presentation-only fields
 * the prototype precomputed (avatar background colours, etc.) are kept, since
 * the admin UI genuinely uses them as data.
 *
 * Run: node scripts/extract-admin.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PROTOTYPE = join(here, '..', '..', 'project', 'Admin.dc.html');
const OUT = join(here, '..', 'src', 'lib', 'admin', 'seed.ts');

class DCLogic {
  constructor(props = {}) {
    this.props = props;
  }
  setState() {}
}

const source = readFileSync(PROTOTYPE, 'utf8');
const match = source.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
const Component = new Function('DCLogic', `${match[1]}\n;return Component;`)(DCLogic);
const instance = new Component({});

const { state } = instance;

// Collections we carry over as the seeded demo dataset.
const COLLECTIONS = [
  'leads',
  'articles',
  'pageList',
  'resources',
  'services',
  'industries',
  'jobs',
  'media',
  'subscribers',
  'team',
  'integrations',
  'aiProviders',
  'users',
];

const picked = Object.fromEntries(COLLECTIONS.map((key) => [key, state[key]]));

const json = (value) => JSON.stringify(value, null, 2).replace(/\n/g, '\n');

const out = `// Generated from the design prototype project/Admin.dc.html
// by scripts/extract-admin.mjs — mock data, verbatim from the approved design.
//
// This is demo content for a UX prototype. It lives in memory and resets on
// reload; the design bundle's Blueprint (section 09) recommends an
// off-the-shelf CMS + CRM rather than building this backend from scratch.

export const STAGES = ${json(instance.STAGE_META ?? {})} as const;

export const OWNERS = ${json(instance.OWNERS ?? [])};

export const SERVICE_NAMES = ${json(instance.SERVICE_NAMES ?? [])};

export const ROLE_OPTIONS = ${json(instance.ROLE_OPTIONS ?? [])};

export const RESOURCE_TYPES = ${json(instance.RES_TYPES ?? [])};

export const BLOCK_PALETTE = ${json(instance._blockPalette ?? [])};

export const SEO_DEFAULTS = ${json(state.seo ?? {})};

export const SEED = ${json(picked)};
`;

writeFileSync(OUT, out, 'utf8');
console.log(
  `wrote admin/seed.ts — ${COLLECTIONS.map((k) => `${k}:${picked[k]?.length ?? 0}`).join(', ')}`,
);
