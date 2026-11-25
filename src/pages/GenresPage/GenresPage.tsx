import { Link } from 'react-router-dom';

import { GENRES, type GenreKey } from '@/domains/genre/constants/genres';
import { useMovieGenresGET } from '@/shared/api/generated';
import { Loader } from '@/shared/components';

import styles from './styles.module.scss';

const GenresPage = () => {
  const { data: responseGenre, isLoading, isError } = useMovieGenresGET();

  return (
    <section className={styles.genresContainer}>
      <h2 className={styles.sectionTitle}>Жанры фильмов</h2>

      {isLoading && <Loader />}
      {isError && <div>Ошибка загрузки жанров...</div>}

      <ul className={styles.genresList}>
        {responseGenre?.data.map((genre, index) => {
          const genreInfo = GENRES[genre as GenreKey];
          if (!genreInfo) return null;
          return (
            <li key={index}>
              <Link className={styles.genresLink} to={`/genres/${genre}`}>
                <div className={styles.genresContent}>
                  <h3 className={styles.genresTitle}>{genreInfo.title}</h3>
                </div>
                <img
                  className={styles.genresImg}
                  src={genreInfo.poster}
                  alt={`Обложка к жанру ${genreInfo.title}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GenresPage;
