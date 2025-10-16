import { UserForm } from '../models/user.model';
import { formatToIsoDate } from '../utils/date-utils';
import { formatPhone } from '../utils/phone-utils';
import { toLowerCase } from '../utils/string.utils';

export function payloadHelper(userData: UserForm): object {
  const payload = {
    ...userData,
    email: toLowerCase(userData.email),
    phone: formatPhone(userData.phone),
    birthDate: formatToIsoDate(userData.birthDate),
  };

  return payload;
}
