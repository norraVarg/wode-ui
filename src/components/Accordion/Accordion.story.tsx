import { Accordion } from './Accordion';

export function Default() {
  return (
    <Accordion.Root defaultValue={['item-1']}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Panel>Yes, it adheres to the WAI-ARIA design pattern.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it styled?</Accordion.Trigger>
        <Accordion.Panel>Yes, it comes with default styles using Tailwind CSS.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
