import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useSearchParams } from 'react-router-dom';

import LoginForm from '@/pages/AuthPage/LoginForm';
import RegisterForm from '@/pages/AuthPage/RegisterForm';
import { ErrorFallback } from '@/shared/components';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import styles from './styles.module.scss';

const AppLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />

      {searchParams.get('modalMode') === 'login' && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setSearchParams({})}
        >
          <LoginForm />
        </ErrorBoundary>
      )}
      {searchParams.get('modalMode') === 'register' && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setSearchParams({})}
        >
          <RegisterForm />
        </ErrorBoundary>
      )}
    </>
  );
};

export default AppLayout;
