import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { SimplifyClassName } from '../../lib/types';
import { checkbox } from './Checkbox.styles';

export type CheckboxProps = SimplifyClassName<BaseCheckbox.Root.Props>;

export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    const { root, indicator } = checkbox();
    return (
      <BaseCheckbox.Root ref={ref} className={root({ className })} {...props}>
        <BaseCheckbox.Indicator className={indicator()}>
          <svg viewBox="0 0 12 10" fill="none" className="h-2.5 w-3" aria-hidden="true">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );
  },
);
Checkbox.displayName = 'Checkbox';
