// 🛠 1. УТИЛИТА: Ручное формирование строки (x-www-form-urlencoded)

interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

export const serializeToFormUrlEncoded = (obj: RegisterPayload): string => {
  return Object.entries(obj)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};
