import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Accordion } from './Accordion';

function Example() {
  return (
    <Accordion.Root defaultValue={['item-1']}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Panel>Yes, it adheres to the WAI-ARIA design pattern.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it styled?</Accordion.Trigger>
        <Accordion.Panel>Yes, it comes with default styles using Tailwind CSS.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

describe('Accordion', () => {
  it('shows the panel for the item in defaultValue', () => {
    render(<Example />);
    expect(screen.getByText('Yes, it adheres to the WAI-ARIA design pattern.')).toBeVisible();
  });

  it('does not mount panels for items not in defaultValue', () => {
    render(<Example />);
    expect(
      screen.queryByText('Yes, it comes with default styles using Tailwind CSS.'),
    ).not.toBeInTheDocument();
  });

  it('opens a panel when its trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole('button', { name: 'Is it styled?' }));

    expect(screen.getByText('Yes, it comes with default styles using Tailwind CSS.')).toBeVisible();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
