import { getPrivate } from 'app/services/api';

export const searchTanksApi = (data) => {
  return getPrivate(`/tank/list`, data);
}

export const fetchTankApi = (id) => {
  return getPrivate(`/tank/${id}`);
}