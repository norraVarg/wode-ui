import { tv } from 'tailwind-variants';

export const switchStyles = tv({
  slots: {
    root: [
      'bg-border relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'data-[checked]:bg-accent',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    thumb: [
      'bg-bg pointer-events-none block size-5 rounded-full shadow-sm transition-transform',
      'translate-x-0.5 data-[checked]:translate-x-[1.375rem]',
    ],
  },
});
