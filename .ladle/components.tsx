import type { GlobalProvider } from '@ladle/react';
import { ThemeState } from '@ladle/react';
import { ThemeProvider } from '../src/theme';
import type { ThemeMode } from '../src/theme';
import '../dev.css';

// Ladle's ThemeState is a nominal enum, not our ThemeMode union - and its
// third value is "auto", not "system", so this is a real mapping, not just
// a cast: passing "auto" straight through would silently break ThemeProvider.
function toThemeMode(theme: ThemeState): ThemeMode {
  switch (theme) {
    case ThemeState.Light:
      return 'light';
    case ThemeState.Dark:
      return 'dark';
    case ThemeState.Auto:
      return 'system';
  }
}

// key={globalState.theme} forces a remount when Ladle's own theme toggle
// changes, so the preview reflects it immediately. A dedicated storageKey
// keeps this separate from anything a real consumer app would persist.
export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ThemeProvider
    key={globalState.theme}
    defaultMode={toThemeMode(globalState.theme)}
    storageKey="wode-ui-ladle-preview-theme"
  >
    {children}
  </ThemeProvider>
);
