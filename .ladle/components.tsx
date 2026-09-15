import type { GlobalProvider } from '@ladle/react';
import { ThemeProvider } from '../src/theme';
import '../dev.css';

// key={globalState.theme} forces a remount when Ladle's own theme toggle
// changes, so the preview reflects it immediately. A dedicated storageKey
// keeps this separate from anything a real consumer app would persist.
export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ThemeProvider
    key={globalState.theme}
    defaultMode={globalState.theme}
    storageKey="wode-ui-ladle-preview-theme"
  >
    {children}
  </ThemeProvider>
);
