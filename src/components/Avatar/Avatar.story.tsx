import { Avatar } from './Avatar';

const AVATAR_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%234f46e5'/%3E%3C/svg%3E";

export function WithImage() {
  return (
    <Avatar.Root>
      <Avatar.Image src={AVATAR_SRC} alt="Jane Doe" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  );
}

export function WithFallback() {
  return (
    <Avatar.Root>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  );
}

export function Small() {
  return (
    <Avatar.Root size="sm">
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  );
}

export function Large() {
  return (
    <Avatar.Root size="lg">
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  );
}
