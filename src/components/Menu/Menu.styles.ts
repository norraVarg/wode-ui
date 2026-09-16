import { tv } from 'tailwind-variants';

export const menu = tv({
  slots: {
    trigger: [
      'border-border bg-bg text-fg inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    popup: [
      'bg-bg border-border min-w-40 rounded-md border p-1 shadow-lg',
      'outline-none',
      'transition-[transform,scale,opacity]',
      'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
      'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
    ],
    item: [
      'text-fg flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
      'outline-none',
      'data-[highlighted]:bg-muted',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    itemIndicator: 'text-accent flex items-center justify-center',
  },
});
