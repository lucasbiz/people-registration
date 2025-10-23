/* eslint-disable @typescript-eslint/no-explicit-any */
import { payloadHelper } from './user.helper';
import { formatToIsoDate } from '../shared/utils/date-utils';
import { UserForm } from '../shared/models/user.model';

describe('payloadHelper', () => {
  it('should format phone and birthDate', () => {
    const input: UserForm = {
      name: 'Test',
      email: 'test@mail.com',
      phone: '47999999999',
      birthDate: '1996-10-25',
    };

    const payload = payloadHelper(input) as any;

    expect(payload.phone).toMatch(/\(47\) 99999-9999/);

    expect(new Date(payload.birthDate).toISOString()).toBe(
      formatToIsoDate(input.birthDate),
    );

    expect(payload).toHaveProperty('name', input.name);
    expect(payload).toHaveProperty('email', input.email);
  });
});
