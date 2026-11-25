export const formatRuntime = (minutes?: number): string => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (!hours || hours === 0) {
    return `${mins}мин`;
  }

  if (!mins || mins === 0) {
    return `${hours}ч`;
  }

  return `${hours}ч ${mins}мин`;
};
