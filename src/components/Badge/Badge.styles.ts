import { tv, type VariantProps } from 'tailwind-variants';

export const badge = tv({
  base: 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
  variants: {
    variant: {
      default: 'bg-muted text-muted-fg',
      accent: 'bg-accent text-accent-fg',
      success: 'bg-success text-accent-fg',
      danger: 'bg-danger text-accent-fg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
