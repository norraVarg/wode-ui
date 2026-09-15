import { Separator } from './Separator';

export function Horizontal() {
  return (
    <div className="w-64">
      <p>Above</p>
      <Separator className="my-4" />
      <p>Below</p>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="flex h-16 items-center">
      <p>Left</p>
      <Separator orientation="vertical" className="mx-4" />
      <p>Right</p>
    </div>
  );
}
