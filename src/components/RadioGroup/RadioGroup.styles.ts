import { tv } from 'tailwind-variants';

export const radioGroup = tv({
  slots: {
    root: 'flex flex-col gap-2',
    item: [
      'border-border bg-bg flex size-5 shrink-0 items-center justify-center rounded-full border',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'data-[checked]:border-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    indicator: 'bg-accent size-2.5 rounded-full',
  },
});
