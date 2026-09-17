import { tv, type VariantProps } from 'tailwind-variants';

export const avatar = tv({
  slots: {
    root: 'bg-muted relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
    image: 'size-full object-cover',
    fallback: 'text-muted-fg flex size-full items-center justify-center text-sm font-medium',
  },
  variants: {
    size: {
      sm: { root: 'size-8' },
      md: { root: 'size-10' },
      lg: { root: 'size-14' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;
