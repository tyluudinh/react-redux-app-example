import { postPublic } from 'app/services/api';

export const resetPasswordApi = (reset_token, new_password) => {
  return postPublic('/password/reset', { reset_token, new_password });
}