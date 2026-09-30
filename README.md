# wode-ui

A mobile-first React component library built on [Base UI](https://base-ui.com/) and Tailwind CSS, with built-in light/dark theming.

**[Browse the component demo →](https://norravarg.github.io/wode-ui/)**

## Installation

```bash
pnpm add wode-ui
```

`react` and `react-dom` (^19) are peer dependencies — install them if your project doesn't already have them.

### Set up styles

wode-ui ships pre-built Tailwind CSS. Import the stylesheet once, e.g. in your app's entry point:

```ts
import 'wode-ui/styles.css';
```

### Scan wode-ui's classes with your own Tailwind build

wode-ui's components ship as compiled JavaScript with Tailwind utility classes baked into them. If your app also uses Tailwind CSS v4, you need to tell your own Tailwind build to scan wode-ui's output, or those classes won't exist in your app's generated CSS. Add this to your app's Tailwind entry CSS file:

```css
@source '../node_modules/wode-ui/dist/**/*.{js,mjs}';
```

(adjust the relative path to wherever `node_modules` actually sits relative to that CSS file). Skipping this step is the most common way to end up with components that render with no styling at all.

### Wrap your app in `ThemeProvider`

```tsx
import { ThemeProvider } from 'wode-ui';

function App() {
  return <ThemeProvider defaultMode="system">{/* your app */}</ThemeProvider>;
}
```

`defaultMode` accepts `'light'`, `'dark'`, or `'system'` (the default) — `'system'` follows the OS color-scheme preference and updates live. The resolved theme is applied via a `data-theme` attribute on `<html>`; the user's explicit choice (if they set one via `useTheme`) persists across sessions in `localStorage`.

```tsx
import { useTheme } from 'wode-ui';

function ThemeToggle() {
  const { mode, resolvedTheme, setMode } = useTheme();
  return (
    <button onClick={() => setMode(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}
```

### Use a component

```tsx
import { Button } from 'wode-ui';

<Button variant="solid">Click me</Button>;
```

Every component is documented, with every variant, in the [live demo](https://norravarg.github.io/wode-ui/).

## Stack

- React 19 + TypeScript
- Tailwind CSS v4 for styling, with a semantic token-based theming system
- [Base UI](https://base-ui.com/) for accessible, unstyled component primitives
- [Ladle](https://ladle.dev/) for the component workshop/demo
- Jest for unit tests, Playwright for component tests
- Vite for the library build
- [Changesets](https://github.com/changesets/changesets) for versioning and publishing

## License

MIT
