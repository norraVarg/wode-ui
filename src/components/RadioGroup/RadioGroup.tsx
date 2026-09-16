import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { Radio as BaseRadio } from '@base-ui/react/radio';
import type { SimplifyClassName } from '../../lib/types';
import { radioGroup } from './RadioGroup.styles';

export type RadioGroupRootProps = SimplifyClassName<BaseRadioGroup.Props<string>>;

function Root({ className, ...props }: RadioGroupRootProps) {
  const { root } = radioGroup();
  return <BaseRadioGroup className={root({ className })} {...props} />;
}
Root.displayName = 'RadioGroup.Root';

export type RadioGroupItemProps = SimplifyClassName<BaseRadio.Root.Props<string>>;

const Item = React.forwardRef<HTMLElement, RadioGroupItemProps>(({ className, ...props }, ref) => {
  const { item, indicator } = radioGroup();
  return (
    <BaseRadio.Root ref={ref} className={item({ className })} {...props}>
      <BaseRadio.Indicator className={indicator()} />
    </BaseRadio.Root>
  );
});
Item.displayName = 'RadioGroup.Item';

export const RadioGroup = { Root, Item };
