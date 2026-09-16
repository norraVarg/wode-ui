import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="Enable notifications" />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('supports uncontrolled usage via defaultChecked', () => {
    render(<Switch defaultChecked aria-label="Enable notifications" />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('toggles on click when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Enable notifications" />);
    const toggle = screen.getByRole('switch');

    await user.click(toggle);

    expect(toggle).toBeChecked();
  });

  it('supports controlled usage via checked + onCheckedChange', async () => {
    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch checked={checked} onCheckedChange={setChecked} aria-label="Enable notifications" />
      );
    }
    const user = userEvent.setup();
    render(<Controlled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();

    await user.click(toggle);

    expect(toggle).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Switch disabled aria-label="Enable notifications" />);
    const toggle = screen.getByRole('switch');

    await user.click(toggle);

    expect(toggle).not.toBeChecked();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Switch aria-label="Enable notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
