import * as React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { SimplifyClassName } from '../../lib/types';
import { switchStyles } from './Switch.styles';

export type SwitchProps = SimplifyClassName<BaseSwitch.Root.Props>;

export const Switch = React.forwardRef<HTMLElement, SwitchProps>(({ className, ...props }, ref) => {
  const { root, thumb } = switchStyles();
  return (
    <BaseSwitch.Root ref={ref} className={root({ className })} {...props}>
      <BaseSwitch.Thumb className={thumb()} />
    </BaseSwitch.Root>
  );
});
Switch.displayName = 'Switch';
