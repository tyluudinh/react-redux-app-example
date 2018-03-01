import { putPrivate, getPrivate } from 'app/services/api';

export const editTankApi = (id, data) => {
  return putPrivate(`/tank/${id}`, data);
}

export const fetchTankDetailApi = (id) => {
  return getPrivate(`/tank/${id}`);
}