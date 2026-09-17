import * as React from 'react';
import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import type { SimplifyClassName } from '../../lib/types';
import { avatar, type AvatarVariants } from './Avatar.styles';

export type AvatarRootProps = SimplifyClassName<BaseAvatar.Root.Props> & AvatarVariants;

const Root = React.forwardRef<HTMLSpanElement, AvatarRootProps>(
  ({ className, size, ...props }, ref) => {
    const { root } = avatar({ size });
    return <BaseAvatar.Root ref={ref} className={root({ className })} {...props} />;
  },
);
Root.displayName = 'Avatar.Root';

export type AvatarImageProps = SimplifyClassName<BaseAvatar.Image.Props>;

const Image = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => {
    const { image } = avatar();
    return <BaseAvatar.Image ref={ref} className={image({ className })} {...props} />;
  },
);
Image.displayName = 'Avatar.Image';

export type AvatarFallbackProps = SimplifyClassName<BaseAvatar.Fallback.Props>;

const Fallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    const { fallback } = avatar();
    return <BaseAvatar.Fallback ref={ref} className={fallback({ className })} {...props} />;
  },
);
Fallback.displayName = 'Avatar.Fallback';

export const Avatar = { Root, Image, Fallback };
