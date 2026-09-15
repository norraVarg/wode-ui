import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: [
    'inline-flex items-center justify-center gap-2 rounded-md font-medium',
    'transition-colors outline-none',
    'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      solid: 'bg-accent text-accent-fg hover:bg-accent/90',
      outline: 'border-border text-fg border bg-transparent hover:bg-muted',
      ghost: 'text-fg bg-transparent hover:bg-muted',
    },
    size: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

export type ButtonVariants = VariantProps<typeof button>;
