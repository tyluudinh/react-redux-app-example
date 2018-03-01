import { postPrivate } from 'app/services/api';

export const createReservationApi = (data) => {
  return postPrivate(`/reservation/create`, data);
}