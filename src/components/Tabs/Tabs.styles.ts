import { tv } from 'tailwind-variants';

export const tabs = tv({
  slots: {
    list: 'border-border flex gap-1 border-b',
    tab: [
      'text-muted-fg -mb-px flex items-center border-b-2 border-transparent px-3 py-2 text-sm font-medium',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'hover:text-fg',
      'data-[active]:text-fg data-[active]:border-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    panel: 'text-fg text-sm outline-none',
  },
});
