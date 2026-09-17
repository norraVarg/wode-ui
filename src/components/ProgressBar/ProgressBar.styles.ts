import { tv } from 'tailwind-variants';

export const progressBar = tv({
  slots: {
    root: 'grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1.5',
    label: 'text-fg text-sm font-medium',
    value: 'text-muted-fg text-sm',
    track: 'bg-muted relative col-span-2 h-2 w-full overflow-hidden rounded-full',
    indicator: [
      'bg-accent absolute inset-y-0 rounded-full transition-[width]',
      'data-[complete]:bg-success',
      'data-[indeterminate]:w-full data-[indeterminate]:animate-pulse',
    ],
  },
});
