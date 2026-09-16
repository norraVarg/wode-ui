import { tv } from 'tailwind-variants';

export const textField = tv({
  slots: {
    root: 'grid grid-rows-[auto_auto_auto] gap-1.5',
    label: 'text-fg text-sm font-medium',
    control: [
      'border-border bg-bg placeholder:text-muted-fg text-fg flex h-10 w-full rounded-md border px-3 text-sm',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[invalid]:border-danger',
    ],
    description: 'text-muted-fg text-sm',
    error: 'text-danger text-sm',
  },
});
