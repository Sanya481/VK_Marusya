import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Email } from '@/assets/icons';
import {
  getFavoritesGETQueryKey,
  getProfileGETQueryKey,
  useAuthLogoutGET,
  useProfileGET,
} from '@/shared/api/generated';
import { Button } from '@/shared/components';

import { SettingTab } from '../SettingTab';
import styles from './styles.module.scss';

const UserSettings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: responseProfile } = useProfileGET();
  const { refetch: logout } = useAuthLogoutGET({
    query: { enabled: false },
  });

  const handleLogout = async () => {
    await logout();
    await queryClient.removeQueries({ queryKey: getProfileGETQueryKey() });
    await queryClient.removeQueries({ queryKey: getFavoritesGETQueryKey() });
    await navigate('/');
  };

  const user = responseProfile?.data;

  const settingTabs = [
    {
      title: 'Имя Фамилия',
      icon: `${user?.name?.[0]} ${user?.surname?.[0] ?? ''}`,
      label: `${user?.name} ${user?.surname}`,
    },
    {
      title: 'Электронная почта',
      icon: <Email aria-hidden="true" />,
      label: user?.email ?? 'Не указана',
    },
  ];

  return (
    <>
      <h3 className={styles.visuallyHidden}>Настройки аккаунта</h3>
      <ul className={styles.settingsList}>
        {settingTabs.map((tab, index) => (
          <SettingTab
            key={index}
            icon={tab.icon}
            title={tab.title}
            label={tab.label}
          />
        ))}
      </ul>
      <Button
        className={styles.logoutBtn}
        buttonColor="secondary"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </Button>
    </>
  );
};

export default UserSettings;
