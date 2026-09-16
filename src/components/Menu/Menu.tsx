import * as React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { SimplifyClassName } from '../../lib/types';
import { menu } from './Menu.styles';

const Root = BaseMenu.Root;

export type MenuTriggerProps = SimplifyClassName<BaseMenu.Trigger.Props>;

const Trigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ className, ...props }, ref) => {
    const { trigger } = menu();
    return <BaseMenu.Trigger ref={ref} className={trigger({ className })} {...props} />;
  },
);
Trigger.displayName = 'Menu.Trigger';

export type MenuPopupProps = SimplifyClassName<BaseMenu.Popup.Props> &
  Pick<
    BaseMenu.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignOffset' | 'disableAnchorTracking'
  >;

const Popup = React.forwardRef<HTMLDivElement, MenuPopupProps>(
  (
    {
      className,
      children,
      side,
      sideOffset = 4,
      align,
      alignOffset,
      disableAnchorTracking,
      ...props
    },
    ref,
  ) => {
    const styles = menu();
    return (
      <BaseMenu.Portal>
        <BaseMenu.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          disableAnchorTracking={disableAnchorTracking}
        >
          <BaseMenu.Popup ref={ref} className={styles.popup({ className })} {...props}>
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    );
  },
);
Popup.displayName = 'Menu.Popup';

export type MenuItemProps = SimplifyClassName<BaseMenu.Item.Props>;

const Item = React.forwardRef<HTMLElement, MenuItemProps>(({ className, ...props }, ref) => {
  const { item } = menu();
  return <BaseMenu.Item ref={ref} className={item({ className })} {...props} />;
});
Item.displayName = 'Menu.Item';

export type MenuCheckboxItemProps = SimplifyClassName<BaseMenu.CheckboxItem.Props>;

const CheckboxItem = React.forwardRef<HTMLElement, MenuCheckboxItemProps>(
  ({ className, children, ...props }, ref) => {
    const { item, itemIndicator } = menu();
    return (
      <BaseMenu.CheckboxItem ref={ref} className={item({ className })} {...props}>
        <BaseMenu.CheckboxItemIndicator className={itemIndicator()}>
          <svg viewBox="0 0 12 10" fill="none" className="size-3" aria-hidden="true">
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseMenu.CheckboxItemIndicator>
        {children}
      </BaseMenu.CheckboxItem>
    );
  },
);
CheckboxItem.displayName = 'Menu.CheckboxItem';

export const Menu = { Root, Trigger, Popup, Item, CheckboxItem };
