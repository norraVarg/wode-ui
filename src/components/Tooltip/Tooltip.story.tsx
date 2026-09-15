import { Tooltip } from './Tooltip';

export function Default() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={<button type="button">Hover me</button>} />
      <Tooltip.Popup>Helpful information</Tooltip.Popup>
    </Tooltip.Root>
  );
}

export function OpenByDefault() {
  return (
    <Tooltip.Root defaultOpen>
      <Tooltip.Trigger render={<button type="button">Hover me</button>} />
      <Tooltip.Popup>Helpful information</Tooltip.Popup>
    </Tooltip.Root>
  );
}
