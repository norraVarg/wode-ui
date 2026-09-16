import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with a default accessible status role and label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('accepts a custom aria-label', () => {
    render(<Spinner aria-label="Submitting" />);
    expect(screen.getByRole('status', { name: 'Submitting' })).toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
