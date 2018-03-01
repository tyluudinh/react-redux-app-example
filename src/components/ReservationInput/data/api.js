import { getPrivate } from 'app/services/api';

export const searchReservationsApi = (query) => {
  return getPrivate(`/reservation/list`, query);
}

export const fetchReservationApi = (id) => {
  return getPrivate(`/reservation/${id}`);
}