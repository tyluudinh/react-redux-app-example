import { postPublic } from 'app/services/api';

export const signUp = (data) => {
  return postPublic('auth/signUp', data)
};