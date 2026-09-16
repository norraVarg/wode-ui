import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import type { SimplifyClassName } from '../../lib/types';
import { select } from './Select.styles';

export type SelectRootProps = BaseSelect.Root.Props<string>;

const Root = BaseSelect.Root;

export type SelectTriggerProps = SimplifyClassName<BaseSelect.Trigger.Props> & {
  placeholder?: React.ReactNode;
};

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder, ...props }, ref) => {
    const { trigger, icon } = select();
    return (
      <BaseSelect.Trigger ref={ref} className={trigger({ className })} {...props}>
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className={icon()}>
          <svg viewBox="0 0 12 8" fill="none" className="size-3" aria-hidden="true">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
    );
  },
);
Trigger.displayName = 'Select.Trigger';

export type SelectPopupProps = SimplifyClassName<BaseSelect.Popup.Props> &
  Pick<BaseSelect.Positioner.Props, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

const Popup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, children, side, sideOffset = 4, align, alignOffset, ...props }, ref) => (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseSelect.Popup ref={ref} className={select().popup({ className })} {...props}>
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  ),
);
Popup.displayName = 'Select.Popup';

export type SelectItemProps = SimplifyClassName<BaseSelect.Item.Props>;

const Item = React.forwardRef<HTMLElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    const { item, itemIndicator } = select();
    return (
      <BaseSelect.Item ref={ref} className={item({ className })} {...props}>
        <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
        <BaseSelect.ItemIndicator className={itemIndicator()}>
          <svg viewBox="0 0 12 10" fill="none" className="size-3" aria-hidden="true">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseSelect.ItemIndicator>
      </BaseSelect.Item>
    );
  },
);
Item.displayName = 'Select.Item';

export const Select = { Root, Trigger, Popup, Item };
