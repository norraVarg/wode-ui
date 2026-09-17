import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Toast } from './Toast';

function TestTrigger() {
  const toastManager = Toast.useToastManager();
  return (
    <button
      type="button"
      onClick={() =>
        toastManager.add({ title: 'Changes saved', description: 'Everything is up to date.' })
      }
    >
      Show toast
    </button>
  );
}

function Example() {
  return (
    <Toast.Provider>
      <TestTrigger />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

describe('Toast', () => {
  it('renders no toasts by default', () => {
    render(<Example />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows a toast added via useToastManager', async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    const toastEl = screen.getByRole('dialog');
    expect(within(toastEl).getByText('Changes saved')).toBeInTheDocument();
    expect(within(toastEl).getByText('Everything is up to date.')).toBeInTheDocument();
  });

  it('dismisses the toast when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    const toastEl = screen.getByRole('dialog');

    // Base UI's Close button is aria-hidden until the toast region is
    // hovered or the button itself gains focus - a progressive-disclosure
    // pattern for its collapsed/expanded stack visual. Hovering first
    // mirrors how a real mouse user would actually discover and click it.
    await user.hover(toastEl);
    await user.click(within(toastEl).getByRole('button', { name: 'Dismiss' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
