import { toCamel } from 'app/services/transform';

export const toClientFormat = (fields) => {
  const { relationships } = fields;
  return {
    ...toCamel(fields),
    taggedOrder: relationships && relationships['order_id'],
    taggedReservation: relationships && relationships['reservation_id']
  }
}