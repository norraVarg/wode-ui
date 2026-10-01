// Verifies the built dist/ output is complete and actually importable - not
// just that `vite build` exited 0. Source-level tests (Jest, Playwright CT)
// never touch this output at all: they compile src/ directly through a dev
// server, so a bug specific to the library's Rollup build (misconfigured
// externals, broken CJS/ESM interop, tree-shaking removing something it
// shouldn't) can pass every other check while still shipping broken - which
// is exactly what happened to wode-ui@0.1.1 (published with an empty dist/,
// undetected by any test).
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, statSync } from 'node:fs';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);

const expectedFiles = [
  'dist/index.mjs',
  'dist/index.cjs',
  'dist/index.d.ts',
  'dist/styles/index.css',
  'dist/styles/tokens.css',
  'dist/styles/themes/dark.css',
];

for (const file of expectedFiles) {
  assert.ok(existsSync(file), `expected build output missing: ${file}`);
  assert.ok(statSync(file).size > 0, `build output is empty: ${file}`);
}

// A representative sample, not every export - a broken build (misconfigured
// externals, tree-shaking gone wrong) breaks the whole bundle uniformly, so
// this is just as effective as checking all ~20 components while staying
// low-maintenance as the component set grows.
const esm = await import('../dist/index.mjs');
for (const name of ['ThemeProvider', 'useTheme', 'Button', 'KNOWN_THEMES']) {
  assert.ok(esm[name] !== undefined, `dist/index.mjs is missing export: ${name}`);
}

const cjs = require('../dist/index.cjs');
assert.ok(cjs.Button !== undefined, 'dist/index.cjs is missing a Button export');

// Prove both builds don't just export a reference to something - render each
// for real, through the actual external React resolved from node_modules,
// the same way a real consumer app would.
for (const [label, mod] of [
  ['dist/index.mjs', esm],
  ['dist/index.cjs', cjs],
]) {
  const html = renderToStaticMarkup(React.createElement(mod.Button, { children: 'smoke test' }));
  assert.ok(
    html.includes('smoke test'),
    `rendering Button from ${label} produced unexpected output`,
  );
}

console.log('Build smoke test passed: dist/ is complete and importable.');
