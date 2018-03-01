import { postPrivate } from 'app/services/api';

export const createOrderApi = (data) => {
  return postPrivate('/order/create', data);
}