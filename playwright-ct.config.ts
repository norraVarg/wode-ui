import { defineConfig, devices } from '@playwright/test';

const PORT = 5183;
const GALLERY_URL = `http://localhost:${PORT}/tests/ct/gallery/index.html`;

export default defineConfig({
  projects: [
    {
      name: 'components',
      testDir: './src/components',
      testMatch: '**/*.ct.spec.tsx',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: GALLERY_URL,
        serviceWorkers: 'block',
        reuseContext: true,
      },
    },
  ],
  webServer: {
    command: `pnpm exec vite --config vite.config.ts --port ${PORT} --strictPort`,
    url: GALLERY_URL,
    reuseExistingServer: !process.env.CI,
  },
});
