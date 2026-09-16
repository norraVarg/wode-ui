import * as React from 'react';
import { spinner, type SpinnerVariants } from './Spinner.styles';

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement>, SpinnerVariants {}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, 'aria-label': ariaLabel = 'Loading', ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={ariaLabel}
      className={spinner({ size, className })}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),
);
Spinner.displayName = 'Spinner';
