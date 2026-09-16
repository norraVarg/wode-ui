import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import type { SimplifyClassName } from '../../lib/types';
import { popover } from './Popover.styles';

const Root = BasePopover.Root;
const Trigger = BasePopover.Trigger;
const Close = BasePopover.Close;

export type PopoverPopupProps = SimplifyClassName<BasePopover.Popup.Props> &
  Pick<
    BasePopover.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignOffset' | 'disableAnchorTracking'
  >;

const Popup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  (
    {
      className,
      children,
      side,
      sideOffset = 8,
      align,
      alignOffset,
      disableAnchorTracking,
      ...props
    },
    ref,
  ) => {
    const styles = popover();
    return (
      <BasePopover.Portal>
        <BasePopover.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          disableAnchorTracking={disableAnchorTracking}
        >
          <BasePopover.Popup ref={ref} className={styles.popup({ className })} {...props}>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    );
  },
);
Popup.displayName = 'Popover.Popup';

export type PopoverTitleProps = SimplifyClassName<BasePopover.Title.Props>;

const Title = React.forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, ...props }, ref) => {
    const styles = popover();
    return <BasePopover.Title ref={ref} className={styles.title({ className })} {...props} />;
  },
);
Title.displayName = 'Popover.Title';

export type PopoverDescriptionProps = SimplifyClassName<BasePopover.Description.Props>;

const Description = React.forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  ({ className, ...props }, ref) => {
    const styles = popover();
    return (
      <BasePopover.Description ref={ref} className={styles.description({ className })} {...props} />
    );
  },
);
Description.displayName = 'Popover.Description';

export type PopoverIconCloseProps = SimplifyClassName<BasePopover.Close.Props>;

const IconClose = React.forwardRef<HTMLButtonElement, PopoverIconCloseProps>(
  ({ className, 'aria-label': ariaLabel = 'Close', ...props }, ref) => {
    const styles = popover();
    return (
      <BasePopover.Close
        ref={ref}
        aria-label={ariaLabel}
        className={styles.iconClose({ className })}
        {...props}
      >
        <svg viewBox="0 0 12 12" fill="none" className="size-3" aria-hidden="true">
          <path
            d="M1 1L11 11M11 1L1 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </BasePopover.Close>
    );
  },
);
IconClose.displayName = 'Popover.IconClose';

export const Popover = { Root, Trigger, Popup, Title, Description, Close, IconClose };
