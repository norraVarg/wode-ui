import * as React from 'react';
import { Checkbox } from './Checkbox';

export function Uncontrolled() {
  return <Checkbox defaultChecked aria-label="Uncontrolled checkbox" />;
}

export function Controlled() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Controlled checkbox" />
  );
}

export function Indeterminate() {
  return <Checkbox indeterminate aria-label="Indeterminate checkbox" />;
}

export function Disabled() {
  return <Checkbox disabled aria-label="Disabled checkbox" />;
}
