import * as React from 'react';
import { badge, type BadgeVariants } from './Badge.styles';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={badge({ variant, className })} {...props} />
  ),
);
Badge.displayName = 'Badge';
