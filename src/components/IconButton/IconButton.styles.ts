import { tv, type VariantProps } from 'tailwind-variants';

export const iconButton = tv({
  base: [
    'inline-flex items-center justify-center rounded-md',
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
      // Matches Button's h-9/h-10/h-11 at each size so the two align visually
      // when placed side by side (e.g. an IconButton next to a Button).
      sm: 'size-9',
      md: 'size-10',
      lg: 'size-11',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

export type IconButtonVariants = VariantProps<typeof iconButton>;
