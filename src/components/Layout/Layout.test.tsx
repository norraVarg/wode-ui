import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders header, content, and footer', () => {
    render(<Layout header="Header" content="Content" footer="Footer" />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders header before content before footer in DOM order, regardless of prop declaration order', () => {
    const { container } = render(<Layout footer="Z" content="Y" header="X" />);
    const text = container.textContent ?? '';
    expect(text.indexOf('X')).toBeLessThan(text.indexOf('Y'));
    expect(text.indexOf('Y')).toBeLessThan(text.indexOf('Z'));
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<Layout header="Header" content="Content" footer="Footer" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
