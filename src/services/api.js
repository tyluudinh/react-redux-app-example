import axios from 'axios';

import { api } from './config';
import { getToken } from 'app/data/me/selectors';

const { url, publicPath, privatePath } = api;

export const getPublic = (path, params, config) => {
  return axios.get(`${url}${publicPath}${path}`, {
    params
  });
}

export const postPublic = (path, data, config) => {
  return axios.post(`${url}${publicPath}${path}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  })
}

export const postPrivate = (path, data, config) => {
  console.log(JSON.stringify(data));
  console.log('token', getToken());
  return axios.post(`${url}${privatePath}${path}`, data, {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}

export const putPrivate = (path, data, config) => {
  console.log(JSON.stringify(data));
  console.log('token', getToken());
  return axios.put(`${url}${privatePath}${path}`, data, {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}

export const getPrivate = (path, params, config) => {
  console.log('token', getToken());
  return axios.get(`${url}${privatePath}${path}`, {
    params,
    headers: {
      'Authorization': getToken(),
      'Accept': 'application/json',
    },
    ...config
  })
}

export const deletePrivate = (path, params, config) => {
  console.log('token', getToken());
  return axios.delete(`${url}${privatePath}${path}`, {
    params,
    headers: {
      'Authorization': getToken(),
      'Accept': 'application/json',
    },
    ...config
  })
}
