import type { Movie } from '@/shared/api/generated/model';

import { LANGUAGE } from '../../constants/languages';
import styles from './styles.module.scss';

type MovieDetailsProps = {
  movie: Movie;
};

const getDetailsFields = (movie: Movie) => [
  {
    label: 'Язык оригинала',
    value: movie.language ? (LANGUAGE[movie.language] ?? '-') : '-',
  },
  {
    label: 'Бюджет',
    value: movie.budget ?? '-',
  },
  {
    label: 'Выручка',
    value: movie.revenue ?? '-',
  },
  {
    label: 'Режиссёр',
    value: movie.director ?? '-',
  },
  {
    label: 'Продакшн',
    value: movie.production ?? '-',
  },
  {
    label: 'Награды',
    value: movie.awardsSummary ?? '-',
  },
];

const MovieDetails = (props: MovieDetailsProps) => {
  const { movie } = props;
  const DETAILS_FIELDS = getDetailsFields(movie);

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>О фильме</h2>
      <ul className={styles.detailsList}>
        {DETAILS_FIELDS.map((field, index) => (
          <li className={styles.detailsRow} key={index}>
            <span className={styles.detailsLabel}>{field.label}</span>
            <span className={styles.dots}></span>
            <span className={styles.detailsValue}>{field.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieDetails;
