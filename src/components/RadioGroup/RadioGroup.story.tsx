import * as React from 'react';
import { RadioGroup } from './RadioGroup';

export function Uncontrolled() {
  return (
    <RadioGroup.Root aria-label="Billing period" defaultValue="monthly">
      <RadioGroup.Item value="monthly" aria-label="Monthly" />
      <RadioGroup.Item value="yearly" aria-label="Yearly" />
    </RadioGroup.Root>
  );
}

export function Controlled() {
  const [value, setValue] = React.useState('monthly');
  return (
    <RadioGroup.Root aria-label="Billing period" value={value} onValueChange={setValue}>
      <RadioGroup.Item value="monthly" aria-label="Monthly" />
      <RadioGroup.Item value="yearly" aria-label="Yearly" />
    </RadioGroup.Root>
  );
}

export function Disabled() {
  return (
    <RadioGroup.Root aria-label="Billing period" defaultValue="monthly" disabled>
      <RadioGroup.Item value="monthly" aria-label="Monthly" />
      <RadioGroup.Item value="yearly" aria-label="Yearly" />
    </RadioGroup.Root>
  );
}
