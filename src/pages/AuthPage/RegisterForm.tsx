import logoDark from '@assets/images/logoDark.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { type RegisterData, useRegisterWithString } from '@/api/user';
import { Close, Email, Password, User } from '@/assets/icons';
import { Button, Overlay } from '@/shared/components';
import { useBodyScrollLock } from '@/shared/hooks';
import { serializeToFormUrlEncoded } from '@/shared/utils/serializeToFormUrlEncoded';

import { SuccessModal } from './components/SuccessModal';
import styles from './styles.module.scss';

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

const RegisterForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRegistrationSuccess, setIsRegistrationSuccess] =
    useState<boolean>(false);

  const isRegisterModalOpen = searchParams.get('modalMode') === 'register';
  useBodyScrollLock(isRegisterModalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<RegisterFormData>();

  const registerMutation = useRegisterWithString(() => {
    setIsRegistrationSuccess(true);
    reset();
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...apiPayload } = data;

    const formString = serializeToFormUrlEncoded(apiPayload);
    registerMutation.mutate(formString);
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

        {!isRegistrationSuccess ? (
          <form className={styles.modalForm} onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
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
                placeholder="Электронная почта"
              />
            </label>
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}

            {/* Имя */}
            <label className={styles.modalFormLabel}>
              <User aria-hidden="true" />
              <input
                {...register('name', { required: 'Обязательное поле' })}
                className={styles.modalFormInput}
                type="text"
                placeholder="Имя"
              />
            </label>
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}

            {/* Фамилия */}
            <label className={styles.modalFormLabel}>
              <User aria-hidden="true" />
              <input
                {...register('surname')}
                className={styles.modalFormInput}
                type="text"
                placeholder="Фамилия"
              />
            </label>
            {errors.surname && (
              <p className={styles.errorMessage}>{errors.surname.message}</p>
            )}

            {/* Пароль */}
            <label className={styles.modalFormLabel}>
              <Password aria-hidden="true" />
              <input
                {...register('password', {
                  required: 'Обязательное поле',
                  minLength: { value: 5, message: 'Не менее пяти символов' },
                })}
                className={styles.modalFormInput}
                type="password"
                placeholder="Пароль"
              />
            </label>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}

            {/* Подтверждение пароля */}
            <label className={styles.modalFormLabel}>
              <Password aria-hidden="true" />
              <input
                {...register('confirmPassword', {
                  required: 'Обязательное поле',
                  validate: (value) => {
                    const password = getValues('password');
                    if (!value.trim()) return 'Подтвердите пароль';
                    if (password !== value.trim())
                      return 'Пароли должны совпадать';
                    return true;
                  },
                })}
                className={styles.modalFormInput}
                type="password"
                placeholder="Подтвердите пароль"
              />
            </label>
            {errors.confirmPassword && (
              <p className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </p>
            )}

            <Button
              buttonColor="secondary"
              type="submit"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Создаю...' : 'Создать аккаунт'}
            </Button>

            <Button
              className={styles.modalBtnReg}
              type="button"
              onClick={() => setSearchParams({ modalMode: 'login' })}
            >
              У меня есть пароль
            </Button>

            {registerMutation.isError && (
              <p className={styles.errorMessage}>
                {registerMutation.error?.message || 'Ошибка регистрации'}
              </p>
            )}
          </form>
        ) : (
          <SuccessModal
            title="Регистрация завершена"
            subtitle="Используйте вашу электронную почту для входа"
            onClick={() => setSearchParams({ modalMode: 'login' })}
          />
        )}

        <button
          className={styles.modalBtnClose}
          type="button"
          onClick={() => setSearchParams({})}
          aria-label="Закрыть модальное окно"
        >
          <Close aria-hidden="true" />
        </button>
      </div>
    </Overlay>
  );
};

export default RegisterForm;
