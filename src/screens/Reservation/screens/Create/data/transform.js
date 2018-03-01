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
    status: 'ACTIVE',
  } 
}
