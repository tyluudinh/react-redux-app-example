import { makePayment } from 'app/services/api'

export const submitPayment = (data) => {
  return makePayment(data)
};