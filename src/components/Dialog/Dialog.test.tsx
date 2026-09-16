import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from '../Button';
import { Dialog } from './Dialog';

function Example(props: React.ComponentProps<typeof Dialog.Root>) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger render={<Button variant="outline">Open dialog</Button>} />
      <Dialog.Popup>
        <Dialog.IconClose />
        <Dialog.Header>
          <Dialog.Title>Delete item</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p>Are you sure you want to delete this item?</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
          <Dialog.Close render={<Button>Delete</Button>} />
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog.Root>
  );
}

describe('Dialog', () => {
  it('does not render the popup by default', () => {
    render(<Example />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders open immediately with defaultOpen', () => {
    render(<Example defaultOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('labels the dialog via its title and description', () => {
    render(<Example defaultOpen />);
    const dialogEl = screen.getByRole('dialog');
    expect(dialogEl).toHaveAccessibleName('Delete item');
    expect(dialogEl).toHaveAccessibleDescription('This action cannot be undone.');
  });

  it('closes when the Cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<Example defaultOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations while open', async () => {
    const { container } = render(<Example defaultOpen />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
