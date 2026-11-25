import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Close, Search } from '@/assets/icons';
import { GENRES, type GenreKey } from '@/domains/genre/constants/genres';
import { MovieRating } from '@/domains/movie';
import { useMovieGETInfinite } from '@/shared/api/generated';
import { useBodyScrollLock } from '@/shared/hooks';
import { formatRuntime } from '@/shared/utils/formatRuntime';

import SearchResults from './SearchResults';
import styles from './styles.module.scss';

const MovieSearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useBodyScrollLock(isMobileSearchOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: responseSearchMovies,
    isLoading,
    isError,
  } = useMovieGETInfinite(
    {
      count: 5,
      title: debouncedQuery,
    },
    { query: { enabled: debouncedQuery.length > 0 } }
  );

  const findMovies = responseSearchMovies?.pages.flatMap((page) => page.data);

  return (
    <div className={styles.searchLabelWrapper}>
      <label className={clsx(styles.searchLabel, styles.desktopSearch)}>
        <Search className={styles.searchIcon} aria-hidden="true" />
        <input
          className={styles.searchInput}
          type="text"
          value={searchQuery}
          onChange={(evt) => setSearchQuery(evt.target.value.trim())}
          placeholder="Поиск"
        />
        {searchQuery && (
          <button
            className={styles.searchBtnClose}
            type="button"
            onClick={() => {
              setSearchQuery('');
              setDebouncedQuery('');
            }}
            aria-label="Очистить поиск фильмов по сайту"
          >
            <Close aria-hidden="true" />
          </button>
        )}
      </label>

      <button
        type="button"
        className={styles.mobileSearch}
        onClick={() => setIsMobileSearchOpen(true)}
      >
        <Search aria-label="Поиск фильмов по сайту" />
      </button>

      {isMobileSearchOpen &&
        createPortal(
          <div
            className={styles.searchOverlay}
            onClick={() => {
              setIsMobileSearchOpen(false);
              setSearchQuery('');
              setDebouncedQuery('');
            }}
          >
            <div className={styles.searchMobileContainer}>
              <label
                onClick={(e) => e.stopPropagation()}
                className={clsx(styles.searchLabel, styles.mobileSearchLabel)}
              >
                <Search className={styles.searchIcon} aria-hidden="true" />
                <input
                  className={styles.searchInput}
                  type="text"
                  value={searchQuery}
                  onChange={(evt) => setSearchQuery(evt.target.value.trim())}
                  ref={mobileInputRef}
                  placeholder="Поиск"
                />
                <button
                  className={styles.searchBtnClose}
                  type="button"
                  onClick={() => {
                    setIsMobileSearchOpen(false);
                    setSearchQuery('');
                    setDebouncedQuery('');
                  }}
                  aria-label="Закрыть поиск фильмов по сайту"
                >
                  <Close aria-hidden="true" />
                </button>
              </label>
              {searchQuery && (
                <div className={styles.searchResultsMobile}>
                  {isLoading && <div>Идёт поиск...</div>}
                  {isError && <div>Произошла ошибка при поиске...</div>}

                  {(!findMovies || findMovies?.length === 0) && (
                    <div>Ничего не найдено</div>
                  )}

                  {/* Мобильная версия – свайпер */}
                  <Swiper
                    className={styles.searchList}
                    spaceBetween={40}
                    slidesPerView="auto"
                    loop={true}
                  >
                    {findMovies?.map((movie) => (
                      <SwiperSlide
                        className={clsx(styles.searchItem, styles.swiperSlide)}
                        key={movie.id}
                      >
                        <Link
                          className={styles.searchFilmLink}
                          to={`/movie/${movie.id}`}
                          aria-label={`Перейти к фильму ${movie.title}`}
                        >
                          <div className={styles.searchFilmContent}>
                            <h3 className={styles.searchFilmTitle}>
                              {movie.title}
                            </h3>
                            <ul className={styles.searchFilmInfo}>
                              <li>
                                <MovieRating
                                  rating={movie?.tmdbRating}
                                  size="S"
                                />
                              </li>
                              <li>
                                <span>{movie.releaseYear}</span>
                              </li>
                              <li>
                                <span>
                                  {(movie.genres?.[0] &&
                                    GENRES[movie.genres?.[0] as GenreKey]
                                      .title) ??
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
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {searchQuery && (
        <div
          className={clsx(
            styles.searchContainer,
            styles.desktopSearchContainer
          )}
        >
          <SearchResults
            movies={findMovies ?? []}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default MovieSearchInput;
