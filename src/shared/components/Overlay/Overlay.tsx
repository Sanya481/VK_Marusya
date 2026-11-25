import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './styles.module.scss';

type OverlayProps = {
  onClick?: () => void;
} & ComponentPropsWithoutRef<'div'>;

const Overlay = (props: OverlayProps) => {
  const { onClick, className, children, ...rest } = props;

  return (
    <div
      className={clsx(styles.overlay, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Overlay;
