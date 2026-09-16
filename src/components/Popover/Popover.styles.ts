import { tv } from 'tailwind-variants';

export const popover = tv({
  slots: {
    popup: [
      'bg-bg w-72 max-w-[calc(100vw-2rem)] rounded-lg p-4 shadow-lg',
      'outline-none',
      'transition-[transform,scale,opacity]',
      'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
      'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
    ],
    title: 'text-fg text-sm font-semibold',
    description: 'text-muted-fg mt-1 text-sm',
    iconClose: [
      'text-muted-fg absolute top-3 right-3 flex size-6 items-center justify-center rounded-md',
      'outline-none hover:opacity-100',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'opacity-70',
    ],
  },
});
