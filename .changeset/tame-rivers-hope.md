---
'wode-ui': patch
---

Fix a CJS/ESM interop bug where `dist/index.mjs` crashed at import time in environments without a global `require` (e.g. plain Node ESM, SSR). The crash came from `use-sync-external-store` (a transitive dependency of `@base-ui/react`) being bundled into the ESM output instead of left external.
