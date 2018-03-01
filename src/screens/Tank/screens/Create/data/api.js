import { postPrivate } from 'app/services/api';

export const createTankApi = (data) => {
  return postPrivate('/tank/create', data);
}