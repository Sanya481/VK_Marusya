import { Ok, Telegram, Vk, Youtube } from '@/assets/icons';

import styles from './styles.module.scss';

const SocialIcons = [
  {
    icon: <Vk className={styles.socialIcon} aria-hidden="true" />,
    label: 'ВКонтакте',
  },
  {
    icon: <Youtube className={styles.socialIcon} aria-hidden="true" />,
    label: 'Ютуб',
  },
  {
    icon: <Ok className={styles.socialIcon} aria-hidden="true" />,
    label: 'Одноклассники',
  },
  {
    icon: <Telegram className={styles.socialIcon} aria-hidden="true" />,
    label: 'Телеграм',
  },
];

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <ul className={styles.socialList}>
          {SocialIcons.map((icon, index) => (
            <li key={index} aria-label={icon.label}>
              {icon.icon}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
