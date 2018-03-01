import { getPrivate, deletePrivate } from 'app/services/api';

export const fetchDetailApi = (id) => {
  return getPrivate(`/tank/${id}`)
}

export const deregisterApi = (id) => {
  return deletePrivate(`/tank/${id}`) ;
}