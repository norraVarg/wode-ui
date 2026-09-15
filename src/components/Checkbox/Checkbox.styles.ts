import { tv } from 'tailwind-variants';

export const checkbox = tv({
  slots: {
    root: [
      'border-border bg-bg flex size-5 shrink-0 items-center justify-center rounded border',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'data-[checked]:bg-accent data-[checked]:border-accent',
      'data-[indeterminate]:bg-accent data-[indeterminate]:border-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    indicator: 'text-accent-fg flex items-center justify-center',
  },
});
