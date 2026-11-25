import logo from '@assets/images/logo.png';
import clsx from 'clsx';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { Genres, User } from '@/assets/icons';
import { useProfileGET } from '@/shared/api/generated';

import MovieSearchInput from './MovieSearchInput';
import styles from './styles.module.scss';

const navLink = [
  { path: '/', title: 'Главная' },
  { path: '/genres', title: 'Жанры' },
];

const Header = () => {
  const { pathname } = useLocation();
  const [, setSearchParams] = useSearchParams();

  const { data: responseProfile } = useProfileGET({
    query: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link className={styles.logo} to="/">
          <img
            src={logo}
            width="144"
            height="32"
            alt="Логотип сайта: Овал и надпись Маруся в качестве бренда"
          />
        </Link>

        <div className={styles.headerNavWrapper}>
          {/* Навигация — текстовая (видна на десктопе) */}
          <nav className={styles.desktopNav}>
            <ul className={styles.headerNav}>
              {navLink.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(item) =>
                      clsx(styles.navLink, { [styles.active]: item.isActive })
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Навигация — иконки (видна на планшетах/мобильных) */}
          <nav className={styles.mobileNav}>
            <Link to="/genres">
              <Genres aria-label="Жанры" />
            </Link>
          </nav>

          <MovieSearchInput key={pathname} />

          {responseProfile?.data ? (
            <Link className={styles.headerLogin} to={'/profile'}>
              <span className={styles.loginText}>
                {responseProfile.data.name}
              </span>
              <span className={styles.loginIcon} aria-label="Войти">
                {responseProfile?.data?.name?.[0]}
              </span>
            </Link>
          ) : (
            <button
              className={styles.headerLogin}
              type="button"
              onClick={() => setSearchParams({ modalMode: 'login' })}
            >
              <span className={styles.loginText}>Войти</span>
              <User className={styles.loginIcon} aria-label="Войти" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
