import { tv } from 'tailwind-variants';

export const layout = tv({
  slots: {
    root: 'grid h-full grid-rows-[auto_1fr_auto]',
    header: '',
    content: 'min-h-0 overflow-y-auto',
    footer: '',
  },
  variants: {
    variant: {
      // Header/content/footer stacked as rows; content flexes and scrolls
      // independently. Additional shell shapes (e.g. a future
      // "stacked-two") are added the same way, generically named.
      'stacked-one': {},
    },
  },
  defaultVariants: {
    variant: 'stacked-one',
  },
});
