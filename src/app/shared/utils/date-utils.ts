export function formatToIsoDate(rawDate: string): string {
  if (!rawDate) return '';

  const input = rawDate.trim();

  if (/^\d{8}$/.test(input)) {
    const day = Number(input.slice(0, 2));
    const month = Number(input.slice(2, 4));
    const year = Number(input.slice(4, 8));
    const timestamp = Date.UTC(year, month - 1, day, 0, 0, 0);
    return new Date(timestamp).toISOString();
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(input)) {
    const [d, m, y] = input.split('/');
    const day = Number(d);
    const month = Number(m);
    const year = Number(y);
    const timestamp = Date.UTC(year, month - 1, day, 0, 0, 0);
    return new Date(timestamp).toISOString();
  }

  const parsed = Date.parse(input);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString();
  }

  return '';
}

export function formatDateDayMonthYear(isoDate: string): string {
  if (!isoDate) return '';
  const timestamp = Date.parse(isoDate);
  if (isNaN(timestamp)) return '';
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
