import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

/**
 * jest.setup.ts's global matchMedia stub is a no-op (addEventListener does
 * nothing, matches is always false) - it exists just so ThemeProvider
 * doesn't crash outside 'system' mode. Proving the live OS-preference
 * subscription needs a real fake: something that remembers the registered
 * 'change' listener so the test can invoke it directly, since jsdom has no
 * real media query engine to dispatch a genuine event through.
 */
function mockSystemColorScheme(initialMatches: boolean) {
  let matches = initialMatches;
  let listener: ((event: { matches: boolean }) => void) | null = null;

  window.matchMedia = (query: string) =>
    ({
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_event: string, cb: (event: { matches: boolean }) => void) => {
        listener = cb;
      },
      removeEventListener: () => {
        listener = null;
      },
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;

  return {
    triggerChange(next: boolean) {
      matches = next;
      act(() => listener?.({ matches: next }));
    },
  };
}

function Probe() {
  const { mode, resolvedTheme, setMode } = useTheme();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setMode('dark')}>go dark</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  const originalMatchMedia = window.matchMedia.bind(window);

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('throws when useTheme is used outside a ThemeProvider', () => {
    // React logs its own error-boundary noise for a thrown render - not useful here.
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Probe />)).toThrow('useTheme() must be used within a <ThemeProvider>.');

    consoleError.mockRestore();
  });

  it('resolves the given default mode and sets data-theme on <html>', () => {
    render(
      <ThemeProvider defaultMode="light">
        <Probe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('updates the resolved theme and persists the choice when setMode is called', () => {
    render(
      <ThemeProvider defaultMode="light" storageKey="wode-ui-theme-test">
        <Probe />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('go dark'));

    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem('wode-ui-theme-test')).toBe('dark');
  });

  it('tracks a live OS color-scheme change when mode is "system"', () => {
    const systemColorScheme = mockSystemColorScheme(false); // starts as light

    render(
      <ThemeProvider defaultMode="system">
        <Probe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    systemColorScheme.triggerChange(true); // OS switches to dark

    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider defaultMode="light">
        <Probe />
      </ThemeProvider>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
