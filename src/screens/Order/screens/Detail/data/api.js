import { getPrivate, deletePrivate } from 'app/services/api';

export const fetchDetailApi = (id) => {
  return getPrivate(`/order/${id}`)
}

export const deleteApi = (id) => {
  return deletePrivate(`/order/${id}`);
}

export const fetchTankApi = (id) => {
  return getPrivate(`/tank/${id}`)
}

export const fetchReservationApi = (id) => {
  return getPrivate(`/reservation/${id}`)
}

export const completeApi = (id) => {
  return getPrivate(`/order/${id}/completed`)
}

