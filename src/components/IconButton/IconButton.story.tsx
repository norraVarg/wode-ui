import { IconButton } from './IconButton';

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
      <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Primary() {
  return (
    <IconButton aria-label="Add item">
      <PlusIcon />
    </IconButton>
  );
}

export function Outline() {
  return (
    <IconButton variant="outline" aria-label="Add item">
      <PlusIcon />
    </IconButton>
  );
}

export function Disabled() {
  return (
    <IconButton disabled aria-label="Add item">
      <PlusIcon />
    </IconButton>
  );
}
