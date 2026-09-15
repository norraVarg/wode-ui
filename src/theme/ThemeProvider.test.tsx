import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

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
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
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

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <ThemeProvider defaultMode="light">
        <Probe />
      </ThemeProvider>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
