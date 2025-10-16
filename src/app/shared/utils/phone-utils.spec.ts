import { formatPhone } from './phone-utils';

describe('formatPhone', () => {
  it('should return the phone formated', () => {
    const input = '99999999999';
    const formatted = formatPhone(input);
    expect(formatted).toBe('(99) 99999-9999');
  });

  it('should be idempotent when input is already formatted', () => {
    const formattedInput = '(99) 99999-9999';
    const result = formatPhone(formattedInput);
    expect(result).toBe(formattedInput);
  });

  it('should return empty string for empty input', () => {
    const result = formatPhone('');
    expect(result).toBe('');
  });
});
