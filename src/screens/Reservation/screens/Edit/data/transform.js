import { toCamel } from 'app/services/transform';

const getTankIds = (tanks) => {
  const tanksId = [];
  for (let i = 0, len = tanks.length; i < len; i++) {
    tanksId.push(tanks[i].id);
  }
  return tanksId;
}

export const toServerFormat = (fields) => {
  return {
    type: fields['type'].value,
    number: fields['reservationNumber'].value,
    sale_person: {
      email: fields['salespersonEmail'].value,
      name: fields['salespersonName'].value,
      phone_number: fields['salespersonPhone'].value,
    },
    customer: {
      name: fields['customerName'].value,
      location: fields['customerLocation'].value,
      warehouse_location: fields['warehouseLocation'].value,
      delivery_address: fields['deliveryAddress'].value,
      additional_details: fields['additionalDetails'].value,
    },
    tank_ids: getTankIds(fields['tanks'].value),
    remarks: fields['remarks'].value,
    expiry_date: fields['expiredDate'].value,
    status: fields['status'].value,
    id: fields['id'].value,
  } 
}

export const toClientFormat = (fields) => {
  const { customer, sale_person, tank_ids } = fields.relationships;
  return {
    type: { value: fields['type'] || '', errors: [] },
    reservationNumber: { value: fields['number'] || '', errors: [] },
    remarks: { value: fields['remarks'] || '', errors: [] },
    expiredDate: { value: fields['expiry_date'] || '', errors: [] },

    salespersonName: { value: sale_person['name'] || '', errors: [] },
    salespersonPhone: { value: sale_person['phone_number'] || '', errors: [] },
    salespersonEmail: { value: sale_person['email'] || '', errors: [] },

    customerName: { value: customer['name'] || '', errors: [] },
    customerLocation: { value: customer['location'] || '', errors: [] },
    deliveryAddress: { value: customer['delivery_address'] || '', errors: [] },
    additionalDetails: { value: customer['additional_details'] || '', errors: [] },
    warehouseLocation: { value: customer['warehouse_location'] || '', errors: [] },

    tanks: { value: tank_ids, errors: [] },

    status: { value: fields['status'], errors: [] },
    id: { value: fields['id'], errors: [] },
  }
}

export const toTankClientFormat = (fields) => toCamel(fields)
