import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Input as BaseInput } from '@base-ui/react/input';
import type { SimplifyClassName } from '../../lib/types';
import { textField } from './TextField.styles';

export type TextFieldRootProps = SimplifyClassName<Field.Root.Props>;

const Root = React.forwardRef<HTMLDivElement, TextFieldRootProps>(
  ({ className, ...props }, ref) => {
    const { root } = textField();
    return <Field.Root ref={ref} className={root({ className })} {...props} />;
  },
);
Root.displayName = 'TextField.Root';

export type TextFieldLabelProps = SimplifyClassName<Field.Label.Props>;

const Label = React.forwardRef<HTMLElement, TextFieldLabelProps>(({ className, ...props }, ref) => {
  const { label } = textField();
  return <Field.Label ref={ref} className={label({ className })} {...props} />;
});
Label.displayName = 'TextField.Label';

export type TextFieldInputProps = SimplifyClassName<BaseInput.Props>;

const Input = React.forwardRef<HTMLElement, TextFieldInputProps>(({ className, ...props }, ref) => {
  const { control } = textField();
  return <BaseInput ref={ref} className={control({ className })} {...props} />;
});
Input.displayName = 'TextField.Input';

export type TextFieldDescriptionProps = SimplifyClassName<Field.Description.Props>;

const Description = React.forwardRef<HTMLParagraphElement, TextFieldDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { description } = textField();
    return <Field.Description ref={ref} className={description({ className })} {...props} />;
  },
);
Description.displayName = 'TextField.Description';

export type TextFieldErrorProps = SimplifyClassName<Field.Error.Props>;

const Error = React.forwardRef<HTMLDivElement, TextFieldErrorProps>(
  ({ className, ...props }, ref) => {
    const { error } = textField();
    return <Field.Error ref={ref} className={error({ className })} {...props} />;
  },
);
Error.displayName = 'TextField.Error';

export const TextField = { Root, Label, Input, Description, Error };
