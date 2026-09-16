import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '../Button';
import { Popover } from './Popover';

function Example(props: React.ComponentProps<typeof Popover.Root>) {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger render={<Button variant="outline">Open popover</Button>} />
      {/* disableAnchorTracking: whenever the popup is mounted open, Base
          UI's Positioner sets up Floating UI's continuous anchor-tracking
          (scroll/resize/layout-shift listeners via autoUpdate). Under
          jsdom (no real layout engine) that loop doesn't converge and
          blocks React's synchronous render-effect flush for 20-30+ real
          seconds - this disables it, since the trigger never actually
          moves in a test. */}
      <Popover.Popup disableAnchorTracking>
        <Popover.IconClose />
        <Popover.Title>Notifications</Popover.Title>
        <Popover.Description>You have no new notifications.</Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
}

describe('Popover', () => {
  it('does not render the popup by default', () => {
    render(<Example />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders open immediately with defaultOpen', () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open');
  });

  it('labels the popup via its title and description', () => {
    render(<Example defaultOpen />);
    const popup = screen.getByRole('dialog');
    expect(popup).toHaveAccessibleName('Notifications');
    expect(popup).toHaveAccessibleDescription('You have no new notifications.');
  });

  it('has no detectable accessibility violations while closed', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
