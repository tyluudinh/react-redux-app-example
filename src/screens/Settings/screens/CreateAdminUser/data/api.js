import { postPrivate } from 'app/services/api';

export const adminCreateApi = (data) => {
  return postPrivate('/user/create', data)
}