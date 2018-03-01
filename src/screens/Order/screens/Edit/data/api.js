import { putPrivate, getPrivate } from 'app/services/api';

export const editOrderApi = (id, data) => {
  return putPrivate(`/order/${id}`, data);
}

export const fetchOrderDetailApi = (id) => {
  return getPrivate(`/order/${id}`);
}