/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/components/**/*.story.tsx',
  addons: {
    theme: { enabled: true, defaultState: 'light' },
    a11y: { enabled: true },
  },
};
