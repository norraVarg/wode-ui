import * as React from 'react';
import { Switch } from './Switch';

export function Uncontrolled() {
  return <Switch defaultChecked aria-label="Uncontrolled switch" />;
}

export function Controlled() {
  const [checked, setChecked] = React.useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} aria-label="Controlled switch" />;
}

export function Disabled() {
  return <Switch disabled aria-label="Disabled switch" />;
}
