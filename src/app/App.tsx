import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';

import { ErrorFallback, Loader } from '@/shared/components';

import { createQueryClient } from './providers/QueryProvider';
import router from './router';

import './styles/fonts.scss';
import './styles/reboot.scss';
import './styles/global.scss';
import 'swiper/css';

const queryClient = createQueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
