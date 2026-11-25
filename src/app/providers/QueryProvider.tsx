import { type DefaultOptions, QueryClient } from '@tanstack/react-query';

export const createQueryClient = (defaultOptions?: DefaultOptions) => {
  return new QueryClient({
    defaultOptions: {
      ...defaultOptions,
      queries: {
        ...defaultOptions?.queries,
        refetchOnWindowFocus: false, // ← отключаем автообновление при фокусе
        staleTime: Infinity, // ← данные всегда свежие
      },
    },
  });
};
