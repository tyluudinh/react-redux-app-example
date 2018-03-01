export const toClientFormat = list => {
  const transformed = [];
  for (let i = 0, len = list.length; i < len; i++) {
    transformed.push(toReservationClientFormat(list[i]));
  }
  return transformed;
}

export const toReservationClientFormat = fields => {
  const { customer, sale_person } = fields.relationships;
  return {
    id: fields['id'],
    reservationNumber: fields['number'],
    salespersonName: sale_person['name'],
    reservationType: fields['type'],
    customerName: customer.name,
    remarks: fields['remark'],
    status: fields['status'],
    selected: false,
  }
}