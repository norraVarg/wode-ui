import { tv } from 'tailwind-variants';

export const accordion = tv({
  slots: {
    item: 'border-border border-b',
    header: 'flex',
    trigger: [
      'group text-fg flex flex-1 items-center justify-between py-3 text-left text-sm font-medium',
      'outline-none',
      'focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-2',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    icon: 'text-muted-fg shrink-0 transition-transform group-data-[panel-open]:rotate-180',
    panel: [
      'text-muted-fg h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200',
      'data-[starting-style]:h-0 data-[ending-style]:h-0',
    ],
    panelContent: 'pb-3',
  },
});
