import { getPrivate, putPrivate } from 'app/services/api';

export const fetchUserProfile = () => {
  return getPrivate('users');
};

export const updateUserProfile = (data) => {
  return putPrivate('users', data)
};
