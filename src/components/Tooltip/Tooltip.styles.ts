import { tv } from 'tailwind-variants';

export const tooltip = tv({
  base: [
    'bg-fg text-bg rounded-md px-2.5 py-1.5 text-sm',
    'transition-[transform,scale,opacity]',
    'data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-90 data-[ending-style]:opacity-0',
  ],
});
