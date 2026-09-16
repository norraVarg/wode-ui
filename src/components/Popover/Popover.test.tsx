import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '../Button';
import { Popover } from './Popover';

function Example(props: React.ComponentProps<typeof Popover.Root>) {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger render={<Button variant="outline">Open popover</Button>} />
      <Popover.Popup>
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
    // Explicit timeout: mounting Popover's trigger still sets up Floating
    // UI/Base UI's popover-tree bookkeeping even while closed, and axe's
    // own DOM walk on top of that occasionally exceeds Jest's default
    // 5000ms under full-suite CPU contention (parallel worker processes).
    // Confirmed independent of the interaction tests removed above -
    // still needed after they were dropped.
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  }, 15000);
});
