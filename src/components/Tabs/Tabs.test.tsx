import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tabs } from './Tabs';

function Example() {
  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">Account</Tabs.Tab>
        <Tabs.Tab value="password">Password</Tabs.Tab>
        <Tabs.Tab value="settings" disabled>
          Settings
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">Manage your account details here.</Tabs.Panel>
      <Tabs.Panel value="password">Update your password here.</Tabs.Panel>
      <Tabs.Panel value="settings">Adjust your settings here.</Tabs.Panel>
    </Tabs.Root>
  );
}

describe('Tabs', () => {
  it('shows the panel matching defaultValue', () => {
    render(<Example />);
    expect(screen.getByText('Manage your account details here.')).toBeVisible();
  });

  it('switches the active panel when a tab is clicked', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole('tab', { name: 'Password' }));

    expect(screen.getByText('Update your password here.')).toBeVisible();
  });

  it('does not switch when the disabled tab is clicked', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole('tab', { name: 'Settings' }));

    expect(screen.getByText('Manage your account details here.')).toBeVisible();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
