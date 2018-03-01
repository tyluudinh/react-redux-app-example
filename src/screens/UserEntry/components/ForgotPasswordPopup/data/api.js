import { postPublic } from 'app/services/api';

export const forgotApi = (email) => {
  return postPublic('/password/forgot', {email});
}