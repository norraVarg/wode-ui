import { ProgressBar } from './ProgressBar';

export function Default() {
  return (
    <ProgressBar.Root value={40}>
      <ProgressBar.Label>Uploading</ProgressBar.Label>
      <ProgressBar.Value />
      <ProgressBar.Track>
        <ProgressBar.Indicator />
      </ProgressBar.Track>
    </ProgressBar.Root>
  );
}

export function Complete() {
  return (
    <ProgressBar.Root value={100}>
      <ProgressBar.Label>Uploading</ProgressBar.Label>
      <ProgressBar.Value />
      <ProgressBar.Track>
        <ProgressBar.Indicator />
      </ProgressBar.Track>
    </ProgressBar.Root>
  );
}

export function Indeterminate() {
  return (
    <ProgressBar.Root value={null}>
      <ProgressBar.Label>Uploading</ProgressBar.Label>
      <ProgressBar.Value />
      <ProgressBar.Track>
        <ProgressBar.Indicator />
      </ProgressBar.Track>
    </ProgressBar.Root>
  );
}
