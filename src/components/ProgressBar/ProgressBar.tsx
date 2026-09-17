import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import type { SimplifyClassName } from '../../lib/types';
import { progressBar } from './ProgressBar.styles';

export type ProgressBarRootProps = SimplifyClassName<BaseProgress.Root.Props>;

const Root = React.forwardRef<HTMLDivElement, ProgressBarRootProps>(
  ({ className, ...props }, ref) => {
    const { root } = progressBar();
    return <BaseProgress.Root ref={ref} className={root({ className })} {...props} />;
  },
);
Root.displayName = 'ProgressBar.Root';

export type ProgressBarLabelProps = SimplifyClassName<BaseProgress.Label.Props>;

const Label = React.forwardRef<HTMLSpanElement, ProgressBarLabelProps>(
  ({ className, ...props }, ref) => {
    const { label } = progressBar();
    return <BaseProgress.Label ref={ref} className={label({ className })} {...props} />;
  },
);
Label.displayName = 'ProgressBar.Label';

export type ProgressBarValueProps = SimplifyClassName<BaseProgress.Value.Props>;

const Value = React.forwardRef<HTMLSpanElement, ProgressBarValueProps>(
  ({ className, ...props }, ref) => {
    const { value } = progressBar();
    return <BaseProgress.Value ref={ref} className={value({ className })} {...props} />;
  },
);
Value.displayName = 'ProgressBar.Value';

export type ProgressBarTrackProps = SimplifyClassName<BaseProgress.Track.Props>;

const Track = React.forwardRef<HTMLDivElement, ProgressBarTrackProps>(
  ({ className, ...props }, ref) => {
    const { track } = progressBar();
    return <BaseProgress.Track ref={ref} className={track({ className })} {...props} />;
  },
);
Track.displayName = 'ProgressBar.Track';

export type ProgressBarIndicatorProps = SimplifyClassName<BaseProgress.Indicator.Props>;

const Indicator = React.forwardRef<HTMLDivElement, ProgressBarIndicatorProps>(
  ({ className, ...props }, ref) => {
    const { indicator } = progressBar();
    return <BaseProgress.Indicator ref={ref} className={indicator({ className })} {...props} />;
  },
);
Indicator.displayName = 'ProgressBar.Indicator';

export const ProgressBar = { Root, Label, Value, Track, Indicator };
