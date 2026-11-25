import { lazy, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PageGuard } from '@/shared/components';

import { AppLayout } from './layouts/AppLayout';

const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const MoviePage = lazy(() => import('@pages/MoviePage/MoviePage'));
const GenresPage = lazy(() => import('@pages/GenresPage/GenresPage'));
const GenreMoviesPage = lazy(
  () => import('@pages/GenreMoviesPage/GenreMoviesPage')
);
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const FavoriteList = lazy(() => import('@domains/favorite/FavoriteList'));
const UserSettings = lazy(
  () => import('@domains/user/components/UserSettings/UserSettings')
);

const withGuard = (element: ReactNode) => <PageGuard>{element}</PageGuard>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: withGuard(<HomePage />),
      },
      {
        path: 'movie/:id',
        element: withGuard(<MoviePage />),
      },
      {
        path: 'genres',
        element: withGuard(<GenresPage />),
      },
      {
        path: 'genres/:genre',
        element: withGuard(<GenreMoviesPage />),
      },
      {
        path: 'profile',
        element: withGuard(<ProfilePage />),
        children: [
          {
            index: true,
            element: <Navigate to="favorites" replace />,
          },
          {
            path: 'favorites',
            element: withGuard(<FavoriteList />),
          },
          {
            path: 'user-settings',
            element: withGuard(<UserSettings />),
          },
        ],
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;
