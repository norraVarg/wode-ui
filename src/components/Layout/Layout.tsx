import * as React from 'react';
import { layout } from './Layout.styles';

export interface LayoutProps {
  /**
   * Which named shell shape to render.
   * @default 'stacked-one'
   */
  variant?: 'stacked-one';
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
}

export function Layout({
  variant = 'stacked-one',
  header,
  content,
  footer,
  className,
}: LayoutProps) {
  const styles = layout({ variant });
  return (
    <div className={styles.root({ className })}>
      <div className={styles.header()}>{header}</div>
      <div className={styles.content()}>{content}</div>
      <div className={styles.footer()}>{footer}</div>
    </div>
  );
}
