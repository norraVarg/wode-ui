import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { SimplifyClassName } from '../../lib/types';
import { dialog } from './Dialog.styles';

const Root = BaseDialog.Root;
const Trigger = BaseDialog.Trigger;
const Close = BaseDialog.Close;

export type DialogPopupProps = SimplifyClassName<BaseDialog.Popup.Props>;

const Popup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, children, ...props }, ref) => {
    const styles = dialog();
    return (
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop()} />
        <BaseDialog.Popup ref={ref} className={styles.popup({ className })} {...props}>
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    );
  },
);
Popup.displayName = 'Dialog.Popup';

export type DialogTitleProps = SimplifyClassName<BaseDialog.Title.Props>;

const Title = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    const styles = dialog();
    return <BaseDialog.Title ref={ref} className={styles.title({ className })} {...props} />;
  },
);
Title.displayName = 'Dialog.Title';

export type DialogDescriptionProps = SimplifyClassName<BaseDialog.Description.Props>;

const Description = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const styles = dialog();
    return (
      <BaseDialog.Description ref={ref} className={styles.description({ className })} {...props} />
    );
  },
);
Description.displayName = 'Dialog.Description';

export type DialogIconCloseProps = SimplifyClassName<BaseDialog.Close.Props>;

const IconClose = React.forwardRef<HTMLButtonElement, DialogIconCloseProps>(
  ({ className, 'aria-label': ariaLabel = 'Close', ...props }, ref) => {
    const styles = dialog();
    return (
      <BaseDialog.Close
        ref={ref}
        aria-label={ariaLabel}
        className={styles.iconClose({ className })}
        {...props}
      >
        <svg viewBox="0 0 12 12" fill="none" className="size-3" aria-hidden="true">
          <path
            d="M1 1L11 11M11 1L1 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </BaseDialog.Close>
    );
  },
);
IconClose.displayName = 'Dialog.IconClose';

function Header({ className, ...props }: React.ComponentProps<'div'>) {
  const styles = dialog();
  return <div className={styles.header({ className })} {...props} />;
}

function Body({ className, ...props }: React.ComponentProps<'div'>) {
  const styles = dialog();
  return <div className={styles.body({ className })} {...props} />;
}

function Footer({ className, ...props }: React.ComponentProps<'div'>) {
  const styles = dialog();
  return <div className={styles.footer({ className })} {...props} />;
}

export const Dialog = {
  Root,
  Trigger,
  Popup,
  Title,
  Description,
  Close,
  IconClose,
  Header,
  Body,
  Footer,
};
