import * as React from 'react';
import { button, type ButtonVariants } from './Button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, startIcon, endIcon, children, ...props }, ref) => (
    <button ref={ref} className={button({ variant, size, className })} {...props}>
      {startIcon}
      {children}
      {endIcon}
    </button>
  ),
);
Button.displayName = 'Button';
