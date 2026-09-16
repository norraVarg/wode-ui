import { Button } from '../Button';
import { Menu } from './Menu';

function Items() {
  return (
    <>
      <Menu.Item>New file</Menu.Item>
      <Menu.Item>New folder</Menu.Item>
      <Menu.Item disabled>Duplicate</Menu.Item>
    </>
  );
}

export function Default() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="outline">Actions</Button>} />
      <Menu.Popup>
        <Items />
      </Menu.Popup>
    </Menu.Root>
  );
}

export function WithCheckboxItem() {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button variant="outline">View</Button>} />
      <Menu.Popup>
        <Menu.CheckboxItem defaultChecked>Show hidden files</Menu.CheckboxItem>
        <Menu.CheckboxItem>Show extensions</Menu.CheckboxItem>
      </Menu.Popup>
    </Menu.Root>
  );
}

export function OpenByDefault() {
  return (
    <Menu.Root defaultOpen>
      <Menu.Trigger render={<Button variant="outline">Actions</Button>} />
      <Menu.Popup>
        <Items />
      </Menu.Popup>
    </Menu.Root>
  );
}
