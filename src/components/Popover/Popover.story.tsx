import { Button } from '../Button';
import { Popover } from './Popover';

export function Default() {
  return (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline">Open popover</Button>} />
      <Popover.Popup>
        <Popover.IconClose />
        <Popover.Title>Notifications</Popover.Title>
        <Popover.Description>You have no new notifications.</Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
}

export function OpenByDefault() {
  return (
    <Popover.Root defaultOpen>
      <Popover.Trigger render={<Button variant="outline">Open popover</Button>} />
      <Popover.Popup>
        <Popover.IconClose />
        <Popover.Title>Notifications</Popover.Title>
        <Popover.Description>You have no new notifications.</Popover.Description>
      </Popover.Popup>
    </Popover.Root>
  );
}
