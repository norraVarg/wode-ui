import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ProgressBar } from './ProgressBar';

function Example({ value }: { value: number | null }) {
  return (
    <ProgressBar.Root value={value}>
      <ProgressBar.Label>Uploading</ProgressBar.Label>
      <ProgressBar.Value />
      <ProgressBar.Track>
        <ProgressBar.Indicator />
      </ProgressBar.Track>
    </ProgressBar.Root>
  );
}

describe('ProgressBar', () => {
  it('exposes the current value via ARIA', () => {
    render(<Example value={40} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('associates the label as the accessible name', () => {
    render(<Example value={40} />);
    expect(screen.getByRole('progressbar')).toHaveAccessibleName('Uploading');
  });

  it('has no aria-valuenow when indeterminate', () => {
    render(<Example value={null} />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Example value={40} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
