import { putPrivate, getPrivate } from 'app/services/api';

export const editReservationApi = (id, data) => {
  return putPrivate(`/reservation/${id}`, data);
}

export const fetchReservationDetailApi = (id) => {
  return getPrivate(`/reservation/${id}`);
}