import * as React from 'react';
import { Select } from './Select';

// Select.Value can only resolve a selected item's display label from this
// map - the popup's Select.Item children aren't mounted (and so can't be
// read) until the popup is opened at least once, via the Portal.
const PLAN_ITEMS: Record<string, string> = {
  free: 'Free',
  pro: 'Pro',
  enterprise: 'Enterprise',
};

function Options() {
  return (
    <>
      {Object.entries(PLAN_ITEMS).map(([value, label]) => (
        <Select.Item key={value} value={value}>
          {label}
        </Select.Item>
      ))}
    </>
  );
}

export function Uncontrolled() {
  return (
    <Select.Root items={PLAN_ITEMS} defaultValue="pro">
      <Select.Trigger aria-label="Plan" placeholder="Select a plan" />
      <Select.Popup>
        <Options />
      </Select.Popup>
    </Select.Root>
  );
}

export function Controlled() {
  const [value, setValue] = React.useState<string | null>(null);
  return (
    <Select.Root items={PLAN_ITEMS} value={value} onValueChange={setValue}>
      <Select.Trigger aria-label="Plan" placeholder="Select a plan" />
      <Select.Popup>
        <Options />
      </Select.Popup>
    </Select.Root>
  );
}

export function Disabled() {
  return (
    <Select.Root items={PLAN_ITEMS} disabled defaultValue="pro">
      <Select.Trigger aria-label="Plan" placeholder="Select a plan" />
      <Select.Popup>
        <Options />
      </Select.Popup>
    </Select.Root>
  );
}

export function OpenByDefault() {
  return (
    <Select.Root items={PLAN_ITEMS} defaultOpen defaultValue="pro">
      <Select.Trigger aria-label="Plan" placeholder="Select a plan" />
      <Select.Popup>
        <Options />
      </Select.Popup>
    </Select.Root>
  );
}
