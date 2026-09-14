import * as React from 'react';
import type { ThemeContextValue, ThemeMode, ThemeName } from './types';

const DEFAULT_STORAGE_KEY = 'wode-ui-theme';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function parseMode(value: string | null): ThemeMode | null {
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

function subscribeToSystemTheme(onChange: () => void) {
  const mql = window.matchMedia(DARK_MEDIA_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

function getSystemThemeSnapshot(): ThemeName {
  return window.matchMedia(DARK_MEDIA_QUERY).matches ? 'dark' : 'light';
}

function getSystemThemeServerSnapshot(): ThemeName {
  return 'light';
}

/** Tracks the OS color-scheme preference via useSyncExternalStore - SSR-safe by construction. */
function useSystemTheme(): ThemeName {
  return React.useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot,
  );
}

/**
 * Tracks the persisted theme mode via useSyncExternalStore rather than an
 * effect + setState - this is what makes the SSR/hydration story correct
 * without ever needing to call setState synchronously inside an effect.
 */
function useStoredMode(
  storageKey: string,
  fallback: ThemeMode,
): [ThemeMode, (mode: ThemeMode) => void] {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey) onChange();
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    },
    [storageKey],
  );

  const getSnapshot = React.useCallback((): ThemeMode => {
    try {
      return parseMode(window.localStorage.getItem(storageKey)) ?? fallback;
    } catch {
      // localStorage can throw in private browsing / disabled-storage contexts.
      return fallback;
    }
  }, [storageKey, fallback]);

  const getServerSnapshot = React.useCallback((): ThemeMode => fallback, [fallback]);

  const mode = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setMode = React.useCallback(
    (next: ThemeMode) => {
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Ignore - persistence is a nice-to-have, not required for correctness.
      }
      // The native 'storage' event only fires in *other* tabs, never the tab
      // that made the write - dispatch one manually so this tab's subscriber
      // (and any other open tab's) picks up the change immediately.
      window.dispatchEvent(new StorageEvent('storage', { key: storageKey }));
    },
    [storageKey],
  );

  return [mode, setMode];
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial mode used for the server-rendered / pre-hydration output. Defaults to 'system'. */
  defaultMode?: ThemeMode;
  /** localStorage key used to persist the user's explicit choice. */
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [mode, setMode] = useStoredMode(storageKey, defaultMode);
  const systemTheme = useSystemTheme();
  const resolvedTheme = mode === 'system' ? systemTheme : mode;

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ mode, resolvedTheme, setMode }),
    [mode, resolvedTheme, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
