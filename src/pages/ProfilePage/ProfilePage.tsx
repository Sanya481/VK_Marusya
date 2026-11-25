import { clsx } from 'clsx';
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom';

import { Favorite, User } from '@/assets/icons';

import styles from './styles.module.scss';

const ProfilePage = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return matchPath(`/profile/${path}`, pathname) !== null;
  };

  const profileTabs = [
    {
      labelDesktop: 'Избранные фильмы',
      labelMobile: 'Избранное',
      path: 'favorites',
      icon: (
        <Favorite
          className={clsx(styles.profileTabIcon, styles.favoriteIcon)}
          aria-hidden="true"
        />
      ),
    },
    {
      labelDesktop: 'Настройки аккаунта',
      labelMobile: 'Настройки',
      path: 'user-settings',
      icon: <User className={styles.profileTabIcon} aria-hidden="true" />,
    },
  ];

  const getTabClassNames = (isActive: boolean) => {
    return clsx(styles.tabProfileLink, {
      [styles.activeTab]: isActive,
    });
  };

  return (
    <section className={styles.profileSection}>
      <h2 className={styles.profileTitle}>Мой аккаунт</h2>

      <ul className={styles.profileTabs}>
        {profileTabs.map((tab, index) => (
          <li className={styles.profileTab} key={index}>
            <Link
              to={`/profile/${tab.path}`}
              className={getTabClassNames(isActive(tab.path))}
            >
              <span
                className={clsx(styles.profileTabLabel, styles.tabLabelDesktop)}
              >
                {tab.labelDesktop}
              </span>
              <span
                className={clsx(styles.profileTabLabel, styles.tabLabelMobile)}
              >
                {tab.labelMobile}
              </span>
              {tab.icon}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default ProfilePage;
