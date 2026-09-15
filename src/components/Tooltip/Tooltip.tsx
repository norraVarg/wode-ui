import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { SimplifyClassName } from '../../lib/types';
import { tooltip } from './Tooltip.styles';

const Root = BaseTooltip.Root;
const Trigger = BaseTooltip.Trigger;

export type TooltipPopupProps = SimplifyClassName<BaseTooltip.Popup.Props> &
  Pick<BaseTooltip.Positioner.Props, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

const Popup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ className, side, sideOffset = 8, align, alignOffset, ...props }, ref) => (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseTooltip.Popup ref={ref} className={tooltip({ className })} {...props} />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  ),
);
Popup.displayName = 'Tooltip.Popup';

export const Tooltip = { Root, Trigger, Popup };
