import * as React from 'react';
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import type { SimplifyClassName } from '../../lib/types';
import { accordion } from './Accordion.styles';

const Root = BaseAccordion.Root;

export type AccordionItemProps = SimplifyClassName<BaseAccordion.Item.Props>;

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => {
    const { item } = accordion();
    return <BaseAccordion.Item ref={ref} className={item({ className })} {...props} />;
  },
);
Item.displayName = 'Accordion.Item';

export type AccordionTriggerProps = SimplifyClassName<BaseAccordion.Trigger.Props>;

const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { header, trigger, icon } = accordion();
    return (
      <BaseAccordion.Header className={header()}>
        <BaseAccordion.Trigger ref={ref} className={trigger({ className })} {...props}>
          {children}
          <svg viewBox="0 0 12 8" fill="none" className={icon()} aria-hidden="true">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
    );
  },
);
Trigger.displayName = 'Accordion.Trigger';

export type AccordionPanelProps = SimplifyClassName<BaseAccordion.Panel.Props>;

const Panel = React.forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ className, children, ...props }, ref) => {
    const { panel, panelContent } = accordion();
    return (
      <BaseAccordion.Panel ref={ref} className={panel({ className })} {...props}>
        <div className={panelContent()}>{children}</div>
      </BaseAccordion.Panel>
    );
  },
);
Panel.displayName = 'Accordion.Panel';

export const Accordion = { Root, Item, Trigger, Panel };
