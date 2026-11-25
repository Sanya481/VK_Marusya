import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import {
  getProfileGETQueryKey,
  useProfileGET,
} from '@/shared/api/generated/auth/auth';
import {
  getFavoritesGETQueryKey,
  useFavoritesMovieIdDELETE,
  useFavoritesPOST,
} from '@/shared/api/generated/favorites/favorites';

export const useFavoritesManager = (movieId?: number) => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading: isProfileLoading } = useProfileGET({
    query: { retry: false },
  });

  const favoritesList = profile?.data.favorites;
  const isFavorite =
    favoritesList &&
    favoritesList.length > 0 &&
    favoritesList.includes(String(movieId));

  const invalidateCache = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: getProfileGETQueryKey() });
    queryClient.invalidateQueries({ queryKey: getFavoritesGETQueryKey() });
  }, [queryClient]);

  const { mutate: addToFavorites, isPending: isAdding } = useFavoritesPOST({
    mutation: { onSuccess: invalidateCache },
  });

  const { mutate: deleteFromFavorites, isPending: isDeleting } =
    useFavoritesMovieIdDELETE({
      mutation: { onSuccess: invalidateCache },
    });

  const toggleFavorite = useCallback(() => {
    if (!movieId) return;
    if (isFavorite) {
      deleteFromFavorites({ movieId });
    } else {
      addToFavorites({ data: { id: movieId?.toString() } });
    }
  }, [addToFavorites, deleteFromFavorites, isFavorite, movieId]);

  return {
    isProfileLoading,
    isPending: isAdding || isDeleting,
    isFavorite,
    toggleFavorite,
    isAuthorized: !!profile?.data,
  };
};
