import { postPublic } from 'app/services/api';

export const forgotApi = (email) => {
  return postPublic('auth/forgot', {email});
}