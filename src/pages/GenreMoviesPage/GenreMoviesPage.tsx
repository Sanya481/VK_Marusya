import { Link, useParams } from 'react-router-dom';

import { ArrowLeft } from '@/assets/icons';
import posterPlaceholder from '@/assets/images/posterPlaceholder.jpg';
import { GENRES, type GenreKey } from '@/domains/genre/constants/genres';
import { useMovieGETInfinite } from '@/shared/api/generated/movies/movies';
import { Button, Loader } from '@/shared/components';

import styles from './styles.module.scss';

const PAGE_SIZE = 10;

const GenreMoviesPage = () => {
  const { genre } = useParams<{ genre: GenreKey }>();
  const displayTitle = genre ? GENRES[genre].title : 'Фильмы';

  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
  } = useMovieGETInfinite({ genre, count: PAGE_SIZE });

  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  if (isError)
    return <div>Ошибка загрузки фильмов жанра {displayTitle}...</div>;

  const allMovies = data?.pages.flatMap((page) => page.data) ?? [];

  if (allMovies.length === 0) {
    return <div>Нет фильмов в жанре {displayTitle}</div>;
  }

  return (
    <section className={styles.genreContainer}>
      <div className={styles.genreContent}>
        <h2 className={styles.sectionTitle}>{displayTitle}</h2>
        <Link
          className={styles.arrowIcon}
          to="/genres"
          aria-label="Вернуться назад"
        >
          <ArrowLeft aria-hidden="true" />
        </Link>
      </div>

      <ul className={styles.genreList}>
        {allMovies.map((movie) => (
          <li key={movie.id}>
            <Link className={styles.genreLink} to={`/movie/${movie.id}`}>
              <img
                className={styles.genreImg}
                src={movie.posterUrl ?? posterPlaceholder}
                loading="lazy"
                alt={movie.title}
              />
            </Link>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <Button
          className={styles.genreBtnMore}
          buttonColor="secondary"
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Загрузка...' : 'Показать ещё'}
        </Button>
      )}
    </section>
  );
};

export default GenreMoviesPage;
