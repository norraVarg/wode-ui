import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/**/*.story.tsx',
        'src/**/*.ct.spec.tsx',
      ],
      bundleTypes: true,
      insertTypesEntry: true,
    }),
    // src/styles/** ships raw and unprocessed - consumers' own Tailwind
    // build is what actually compiles these into real CSS (see README).
    // stripBase must be a fixed count (2 = "src", "styles"), not `true` -
    // `true` computes strip-depth per matched file, which over-strips
    // nested files like themes/dark.css and silently drops their subfolder.
    viteStaticCopy({
      targets: [{ src: 'src/styles/**/*', dest: 'styles', rename: { stripBase: 2 } }],
    }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'WodeUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      // use-sync-external-store is a transitive dependency of @base-ui/react
      // (its CJS-only `/shim` entry does `require('react')` at module-eval
      // time). Left un-externalized, Rolldown inlines that CJS source
      // straight into dist/index.mjs and wraps the require() call in a
      // synthetic shim that throws under real ESM: "Calling `require` for
      // 'react' in an environment that doesn't expose the `require`
      // function." Externalizing it here (both the bare specifier and the
      // /shim subpath) stops it from being inlined at all - see the
      // "dependencies" entry in package.json for why it also has to be
      // declared there (pnpm won't let this package resolve a bare import
      // to a dependency it doesn't declare itself, even one physically
      // installed via @base-ui/react). Radix UI hit the identical bug in
      // an identical Vite/Rolldown setup:
      // https://github.com/radix-ui/primitives/issues/3856
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'use-sync-external-store',
        /^use-sync-external-store\//,
      ],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
