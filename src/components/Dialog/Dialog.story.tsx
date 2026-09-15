import { Button } from '../Button';
import { Dialog } from './Dialog';

export function Default() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline">Open dialog</Button>} />
      <Dialog.Popup>
        <Dialog.IconClose />
        <Dialog.Header>
          <Dialog.Title>Delete item</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p>Are you sure you want to delete this item?</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
          <Dialog.Close render={<Button>Delete</Button>} />
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog.Root>
  );
}

export function OpenByDefault() {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Trigger render={<Button variant="outline">Open dialog</Button>} />
      <Dialog.Popup>
        <Dialog.IconClose />
        <Dialog.Header>
          <Dialog.Title>Delete item</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p>Are you sure you want to delete this item?</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline">Cancel</Button>} />
          <Dialog.Close render={<Button>Delete</Button>} />
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog.Root>
  );
}
