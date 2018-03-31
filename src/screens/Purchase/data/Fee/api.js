import { apiIco } from 'app/services/api';
import { API_ICO_GET_FEE_PAYMENT } from 'app/services/constants';

export const getFeePayment = (params) => {
  return apiIco(API_ICO_GET_FEE_PAYMENT, 'GET', {}, {params})
};