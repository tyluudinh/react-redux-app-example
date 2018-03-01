import { getPrivate } from 'app/services/api'

export const searchTank = (q, options) => {
  return getPrivate('/tank/list', { q })
}

export const searchReservation = (q, options) => {
  return getPrivate('/reservation/list', { q })
}

export const searchOrder = (q, options) => {
  return getPrivate('/order/list', { q })
}