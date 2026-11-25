import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type ButtonProps = {
  buttonColor?: 'primary' | 'secondary';
  buttonForm?: 'onlyIcon' | 'withText';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const {
    children,
    buttonColor = 'primary',
    buttonForm = 'withText',
    className,
    ...rest
  } = props;

  const buttonClassNames = clsx(
    className,
    styles.button,
    styles[buttonColor],
    styles[buttonForm]
  );

  return (
    <button
      type={props.type ?? 'button'}
      className={buttonClassNames}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
