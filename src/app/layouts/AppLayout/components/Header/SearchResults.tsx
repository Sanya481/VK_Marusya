import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';

import { GENRES, type GenreKey } from '@/domains/genre/constants/genres';
import { MovieRating } from '@/domains/movie';
import type { Movie } from '@/shared/api/generated/model';
import { formatRuntime } from '@/shared/utils';

import styles from './styles.module.scss';

type SearchResultsProps = {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
} & ComponentPropsWithoutRef<'ul'>;

const SearchResults = (props: SearchResultsProps) => {
  const { movies, isLoading, isError, className, ...rest } = props;

  return (
    <>
      {isLoading && <div>Идёт поиск...</div>}
      {isError && <div>Произошла ошибка при поиске...</div>}

      {movies?.length === 0 && <div>Ничего не найдено</div>}

      <ul className={clsx(styles.searchList, className)} {...rest}>
        {movies?.map((movie: Movie) => (
          <li className={styles.searchItem} key={movie.id}>
            <Link
              className={styles.searchFilmLink}
              to={`/movie/${movie.id}`}
              aria-label={`Перейти к фильму ${movie.title}`}
            >
              <div className={styles.searchFilmContent}>
                <h3 className={styles.searchFilmTitle}>{movie.title}</h3>
                <ul className={styles.searchFilmInfo}>
                  <li>
                    <MovieRating rating={movie?.tmdbRating} size="S" />
                  </li>
                  <li>
                    <span>{movie.releaseYear}</span>
                  </li>
                  <li>
                    <span>
                      {(movie.genres?.[0] &&
                        GENRES[movie.genres?.[0] as GenreKey].title) ??
                        movie.genres?.[0]}
                    </span>
                  </li>
                  <li>
                    <span>{formatRuntime(movie.runtime)}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.searchFilmImgWrapper}>
                <img
                  className={styles.searchFilmImg}
                  width="40"
                  height="52"
                  src={movie.posterUrl}
                  alt={movie.title}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
