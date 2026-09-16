import * as React from 'react';
import { render, screen } from '@testing-library/react';
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
