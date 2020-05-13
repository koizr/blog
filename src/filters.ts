const pad = (length: number, n: number): string =>
  String(n).padStart(length, "0");

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const y = pad(4, date.getFullYear());
  const m = pad(2, date.getMonth() + 1);
  const d = pad(2, date.getDate());
  return `${y}/${m}/${d}`;
};
