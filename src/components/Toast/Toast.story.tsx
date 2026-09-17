import * as React from 'react';
import { Button } from '../Button';
import { Toast } from './Toast';

function CreateToastButton() {
  const toastManager = Toast.useToastManager();
  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Changes saved',
          description: 'Your changes have been saved successfully.',
        })
      }
    >
      Show toast
    </Button>
  );
}

export function Default() {
  return (
    <Toast.Provider>
      <CreateToastButton />
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function AutoToast() {
  const toastManager = Toast.useToastManager();
  React.useEffect(() => {
    toastManager.add({
      title: 'Changes saved',
      description: 'Your changes have been saved successfully.',
    });
    // Only ever add the one toast on mount, for the CT spec's convenience.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export function OpenByDefault() {
  return (
    <Toast.Provider>
      <AutoToast />
      <Toast.Viewport />
    </Toast.Provider>
  );
}
