import { tv } from 'tailwind-variants';

export const dialog = tv({
  slots: {
    backdrop: [
      'bg-fg/50 fixed inset-0 z-40',
      'transition-opacity',
      'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
    ],
    popup: [
      'bg-bg fixed inset-x-0 bottom-0 z-50 grid max-h-[85vh] w-full grid-rows-[auto_1fr_auto]',
      'gap-4 rounded-t-lg p-6 shadow-lg',
      'sm:inset-auto sm:top-1/2 sm:left-1/2 sm:bottom-auto sm:max-h-[min(85vh,32rem)] sm:w-full',
      'sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg',
      'transition-[transform,scale,opacity] outline-none',
      'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
      'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
    ],
    header: 'flex flex-col gap-1 pr-8',
    title: 'text-fg text-lg font-semibold',
    description: 'text-muted-fg text-sm',
    body: 'overflow-y-auto',
    footer: 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
    iconClose: [
      'text-muted-fg absolute top-4 right-4 flex size-6 items-center justify-center rounded-md',
      'outline-none hover:opacity-100',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'opacity-70',
    ],
  },
});
