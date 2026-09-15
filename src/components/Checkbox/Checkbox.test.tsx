import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('supports uncontrolled usage via defaultChecked', () => {
    render(<Checkbox defaultChecked aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles on click when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);
    const box = screen.getByRole('checkbox');

    await user.click(box);

    expect(box).toBeChecked();
  });

  it('supports controlled usage via checked + onCheckedChange', async () => {
    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Accept terms" />;
    }
    const user = userEvent.setup();
    render(<Controlled />);
    const box = screen.getByRole('checkbox');
    expect(box).not.toBeChecked();

    await user.click(box);

    expect(box).toBeChecked();
  });

  it('reflects the indeterminate state', () => {
    render(<Checkbox indeterminate aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled aria-label="Accept terms" />);
    const box = screen.getByRole('checkbox');

    await user.click(box);

    expect(box).not.toBeChecked();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
