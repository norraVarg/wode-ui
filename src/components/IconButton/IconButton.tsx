import * as React from 'react';
import { iconButton, type IconButtonVariants } from './IconButton.styles';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, IconButtonVariants {
  /** Required, not optional - an icon-only button has no visible text, so an accessible name is mandatory. */
  'aria-label': string;
  /** The icon to render - this library is icon-agnostic, so any SVG/element works. */
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button ref={ref} className={iconButton({ variant, size, className })} {...props}>
      {children}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
