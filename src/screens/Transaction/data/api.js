import { apiIco } from 'app/services/api';
import { API_ICO_LIST_TRANSACTION } from 'app/services/constants';

export const fetchListTransaction = (params) => {
  return apiIco(API_ICO_LIST_TRANSACTION, 'GET', {}, {params: params});
};

