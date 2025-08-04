export function formatToIsoDate(rawDate: string): string {
  return new Date(rawDate).toISOString();
}

export function formatDateDayMonthYear(isoDate: string): string {
  const timestamp = Date.parse(isoDate);
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
