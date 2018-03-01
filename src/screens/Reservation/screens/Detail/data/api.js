import { getPrivate } from 'app/services/api';

export const fetchDetailApi = (id) => {
  return getPrivate(`/reservation/${id}`)
}

export const deleteApi = (id) => {
  return getPrivate(`/reservation/${id}/cancel`);
}

export const fetchTankApi = (id) => {
  return getPrivate(`/tank/${id}`)
}
