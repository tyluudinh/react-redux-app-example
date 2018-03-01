import { postPrivate, getPrivate } from 'app/services/api';

export const addResourceApi = ({ key, value }) => {
  return postPrivate('/resource', { key, value });
}

export const fetchResourceApi = ({ key }) => {
  return getPrivate('/resource', { key });
}
