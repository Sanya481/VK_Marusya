const PAGE_SIZE = 10;

/**
 * Мутатор для пагинации.
 *
 * 1. Возвращаемый тип ': any' критически важен!
 *    Это заставляет TypeScript в сгенерированном файле (movies.ts)
 *    воспринимать результат как 'any', что позволяет ему успешно
 *    выполнить приведение типа (as UseInfiniteQueryOptions) без ошибки TS2352.
 */
export const nextPageParamMutator = (options: Record<string, unknown>) => {
  const result = {
    getNextPageParam: (
      lastPage: Record<string, unknown> | Array<Record<string, unknown>>,
      allPages: unknown[]
    ) => {
      const items = Array.isArray(lastPage)
        ? lastPage
        : Object.values(lastPage)[0];

      if (Array.isArray(items) && items.length < PAGE_SIZE) {
        return undefined;
      }

      return allPages.length;
    },
    ...options,
  };
  // 2. Обязательно пробрасываем options!
  // Именно отсюда в сгенерированный хук прилетают queryKey, queryFn и initialPageParam.
  // Без этого TS видит "пустой" объект и выдает ошибку "missing properties".
  return result as unknown;
};
