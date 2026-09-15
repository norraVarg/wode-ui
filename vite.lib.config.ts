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
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
