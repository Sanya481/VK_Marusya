import clsx from 'clsx';
import type React from 'react';
import type { LiHTMLAttributes } from 'react';

import styles from './styles.module.scss';

type SettingTabProps = {
  icon: React.ReactNode;
  title: string;
  label: string;
} & LiHTMLAttributes<HTMLLIElement>;

const SettingTab = (props: SettingTabProps) => {
  const { icon, title, label, className, ...rest } = props;

  return (
    <li className={clsx(styles.settingsItem, className)} {...rest}>
      <span className={styles.settingIcon}>{icon}</span>
      <div className={styles.settingContent}>
        <p className={styles.settingTitle}>{title}</p>
        <p className={styles.settingSubtitle}>{label}</p>
      </div>
    </li>
  );
};

export default SettingTab;
