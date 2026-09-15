import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Shared dev config, reused by both the Playwright CT gallery's webServer
// and Ladle - so Tailwind/React work the same way in both dev surfaces.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
