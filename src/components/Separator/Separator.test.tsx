import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Separator } from './Separator';

describe('Separator', () => {
  it('defaults to horizontal orientation', () => {
    render(<Separator />);
    expect(screen.getByRole('separator')).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('respects the vertical orientation prop', () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Separator />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
