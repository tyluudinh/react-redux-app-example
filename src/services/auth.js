import {postPrivate, postPublic} from './api';

export const authenticate = (username, password) => {
  return postPublic('auth/login', {username, password});
};

export const signout = () => {
  return postPrivate('users/logout');
};

export const signInSocial = (accessToken, provider = 'facebook') => {
  switch (provider) {
    case 'facebook':
      return postPublic(`auth/facebook`, {access_token: accessToken});
    case 'google':
      return postPublic(`auth/gmail`, {id_token: accessToken});
    default:
      break;
  }
};