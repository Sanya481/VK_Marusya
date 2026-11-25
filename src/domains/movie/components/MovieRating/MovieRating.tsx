import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { Star } from '@/assets/icons';

import styles from './styles.module.scss';

type MovieRatingProps = {
  rating: number | null | undefined;
  size?: 'S' | 'L';
} & HTMLAttributes<HTMLDivElement>;

const MovieRating = (props: MovieRatingProps) => {
  const { rating, size = 'L', className, ...rest } = props;

  const isNumber = Number.isFinite(rating);
  const formattedRating = isNumber ? rating!.toFixed(1) : '-';

  const getRatingClass = (rate: number): string => {
    if (rate >= 8) return styles.high;
    if (rate >= 7) return styles.good;
    if (rate >= 6) return styles.medium;
    return styles.low;
  };

  const ratingClassNames = clsx(
    styles.rating,
    className,
    styles[size],
    isNumber && getRatingClass(rating!)
  );

  return (
    <div className={ratingClassNames} {...rest}>
      <Star aria-hidden="true" />
      <span>{formattedRating}</span>
    </div>
  );
};

export default MovieRating;
