import { tv } from 'tailwind-variants';

export const toast = tv({
  slots: {
    viewport: [
      'pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-w-sm flex-col gap-2 p-4',
      'sm:right-4 sm:left-auto',
    ],
    root: [
      'bg-bg border-border pointer-events-auto grid grid-cols-[1fr_auto] items-start gap-3 rounded-lg border p-4 shadow-lg',
      'transition-[transform,opacity]',
      'data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
      'data-[ending-style]:opacity-0',
    ],
    content: 'flex flex-col gap-1',
    title: 'text-fg text-sm font-semibold',
    description: 'text-muted-fg text-sm',
    close: [
      'text-muted-fg flex size-6 items-center justify-center rounded-md',
      'outline-none hover:opacity-100',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'opacity-70',
    ],
  },
});
