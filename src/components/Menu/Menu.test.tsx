import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../Button';
import { Menu } from './Menu';

function Example(props: React.ComponentProps<typeof Menu.Root>) {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger render={<Button variant="outline">Actions</Button>} />
      <Menu.Popup>
        <Menu.Item>New file</Menu.Item>
        <Menu.Item>New folder</Menu.Item>
      </Menu.Popup>
    </Menu.Root>
  );
}

describe('Menu', () => {
  it('does not render the popup by default', () => {
    render(<Example />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders open immediately with defaultOpen', () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole('menu')).toHaveAttribute('data-open');
  });

  it('does not open when the trigger is disabled', async () => {
    const user = userEvent.setup();
    render(
      <Menu.Root>
        <Menu.Trigger disabled render={<Button variant="outline">Actions</Button>} />
        <Menu.Popup>
          <Menu.Item>New file</Menu.Item>
        </Menu.Popup>
      </Menu.Root>,
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations while closed', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
