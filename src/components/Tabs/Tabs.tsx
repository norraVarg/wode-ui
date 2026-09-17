import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { SimplifyClassName } from '../../lib/types';
import { tabs } from './Tabs.styles';

const Root = BaseTabs.Root;

export type TabsListProps = SimplifyClassName<BaseTabs.List.Props>;

const List = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => {
  const { list } = tabs();
  return <BaseTabs.List ref={ref} className={list({ className })} {...props} />;
});
List.displayName = 'Tabs.List';

export type TabsTabProps = SimplifyClassName<BaseTabs.Tab.Props>;

const Tab = React.forwardRef<HTMLElement, TabsTabProps>(({ className, ...props }, ref) => {
  const { tab } = tabs();
  return <BaseTabs.Tab ref={ref} className={tab({ className })} {...props} />;
});
Tab.displayName = 'Tabs.Tab';

export type TabsPanelProps = SimplifyClassName<BaseTabs.Panel.Props>;

const Panel = React.forwardRef<HTMLDivElement, TabsPanelProps>(({ className, ...props }, ref) => {
  const { panel } = tabs();
  return <BaseTabs.Panel ref={ref} className={panel({ className })} {...props} />;
});
Panel.displayName = 'Tabs.Panel';

export const Tabs = { Root, List, Tab, Panel };
