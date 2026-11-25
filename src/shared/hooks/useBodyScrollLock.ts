import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isLocked);
    return () => document.body.classList.remove('no-scroll');
  }, [isLocked]);
};
