/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/components/**/*.story.tsx',
  // GitHub Pages serves this as a project site under /wode-ui/, not the
  // domain root - without this, the built index.html references
  // /assets/... instead of /wode-ui/assets/..., 404ing every asset.
  base: '/wode-ui/',
  addons: {
    theme: { enabled: true, defaultState: 'light' },
    a11y: { enabled: true },
  },
};
