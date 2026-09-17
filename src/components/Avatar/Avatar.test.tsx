import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders fallback content when no image is provided', () => {
    render(
      <Avatar.Root>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>,
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('forwards the ref to the root element', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Avatar.Root ref={ref}>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(
      <Avatar.Root>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
