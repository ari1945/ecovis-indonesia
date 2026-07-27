/**
 * One-off codemod: rewrite `t(lang, ...pair)` to `bi(lang, pair)`.
 *
 * Mapping over an `as const` content array widens each element to a union of
 * tuple types, which TypeScript will not let us spread. `bi()` takes the pair
 * as a single argument instead.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry.name)) files.push(full);
  }
})('src');

const CALL = /\bt\(lang, \.\.\.([A-Za-z_$][\w$]*(?:\.[\w$]+|\[[^[\]]*\])*)\)/g;
const IMPORT = /import \{([^}]*)\} from '@\/lib\/i18n';/;

let changed = 0;
for (const file of files) {
  const original = readFileSync(file, 'utf8');
  let source = original.replace(CALL, 'bi(lang, $1)');
  if (source === original) continue;

  if (!/\bbi\b/.test(source.match(IMPORT)?.[1] ?? '')) {
    source = source.replace(IMPORT, (_m, names) => `import { bi,${names}} from '@/lib/i18n';`);
  }
  writeFileSync(file, source);
  changed += 1;
}
console.log(`rewrote ${changed} files`);
