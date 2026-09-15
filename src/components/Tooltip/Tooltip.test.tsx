import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tooltip } from './Tooltip';

function Example(props: React.ComponentProps<typeof Tooltip.Root>) {
  return (
    <Tooltip.Root {...props}>
      <Tooltip.Trigger render={<button type="button">Hover me</button>} />
      <Tooltip.Popup>Helpful information</Tooltip.Popup>
    </Tooltip.Root>
  );
}

describe('Tooltip', () => {
  it('does not render the popup by default', () => {
    render(<Example />);
    expect(screen.queryByText('Helpful information')).not.toBeInTheDocument();
  });

  it('opens on hover', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.hover(screen.getByRole('button', { name: 'Hover me' }));

    // Checks the popup reaches the DOM with Base UI's own open-state
    // attribute, not toBeVisible() - Floating UI's positioning never
    // settles under jsdom (no real layout engine), so the popup stays at
    // an inline opacity:0 indefinitely even though it's logically open.
    // Real visual/positioned verification happens in Tooltip.ct.spec.tsx,
    // in an actual browser.
    await waitFor(
      () => expect(screen.getByText('Helpful information')).toHaveAttribute('data-open'),
      { timeout: 2000 },
    );
  });

  it('renders open immediately with defaultOpen', () => {
    render(<Example defaultOpen />);
    expect(screen.getByText('Helpful information')).toHaveAttribute('data-open');
  });

  it('has no detectable accessibility violations while closed', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
