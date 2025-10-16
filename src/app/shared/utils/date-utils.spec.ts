import { formatDateDayMonthYear, formatToIsoDate } from './date-utils';

describe('formatToIsoDate', () => {
  it('should convert DDMMYYYY to an ISO 8601 string (UTC)', () => {
    const rawDate = '05022000';
    expect(formatToIsoDate(rawDate)).toBe('2000-02-05T00:00:00.000Z');
  });

  it('should accept DD/MM/YYYY and return ISO 8601 (UTC)', () => {
    const rawDate = '05/02/2000';
    expect(formatToIsoDate(rawDate)).toBe('2000-02-05T00:00:00.000Z');
  });

  it('should return empty string for invalid input', () => {
    expect(formatToIsoDate('invalid')).toBe('');
  });
});

describe('formatDateDayMonthYear', () => {
  it('should format an ISO date string to DD/MM/YYYY (UTC)', () => {
    const isoDate = '2000-02-05T00:00:00.000Z';
    expect(formatDateDayMonthYear(isoDate)).toBe('05/02/2000');
  });

  it('should round-trip DDMMYYYY -> ISO -> DD/MM/YYYY', () => {
    const raw = '05022000';
    const iso = formatToIsoDate(raw);
    expect(formatDateDayMonthYear(iso)).toBe('05/02/2000');
  });

  it('should handle leap day correctly', () => {
    const raw = '29022020';
    const iso = formatToIsoDate(raw);
    expect(iso).toBe('2020-02-29T00:00:00.000Z');
    expect(formatDateDayMonthYear(iso)).toBe('29/02/2020');
  });

  it('should return empty for empty or invalid iso', () => {
    expect(formatDateDayMonthYear('')).toBe('');
    expect(formatDateDayMonthYear('not-a-date')).toBe('');
  });
});
