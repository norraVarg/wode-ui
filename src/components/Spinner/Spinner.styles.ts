import { tv, type VariantProps } from 'tailwind-variants';

export const spinner = tv({
  base: 'text-accent inline-block animate-spin motion-reduce:animate-none',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SpinnerVariants = VariantProps<typeof spinner>;
