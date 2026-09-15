import type { ComponentType } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import '../../../src/styles/index.css';

// Story id scheme is ours to define (Playwright's gallery contract is
// "yours to own"): "<ComponentFolder>/<ExportName>", matching our
// per-component folder convention - e.g. "Button/Primary" resolves to the
// `Primary` export of src/components/Button/Button.story.tsx.
type StoryModule = Record<string, ComponentType<Record<string, unknown>>>;

const storyModules = import.meta.glob<StoryModule>('/src/components/*/*.story.tsx');

function findStoryFile(componentFolder: string): string | undefined {
  return Object.keys(storyModules).find((path) =>
    path.endsWith(`/${componentFolder}/${componentFolder}.story.tsx`),
  );
}

async function resolveStory(storyId: string): Promise<ComponentType<Record<string, unknown>>> {
  const separatorIndex = storyId.lastIndexOf('/');
  const componentFolder = storyId.slice(0, separatorIndex);
  const exportName = storyId.slice(separatorIndex + 1);

  const filePath = findStoryFile(componentFolder);
  if (!filePath) {
    throw new Error(`No story file found for component "${componentFolder}".`);
  }

  const mod = await storyModules[filePath]();
  const Story = mod[exportName];
  if (!Story) {
    throw new Error(`Story file for "${componentFolder}" has no export named "${exportName}".`);
  }
  return Story;
}

let root: Root | undefined;

declare global {
  interface Window {
    mount: (options: { story: string; props?: Record<string, unknown> }) => Promise<void>;
    unmount: () => Promise<void>;
  }
}

window.mount = async ({ story, props }) => {
  const Story = await resolveStory(story);
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Gallery root element (#root) not found.');
  }
  root ??= createRoot(container);
  flushSync(() => {
    root!.render(<Story {...(props ?? {})} />);
  });
};

window.unmount = () => {
  root?.unmount();
  root = undefined;
  return Promise.resolve();
};
