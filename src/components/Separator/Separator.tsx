import * as React from 'react';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type { SimplifyClassName } from '../../lib/types';
import { separator } from './Separator.styles';

export type SeparatorProps = SimplifyClassName<BaseSeparator.Props>;

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...props }, ref) => (
    <BaseSeparator ref={ref} className={separator({ className })} {...props} />
  ),
);
Separator.displayName = 'Separator';
