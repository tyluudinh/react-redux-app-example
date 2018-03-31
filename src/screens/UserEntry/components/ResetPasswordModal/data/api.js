import { postPublic } from 'app/services/api';

export const resetPasswordApi = (data) => {
  return postPublic('auth/reset', data);
};