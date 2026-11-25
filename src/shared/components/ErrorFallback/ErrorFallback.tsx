import { type FallbackProps, getErrorMessage } from 'react-error-boundary';

import { Button } from '../Button';

const ErrorFallback = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  console.log('ErrorFallback', error);

  return (
    <div>
      <p>{getErrorMessage(error) ?? 'Произошла ошибка'}</p>

      <Button onClick={resetErrorBoundary}>Попробовать снова</Button>
    </div>
  );
};

export default ErrorFallback;
