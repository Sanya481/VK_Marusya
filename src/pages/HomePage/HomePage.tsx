import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { MovieCard } from '@/domains/movie';
import { useMovieRandomGET, useMovieTop10GET } from '@/shared/api/generated';
import { Loader } from '@/shared/components';

import posterPlaceholder from '../../assets/images/posterPlaceholder.jpg';
import styles from './styles.module.scss';

const HomePage = () => {
  const {
    data: responseMovieRandom,
    isLoading: isMovieRandomLoading,
    isError: isMovieRandomError,
    refetch,
    isFetching,
  } = useMovieRandomGET();

  const {
    data: responseMovieTop,
    isLoading: isMovieTopLoading,
    isError: isMovieTopError,
  } = useMovieTop10GET();

  return (
    <>
      {responseMovieRandom?.data && (
        <MovieCard
          movie={responseMovieRandom.data}
          isFetching={isFetching}
          refetch={refetch}
          showDetailsLink={true}
          isLoading={isMovieRandomLoading}
          isError={isMovieRandomError}
        />
      )}

      <section className={styles.topFilmsSection}>
        <div className={styles.topFilmsContainer}>
          <h2 className={styles.topFilmsTitle}>Топ 10 фильмов</h2>

          {isMovieTopLoading && <Loader />}
          {isMovieTopError && <div>Ошибка загрузки топ-10...</div>}

          {responseMovieTop?.data && (
            <>
              {/* Десктопная/планшетная версия – грид */}
              <ul className={styles.topFilmsListGrid}>
                {responseMovieTop.data.map((movie, index) => (
                  <li key={movie.id} className={styles.topFilmsItem}>
                    <Link
                      className={styles.topFilmsLink}
                      to={`/movie/${movie.id}`}
                    >
                      <img
                        className={styles.topFilmsImg}
                        src={movie.posterUrl ?? posterPlaceholder}
                        alt={movie.title}
                      />
                      <span className={styles.topFilmsNumber}>{index + 1}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Мобильная версия – свайпер */}
              <Swiper
                className={styles.topFilmsSwiper}
                spaceBetween={40}
                slidesPerView="auto"
                loop={true}
              >
                {responseMovieTop.data.map((movie, index) => (
                  <SwiperSlide key={movie.id} className={styles.topFilmsSlide}>
                    <Link
                      className={styles.topFilmsLink}
                      to={`/movie/${movie.id}`}
                    >
                      <img
                        className={styles.topFilmsImg}
                        src={movie.posterUrl ?? posterPlaceholder}
                        alt={movie.title}
                      />
                      <span className={styles.topFilmsNumber}>{index + 1}</span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
