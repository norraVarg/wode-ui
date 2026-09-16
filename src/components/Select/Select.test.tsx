import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Select } from './Select';

// Select.Value can only resolve a selected item's display label from this
// map - the popup's Select.Item children aren't mounted (and so can't be
// read) until the popup is opened at least once, via the Portal.
const PLAN_ITEMS: Record<string, string> = {
  free: 'Free',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

function Example(props: Partial<React.ComponentProps<typeof Select.Root>>) {
  return (
    <Select.Root items={PLAN_ITEMS} {...props}>
      <Select.Trigger aria-label="Plan" placeholder="Select a plan" />
      <Select.Popup>
        <Select.Item value="free">Free</Select.Item>
        <Select.Item value="pro">Pro</Select.Item>
        <Select.Item value="enterprise">Enterprise</Select.Item>
      </Select.Popup>
    </Select.Root>
  );
}

describe('Select', () => {
  it('shows the placeholder when nothing is selected', () => {
    render(<Example />);
    expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveTextContent('Select a plan');
  });

  it('shows the selected item label via defaultValue', () => {
    render(<Example defaultValue="pro" />);
    expect(screen.getByRole('combobox', { name: 'Plan' })).toHaveTextContent('Pro');
  });

  it('opens the popup on trigger click', async () => {
    render(<Example />);

    // fireEvent, not userEvent: Select's trigger sets up Floating UI's
    // anchor-positioning autoUpdate loop on open, and userEvent's full
    // synthetic pointer-event sequence interacting with that loop under
    // jsdom (no real layout engine) takes ~20s to resolve per click -
    // not a deadlock, just far slower than every other component's
    // click-to-open interaction (verified empirically). fireEvent
    // dispatches the same event synchronously and resolves instantly
    // with identical resulting DOM.
    fireEvent.click(screen.getByRole('combobox', { name: 'Plan' }));

    // Popup reaches the DOM with Base UI's own open-state attribute, not
    // toBeVisible() - Floating UI's positioning never settles under jsdom.
    // Real visual/positioned verification happens in Select.ct.spec.tsx.
    await waitFor(() => expect(screen.getByRole('option', { name: 'Pro' })).toBeInTheDocument());
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Example disabled />);

    await user.click(screen.getByRole('combobox', { name: 'Plan' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations while closed', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
