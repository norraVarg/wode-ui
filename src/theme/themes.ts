import type { ThemeName } from './types';

/**
 * Registry of themes wode-ui ships out of the box. Purely for building a
 * theme-switcher UI (e.g. a <select> of options) - CSS theme files
 * themselves work without being listed here, since they're additive by
 * file, not by registration.
 */
export const KNOWN_THEMES: readonly ThemeName[] = ['light', 'dark'];
