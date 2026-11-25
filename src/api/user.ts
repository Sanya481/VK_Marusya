import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getProfileGETQueryKey } from '../shared/api/generated/auth/auth';

// 1. ТИП (если Orval его не сгенерировал)
export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

// 2. КАСТОМНЫЙ ХУК: Принимает СТРОКУ, а не объект
export const useRegisterWithString = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, string>({
    mutationFn: async (formBodyString) => {
      const response = await fetch('/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBodyString,
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || 'Ошибка регистрации');
      }
      return JSON.parse(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getProfileGETQueryKey(),
      });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};
