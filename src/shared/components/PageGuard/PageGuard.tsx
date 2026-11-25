import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import { ErrorFallback } from '../ErrorFallback';

const PageGuard = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
      {children}
    </ErrorBoundary>
  );
};

export default PageGuard;
