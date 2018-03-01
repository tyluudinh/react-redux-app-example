import { postPublic } from 'app/services/api';

export const signupCall = (userInfo) => {
  return postPublic('/signUp', userInfo);
}