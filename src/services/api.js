import axios from 'axios';

import { API_ROOT_URL, API_ICO_MAKE_PAYMENT, ICO_URL_STAGE, API_ICO_ROOT_URL } from './constants';
import { getToken } from 'app/data/me/selectors';

const api = {
  url: API_ROOT_URL,
  publicPath: '',
  privatePath: '',
};

const { url, publicPath, privatePath } = api;

export const getPublic = (path, params, config) => {
  return axios.get(`${url}${publicPath}${path}`, {
    params
  });
};

export const postPublic = (path, data, config) => {
  return axios.post(`${url}${publicPath}${path}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  })
};

export const makePayment = (data, config) => {
  return apiIco(API_ICO_MAKE_PAYMENT, 'POST', data, config)
};

export const apiIco = (path, method = 'GET', data, config) => {
  return axios({
    method: method,
    url: `${API_ICO_ROOT_URL}${ICO_URL_STAGE}/${path}`,
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: data,
    ...config
  })
};

export const postPrivate = (path, data, config) => {
  return axios.post(`${url}${privatePath}${path}`, data, {
    headers: {
      'authorization': getToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  })
};

export const putPrivate = (path, data, config) => {
  return axios.put(`${url}${privatePath}${path}`, data, {
    headers: {
      'authorization': getToken(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config
    }
  })
};

export const getPrivate = (path, params, config) => {
  return axios.get(`${url}${privatePath}${path}`, {
    params,
    headers: {
      'authorization': getToken(),
      'Accept': 'application/json',
    },
    ...config
  })
};

export const deletePrivate = (path, params, config) => {
  return axios.delete(`${url}${privatePath}${path}`, {
    params,
    headers: {
      'authorization': getToken(),
      'Accept': 'application/json',
    },
    ...config
  })
};
