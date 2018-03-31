import { apiIco } from 'app/services/api';
import { API_ICO_GET_RATE_BONUS_PAYMENT } from 'app/services/constants';

export const getRateBonusPayment = () => {
  return apiIco(API_ICO_GET_RATE_BONUS_PAYMENT, 'GET')
};