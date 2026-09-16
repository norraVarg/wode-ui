import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '../Button';
import { Popover } from './Popover';

function Example(props: React.ComponentProps<typeof Popover.Root>) {
  return (
    <Popover.Root {...props}>
      <Popover.Trigger render={<Button variant="outline">Open popover</Button>} />
      {/* disableAnchorTracking: jsdom has no real layout engine, so Floating
          UI's autoUpdate loop (ResizeObserver/scroll/layout-shift tracking)
          never settles and each interaction with an open popup takes tens
          of real seconds. The trigger's position never actually changes in
          a test, so tracking it brings no value here. */}
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

  it('opens when the trigger is clicked', () => {
    render(<Example />);

    // fireEvent, not userEvent: Popover's popup drives Floating UI's
    // anchor-positioning machinery on open, and userEvent's fuller
    // synthetic pointer-event sequence interacting with that under jsdom
    // (no real layout engine) is far slower than every non-anchored
    // component's click-to-open interaction (same root cause as Select).
    // fireEvent applies the resulting state update synchronously, so no
    // waitFor is needed either.
    fireEvent.click(screen.getByRole('button', { name: 'Open popover' }));

    // Popup reaches the DOM with Base UI's own open-state attribute, not
    // toBeVisible() - Floating UI's positioning never settles under jsdom.
    // Real visual/positioned verification happens in Popover.ct.spec.tsx.
    expect(screen.getByRole('dialog')).toHaveAttribute('data-open');
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

  it('closes when the close button is clicked', () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Example defaultOpen />);

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations while closed', async () => {
    // Explicit timeout: mounting Popover's trigger still sets up Floating
    // UI/Base UI's popover-tree bookkeeping even while closed, and axe's
    // own DOM walk on top of that occasionally exceeds Jest's default
    // 5000ms under full-suite CPU contention (parallel worker processes).
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  }, 15000);
});
