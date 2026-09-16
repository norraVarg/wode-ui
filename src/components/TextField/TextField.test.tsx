import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(
      <TextField.Root>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
      </TextField.Root>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(
      <TextField.Root>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
      </TextField.Root>,
    );
    const input = screen.getByLabelText('Email');

    await user.type(input, 'hello@example.com');

    expect(input).toHaveValue('hello@example.com');
  });

  it('renders description text', () => {
    render(
      <TextField.Root>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
        <TextField.Description>We will never share your email.</TextField.Description>
      </TextField.Root>,
    );
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument();
  });

  it('shows the error message when invalid', () => {
    render(
      <TextField.Root invalid>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
        <TextField.Error match>Enter a valid email address.</TextField.Error>
      </TextField.Root>,
    );
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
  });

  it('does not accept input when disabled', async () => {
    const user = userEvent.setup();
    render(
      <TextField.Root disabled>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
      </TextField.Root>,
    );
    const input = screen.getByLabelText('Email');

    await user.type(input, 'hello@example.com');

    expect(input).not.toHaveValue('hello@example.com');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <TextField.Root>
        <TextField.Label>Email</TextField.Label>
        <TextField.Input />
        <TextField.Description>We will never share your email.</TextField.Description>
      </TextField.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
