import { postPublic } from 'app/services/api';

export const signupCall = (userInfo) => {
  return postPublic('v1/auth/signup', userInfo);
}