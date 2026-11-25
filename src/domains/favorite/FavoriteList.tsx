import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Close } from '@/assets/icons';
import {
  getFavoritesGETQueryKey,
  getProfileGETQueryKey,
  useFavoritesGET,
  useFavoritesMovieIdDELETE,
} from '@/shared/api/generated';
import { Loader } from '@/shared/components';

import posterPlaceholder from '../../assets/images/posterPlaceholder.jpg';
import styles from './styles.module.scss';

const FavoriteList = () => {
  const { data: responseFavorites, isLoading, isError } = useFavoritesGET();
  const queryClient = useQueryClient();

  const { mutate: deleteFromFavorites } = useFavoritesMovieIdDELETE({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getProfileGETQueryKey() });
        queryClient.invalidateQueries({ queryKey: getFavoritesGETQueryKey() });
      },
    },
  });

  const onDeleteFavorite = async (id: number) => {
    await deleteFromFavorites({ movieId: id });
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Ошибка загрузки избранных фильмов...</div>;

  if (responseFavorites?.data.length === 0)
    return (
      <p className={styles.favoriteListEmpty}>Ни одного фильма не добавлено</p>
    );

  return (
    <>
      <h3 className={styles.visuallyHidden}>Избранные фильмы</h3>
      {/* Десктопная/планшетная версия – грид */}
      <ul className={styles.favoriteListGrid}>
        {responseFavorites?.data?.map((favorite) => (
          <li className={styles.favoriteItem} key={favorite.id}>
            <Link className={styles.favoriteLink} to={`/movie/${favorite.id}`}>
              <img
                className={styles.favoriteImg ?? posterPlaceholder}
                src={favorite.posterUrl}
                alt={favorite.title}
              />
            </Link>
            <button
              className={styles.favoriteBtnDelete}
              type="button"
              onClick={() => favorite.id && onDeleteFavorite(favorite.id)}
              aria-label="Удалить из избранного"
            >
              <Close aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      {/* Мобильная версия – свайпер */}
      <Swiper
        className={styles.favoriteListSwiper}
        spaceBetween={40}
        slidesPerView="auto"
        loop={true}
      >
        {responseFavorites?.data?.map((favorite) => (
          <SwiperSlide
            className={clsx(styles.favoriteItem, styles.favoriteSlide)}
            key={favorite.id}
          >
            <Link className={styles.favoriteLink} to={`/movie/${favorite.id}`}>
              <img
                className={styles.favoriteImg}
                src={favorite.posterUrl}
                alt={favorite.title}
              />
            </Link>
            <button
              className={styles.favoriteBtnDelete}
              type="button"
              onClick={() => favorite.id && onDeleteFavorite(favorite.id)}
              aria-label="Удалить из избранного"
            >
              <Close aria-hidden="true" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FavoriteList;
