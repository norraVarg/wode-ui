import * as React from 'react';
import { Toast as BaseToast } from '@base-ui/react/toast';
import type { SimplifyClassName } from '../../lib/types';
import { toast } from './Toast.styles';

const Provider = BaseToast.Provider;
const useToastManager = BaseToast.useToastManager;
const createToastManager = BaseToast.createToastManager;

export type ToastViewportProps = SimplifyClassName<BaseToast.Viewport.Props>;

const Viewport = React.forwardRef<HTMLDivElement, ToastViewportProps>(
  ({ className, ...props }, ref) => {
    const { toasts } = useToastManager();
    const styles = toast();
    return (
      <BaseToast.Portal>
        <BaseToast.Viewport ref={ref} className={styles.viewport({ className })} {...props}>
          {toasts.map((t) => (
            <BaseToast.Root key={t.id} toast={t} className={styles.root()}>
              <div className={styles.content()}>
                {t.title ? <BaseToast.Title className={styles.title()} /> : null}
                {t.description ? <BaseToast.Description className={styles.description()} /> : null}
              </div>
              <BaseToast.Close aria-label="Dismiss" className={styles.close()}>
                <svg viewBox="0 0 12 12" fill="none" className="size-3" aria-hidden="true">
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </BaseToast.Close>
            </BaseToast.Root>
          ))}
        </BaseToast.Viewport>
      </BaseToast.Portal>
    );
  },
);
Viewport.displayName = 'Toast.Viewport';

export const Toast = { Provider, Viewport, useToastManager, createToastManager };
