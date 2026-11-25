import { clsx } from 'clsx';
import { useCallback } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Link, useSearchParams } from 'react-router-dom';

import { Favorite, Refresh } from '@/assets/icons';
import posterPlaceholder from '@/assets/images/posterPlaceholder.jpg';
import { useFavoritesManager } from '@/domains/favorite/hooks';
import { GENRES, type GenreKey } from '@/domains/genre/constants/genres';
import type { Movie } from '@/shared/api/generated/model';
import { Button, Loader } from '@/shared/components';
import { useBodyScrollLock } from '@/shared/hooks';
import { formatRuntime } from '@/shared/utils/formatRuntime';

import { MovieRating } from '../MovieRating';
import { VideoModal } from '../VideoModal';
import styles from './styles.module.scss';

type MovieCardProps = {
  movie: Movie;
  isFetching?: boolean;
  refetch?: () => void;
  showDetailsLink?: boolean;
  isLoading: boolean;
  isError: boolean;
};

const MovieCard = (props: MovieCardProps) => {
  const {
    movie,
    isFetching,
    refetch,
    showDetailsLink,
    isLoading: isMovieRandomLoading,
    isError: isMovieRandomError,
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const isTrailerOpen = searchParams.get('trailer') === 'open';
  useBodyScrollLock(isTrailerOpen);

  const {
    isAuthorized,
    isFavorite,
    isPending,
    toggleFavorite,
    isProfileLoading,
  } = useFavoritesManager(movie.id);

  const getFavoriteButtonProps = useCallback(() => {
    if (isProfileLoading) {
      return {
        onClick: undefined,
        disabled: true,
        'aria-label': 'Загрузка профиля',
      };
    }
    if (!isAuthorized) {
      return {
        onClick: () => setSearchParams({ modalMode: 'login' }),
        disabled: false,
        'aria-label': 'Войти в аккаунт',
      };
    }
    return {
      onClick: toggleFavorite,
      disabled: isPending,
      'aria-label': isFavorite
        ? 'Удалить из избранного'
        : 'Добавить в избранное',
    };
  }, [
    isProfileLoading,
    isAuthorized,
    toggleFavorite,
    isPending,
    isFavorite,
    setSearchParams,
  ]);

  return (
    <section className={styles.movieCardContainer}>
      {isMovieRandomLoading && <Loader />}
      {isMovieRandomError && <div>Ошибка загрузки случайного фильма...</div>}

      <div className={styles.movieCardContent}>
        <div className={styles.movieCardHeader}>
          <h3 className={styles.movieCardTitle}>{movie?.title}</h3>
          <p className={styles.movieCardSubtitle}>{movie?.plot}</p>
        </div>

        <ul className={styles.movieCardInfo}>
          <li>
            <MovieRating rating={movie?.tmdbRating} />
          </li>
          <li>
            <span>{movie?.releaseYear}</span>
          </li>

          <li className={styles.movieCardGenres}>
            {movie?.genres?.map((genre, index) => {
              const genreInfo = GENRES[genre as GenreKey];
              if (!genreInfo) return null;
              return (
                <Fragment key={index}>
                  <span>{genreInfo.title}</span>
                  {movie.genres && index < movie.genres.length - 1 && (
                    <span className={styles.separator}>|</span>
                  )}
                </Fragment>
              );
            })}
          </li>

          <li>
            <span>{formatRuntime(movie?.runtime)}</span>
          </li>
        </ul>

        <ul className={styles.movieCardActions}>
          <li className={styles.movieCardTrailer}>
            <Button
              className={styles.movieCardTrailerBtn}
              buttonColor="secondary"
              onClick={() => setSearchParams({ trailer: 'open' })}
            >
              Трейлер
            </Button>
          </li>
          {showDetailsLink && (
            <li>
              <Link className={styles.movieCardLink} to={`/movie/${movie?.id}`}>
                О фильме
              </Link>
            </li>
          )}
          <li>
            <Button
              className={clsx(styles.favoriteBtn, {
                [styles.isFavorite]: isFavorite,
                [styles.isAdding]: isPending,
              })}
              buttonForm="onlyIcon"
              {...getFavoriteButtonProps()}
            >
              <Favorite aria-hidden="true" />
            </Button>
          </li>
          {refetch && (
            <li>
              <Button
                className={styles.refreshBtn}
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                aria-label="Запросить новый фильм"
                buttonForm="onlyIcon"
              >
                <Refresh
                  className={clsx(styles.refreshIcon, {
                    [styles.spin]: isFetching,
                  })}
                  aria-hidden="true"
                />
              </Button>
            </li>
          )}
        </ul>
      </div>

      <div className={styles.movieCardImgWrapper}>
        <img
          className={styles.movieCardImg}
          src={movie?.posterUrl ?? posterPlaceholder}
          width="680"
          height="552"
          alt={movie?.title}
        />
      </div>

      {searchParams.get('trailer') === 'open' && (
        <VideoModal
          title={movie.title ?? ''}
          videoId={movie.trailerYouTubeId ?? ''}
          onClose={() => setSearchParams({})}
        />
      )}
    </section>
  );
};

export default MovieCard;
