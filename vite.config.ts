import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  //  Загружаем переменные окружения из .env
  const env = loadEnv(mode, process.cwd(), '');
  const API_TARGET = env.VITE_API_TARGET;

  //  Защита: если забыли указать URL в .env, сборка упадет с понятной ошибкой
  if (!API_TARGET) {
    throw new Error(
      '❌ Ошибка: Переменная VITE_API_TARGET не задана в файле .env'
    );
  }

  // Общие настройки прокси для всех роутов
  const proxyOptions = {
    target: API_TARGET,
    changeOrigin: true,
    secure: false,
  };

  return {
    plugins: [
      react(),
      analyzer({
        enabled: true,
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
    root: '.',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@generated': fileURLToPath(
          new URL('./src/shared/api/generated', import.meta.url)
        ),
        '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@domains': fileURLToPath(new URL('./src/domains', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/shared/utils', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/app/styles', import.meta.url)),
        '@components': fileURLToPath(
          new URL('./src/shared/components', import.meta.url)
        ),
      },
    },
    server: {
      open: true,
      proxy: {
        '/movie': proxyOptions,
        '/auth': proxyOptions,
        '/user': proxyOptions,
        '/profile': proxyOptions,
        '/favorites': proxyOptions,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@styles/variables" as *;
          @use "@styles/mixins" as *;
          `,
        },
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        input: 'index.html',
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] || assetInfo.name || '';

            // CSS файлы
            if (name.endsWith('.css')) {
              return 'css/[name]-[hash][extname]';
            }

            // Изображения
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
              return 'images/[name]-[hash][extname]';
            }

            // Шрифты
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
              return 'fonts/[name]-[hash][extname]';
            }

            // Остальные ресурсы
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
        },
      },
    },
  };
});
