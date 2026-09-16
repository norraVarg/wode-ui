import { TextField } from './TextField';

export function Default() {
  return (
    <TextField.Root>
      <TextField.Label>Email</TextField.Label>
      <TextField.Input placeholder="you@example.com" />
      <TextField.Description>We&apos;ll never share your email.</TextField.Description>
    </TextField.Root>
  );
}

export function Invalid() {
  return (
    <TextField.Root invalid>
      <TextField.Label>Email</TextField.Label>
      <TextField.Input placeholder="you@example.com" />
      <TextField.Error match>Enter a valid email address.</TextField.Error>
    </TextField.Root>
  );
}

export function Disabled() {
  return (
    <TextField.Root disabled>
      <TextField.Label>Email</TextField.Label>
      <TextField.Input placeholder="you@example.com" />
      <TextField.Description>We&apos;ll never share your email.</TextField.Description>
    </TextField.Root>
  );
}
