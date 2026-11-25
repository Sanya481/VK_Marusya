import { defineConfig } from 'orval';

const INFINITE_QUERY_OPTIONS = {
  useQuery: false, // не генерировать обычный useQuery
  useMutation: false, // не генерировать useMutation
  useInfinite: true, // ✅ генерировать useInfiniteQuery
  useInfiniteQueryParam: 'page', // параметр в запросе для страницы
  queryOptions: {
    path: './src/shared/api/utils/query-options-mutators.ts',
    name: 'nextPageParamMutator',
  },
  initialPageParam: 0,
};

export default defineConfig({
  vkMarusya: {
    input: {
      target: './openapi/schema.json',
      filters: {
        mode: 'exclude',
        operationIds: ['userPOST'],
      },
    },

    output: {
      // Куда генерировать
      target: './src/shared/api/generated/api.ts', // основной файл с клиентом

      schemas: './src/shared/api/generated/model', // папка для типов
      client: 'react-query', // Генерируем React Query хуки!
      // Разделяем по тегам (auth, movies, favorites) и игнорируем target как единый файл
      mode: 'tags-split',
      formatter: 'prettier', // Использовать Prettier или TypeScript Formatter'
      clean: true, // Очищать папку перед генерацией
      indexFiles: true,
      tagsSplitDeduplication: true,
      override: {
        operations: {
          movieGET: {
            query: INFINITE_QUERY_OPTIONS,
          },
        },
      },
    },
  },
});

/**
 Важно: При mode: 'tags-split' Orval игнорирует target как единый файл, а создаёт папки по тегам. target используется как базовая директория для этих папок.
 */
