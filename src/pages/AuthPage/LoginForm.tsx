import logoDark from '@assets/images/logoDark.png';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Close, Email, Password } from '@/assets/icons';
import {
  getProfileGETQueryKey,
  useAuthLoginPOST,
} from '@/shared/api/generated/auth/auth';
import { getFavoritesGETQueryKey } from '@/shared/api/generated/favorites/favorites';
import type { AuthInfo } from '@/shared/api/generated/model';
import { Button, Overlay } from '@/shared/components';
import { useBodyScrollLock } from '@/shared/hooks';

import styles from './styles.module.scss';

const LoginForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const isLoginModalOpen = searchParams.get('modalMode') === 'login';
  useBodyScrollLock(isLoginModalOpen);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AuthInfo>();

  const { mutate, isError, isPending } = useAuthLoginPOST({
    mutation: {
      onSuccess: async (response) => {
        if (response.status !== 200) {
          throw new Error('Ошибка входа');
        }
        setSearchParams({});
        await queryClient.refetchQueries({
          queryKey: getProfileGETQueryKey(),
        });
        await queryClient.refetchQueries({
          queryKey: getFavoritesGETQueryKey(),
        });
        reset();
      },
      onError: (error) => {
        console.error('Ошибка входа:', error);
      },
    },
  });

  const onSubmit = (data: AuthInfo) => {
    mutate({ data: { email: data.email, password: data.password } });
  };

  return (
    <Overlay>
      <div className={styles.modal}>
        <div className={styles.modalLogo} aria-label="Логотип сайта">
          <img
            src={logoDark}
            width="144"
            height="32"
            alt="Логотип сайта: Овал и надпись Маруся"
          />
        </div>
        <form className={styles.modalForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.modalFormLabel}>
            <Email aria-hidden="true" />
            <input
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Некорректный email',
                },
              })}
              className={styles.modalFormInput}
              type="email"
              name="email"
              placeholder="Электронная почта"
            />
          </label>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
          <label className={styles.modalFormLabel}>
            <Password aria-hidden="true" />
            <input
              {...register('password', {
                required: 'Обязательное поле',
                minLength: { value: 5, message: 'Не менее пяти символов' },
              })}
              className={styles.modalFormInput}
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </label>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
          <Button buttonColor="secondary" type="submit" disabled={isPending}>
            {isPending ? 'Вхожу...' : 'Войти'}
          </Button>
          <Button
            className={styles.modalBtnReg}
            type="button"
            onClick={() => setSearchParams({ modalMode: 'register' })}
          >
            Регистрация
          </Button>
          {isError && (
            <p className={styles.errorMessage}>Неверный email или пароль</p>
          )}
        </form>
        <button
          className={styles.modalBtnClose}
          type="button"
          onClick={() => {
            setSearchParams({});
            reset();
          }}
          aria-label="Закрыть модальное окно"
        >
          <Close aria-hidden="true" />
        </button>
      </div>
    </Overlay>
  );
};

export default LoginForm;
