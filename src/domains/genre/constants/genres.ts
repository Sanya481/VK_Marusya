// Импортируем все постеры
import actionPoster from '../../../assets/images/genresPoster/action.jpg';
import adventurePoster from '../../../assets/images/genresPoster/adventure.jpg';
import animationPoster from '../../../assets/images/genresPoster/animation.jpg';
import comedyPoster from '../../../assets/images/genresPoster/comedy.jpg';
import crimePoster from '../../../assets/images/genresPoster/crime.jpg';
import documentaryPoster from '../../../assets/images/genresPoster/documentary.jpg';
import dramaPoster from '../../../assets/images/genresPoster/drama.jpg';
import familyPoster from '../../../assets/images/genresPoster/family.jpg';
import fantasyPoster from '../../../assets/images/genresPoster/fantasy.jpg';
import historyPoster from '../../../assets/images/genresPoster/history.jpg';
import horrorPoster from '../../../assets/images/genresPoster/horror.jpg';
import musicPoster from '../../../assets/images/genresPoster/music.jpg';
import mysteryPoster from '../../../assets/images/genresPoster/mystery.jpg';
import romancePoster from '../../../assets/images/genresPoster/romance.jpg';
import scifiPoster from '../../../assets/images/genresPoster/scifi.jpg';
import standUpPoster from '../../../assets/images/genresPoster/stand_up.jpg';
import thrillerPoster from '../../../assets/images/genresPoster/thriller.jpg';
import tvMoviePoster from '../../../assets/images/genresPoster/tv_movie.jpg';
import warPoster from '../../../assets/images/genresPoster/war.jpg';
import westernPoster from '../../../assets/images/genresPoster/western.jpg';

export const GENRES = {
  action: { title: 'Боевик', poster: actionPoster },
  comedy: { title: 'Комедия', poster: comedyPoster },
  drama: { title: 'Драма', poster: dramaPoster },
  horror: { title: 'Ужасы', poster: horrorPoster },
  fantasy: { title: 'Фэнтези', poster: fantasyPoster },
  scifi: { title: 'Фантастика', poster: scifiPoster },
  thriller: { title: 'Триллер', poster: thrillerPoster },
  romance: { title: 'Романтика', poster: romancePoster },
  mystery: { title: 'Детектив', poster: mysteryPoster },
  crime: { title: 'Криминал', poster: crimePoster },
  adventure: { title: 'Приключения', poster: adventurePoster },
  family: { title: 'Семейный', poster: familyPoster },
  animation: { title: 'Мультфильм', poster: animationPoster },
  documentary: { title: 'Документальный', poster: documentaryPoster },
  music: { title: 'Музыка', poster: musicPoster },
  western: { title: 'Вестерн', poster: westernPoster },
  war: { title: 'Военный', poster: warPoster },
  history: { title: 'Исторический', poster: historyPoster },
  'stand-up': { title: 'Стендап', poster: standUpPoster },
  'tv-movie': { title: 'ТВ-фильм', poster: tvMoviePoster },
} as const;

export type GenreKey = keyof typeof GENRES;
