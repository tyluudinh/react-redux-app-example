import { postPublic, getPrivate  } from './api';

export const authenticate = (email, password) => {
  return postPublic('/login', { email, password });
}

export const signout = () => {
  return getPrivate('/user/me/logout');
}