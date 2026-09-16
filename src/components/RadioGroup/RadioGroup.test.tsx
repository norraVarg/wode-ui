import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { RadioGroup } from './RadioGroup';

function Example(props: Partial<React.ComponentProps<typeof RadioGroup.Root>>) {
  return (
    <RadioGroup.Root aria-label="Billing period" {...props}>
      <RadioGroup.Item value="monthly" aria-label="Monthly" />
      <RadioGroup.Item value="yearly" aria-label="Yearly" />
    </RadioGroup.Root>
  );
}

describe('RadioGroup', () => {
  it('selects the default value', () => {
    render(<Example defaultValue="monthly" />);
    expect(screen.getByRole('radio', { name: 'Monthly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();
  });

  it('switches selection on click when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Example defaultValue="monthly" />);

    await user.click(screen.getByRole('radio', { name: 'Yearly' }));

    expect(screen.getByRole('radio', { name: 'Yearly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Monthly' })).not.toBeChecked();
  });

  it('supports controlled usage via value + onValueChange', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('monthly');
      return (
        <RadioGroup.Root aria-label="Billing period" value={value} onValueChange={setValue}>
          <RadioGroup.Item value="monthly" aria-label="Monthly" />
          <RadioGroup.Item value="yearly" aria-label="Yearly" />
        </RadioGroup.Root>
      );
    }
    const user = userEvent.setup();
    render(<Controlled />);
    expect(screen.getByRole('radio', { name: 'Monthly' })).toBeChecked();

    await user.click(screen.getByRole('radio', { name: 'Yearly' }));

    expect(screen.getByRole('radio', { name: 'Yearly' })).toBeChecked();
  });

  it('does not change selection when disabled', async () => {
    const user = userEvent.setup();
    render(<Example defaultValue="monthly" disabled />);

    await user.click(screen.getByRole('radio', { name: 'Yearly' }));

    expect(screen.getByRole('radio', { name: 'Monthly' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Yearly' })).not.toBeChecked();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Example defaultValue="monthly" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
