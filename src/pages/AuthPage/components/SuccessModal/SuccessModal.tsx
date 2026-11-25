import type { ComponentPropsWithoutRef } from 'react';

import Button from '../../../../shared/components/Button/Button';
import styles from './styles.module.scss';

type SuccessModalProps = {
  title: string;
  subtitle?: string;
  onClick?: () => void;
} & ComponentPropsWithoutRef<'div'>;

const SuccessModal = (props: SuccessModalProps) => {
  const { onClick, title, subtitle, ...rest } = props;

  return (
    <div className={styles.modalSuccessContent} {...rest}>
      <p className={styles.modalSuccessTitle}>{title}</p>
      {subtitle && <p className={styles.modalSuccessSubtitle}>{subtitle}</p>}
      <Button
        className={styles.modalSuccessBtn}
        buttonColor="secondary"
        onClick={onClick}
      >
        Войти
      </Button>
    </div>
  );
};

export default SuccessModal;
