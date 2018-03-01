import moment from 'moment';

export const toOrdersClientFormat = (list) => {
  const transformed = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const order = list[i];
    const deliveryTime = new Date(order['delivery_end_date']);
    transformed.push({
      orderNumber: order['number'],
      status: order['status'],
      customerName: order.relationships.customer['name'],
      salespersonName: order.relationships.sale_person['name'],
      destination: order['destination'],
      deliveryTime: moment(deliveryTime).format('HH:mm DD MMM YYYY'),
      id: order['id'],
    })
  }
  return transformed;
}
export const toTankClientFormat = (list) => {
  const transformed = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const tank = list[i];
    transformed.push({
      serialNumber: tank['serial_number'],
      tankType: tank['type'],
      mwap: '',
      airPressure: tank['air_pressure'],
      vacuumReading: tank['vacuum_reading'],
      location: tank['location'],
      nextInspectionDate: moment(new Date(tank['next_inspection_date'])).format('DD MMM YYYY'),
      status: tank['status'],
      id: tank['id'],
    })
  }
  return transformed;
}
export const toReservationClientFormat = (list) => {
  const transformed = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const r = list[i];
    const expiryDate = new Date(r['expiry_date']);
    transformed.push({
      reservationNumber: r['number'],
      expiredDate: moment(expiryDate).format('HH:mm DD MMM YYYY'),
      salespersonName: r.relationships.sale_person['name'],
      status: r['status'],
      location: r.relationships.customer['location'],
      id: r['id'],
    })
  }
  return transformed;
}