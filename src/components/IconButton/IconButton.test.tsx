import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { IconButton } from './IconButton';

function PlusIcon() {
  return <svg aria-hidden="true" />;
}

describe('IconButton', () => {
  it('is accessible via its required aria-label', () => {
    render(
      <IconButton aria-label="Add item">
        <PlusIcon />
      </IconButton>,
    );
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <IconButton aria-label="Add item" onClick={handleClick}>
        <PlusIcon />
      </IconButton>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <IconButton aria-label="Add item" disabled onClick={handleClick}>
        <PlusIcon />
      </IconButton>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <IconButton aria-label="Add item">
        <PlusIcon />
      </IconButton>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
