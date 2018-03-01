import { getPublic } from 'app/services/api';

export const activateAccountApi = (token) => {
  return getPublic('/activate', { token });
}