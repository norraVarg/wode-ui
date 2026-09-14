export type ThemeName = 'light' | 'dark';

export type ThemeMode = ThemeName | 'system';

export interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ThemeName;
  setMode: (mode: ThemeMode) => void;
}
