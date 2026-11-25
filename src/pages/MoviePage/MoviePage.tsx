import { useParams } from 'react-router-dom';

import { MovieCard, MovieDetails } from '@/domains/movie';
import { useMovieIdGET } from '@/shared/api/generated';
import { Loader } from '@/shared/components';

import styles from './styles.module.scss';

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: response,
    isLoading,
    isError,
  } = useMovieIdGET(Number(id), {
    query: { enabled: !!id },
  });

  if (isLoading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );

  const movie = response?.data;
  if (!movie) return <div>Фильм не на найден</div>;

  return (
    <>
      <MovieCard
        movie={movie}
        showDetailsLink={false}
        isLoading={isLoading}
        isError={isError}
      />
      <MovieDetails movie={movie} />
    </>
  );
};

export default MoviePage;
