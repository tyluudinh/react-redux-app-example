import moment from 'moment';
import { toCamel } from 'app/services/transform';
const extractIds = (list) => {
  const ids = [];
  for (let i = 0, len = list.length; i < len; i++) {
    console.log('list', list[i]);
    ids.push(list[i].id)
  }
  return ids;
}

export const toServerFormat = (fields) => {
  console.log('TO SERVER', fields);
  let deliveryStartDate = null;
  let deliveryEndDate = null;
  if (fields['orderType'].value === 'LOGISTICS') {
    deliveryStartDate = new Date(fields['deliveryStartDate'].value);
    deliveryStartDate.setHours(parseInt(fields['deliveryStartHour'].value, 10));
    deliveryStartDate.setMinutes(parseInt(fields['deliveryStartMinute'].value, 10));
    deliveryEndDate = new Date(fields['deliveryEndDate'].value);
    deliveryEndDate.setHours(parseInt(fields['deliveryEndHour'].value, 10));
    deliveryEndDate.setMinutes(parseInt(fields['deliveryEndMinute'].value, 10));
  }
  return {
    customer: {
      additional_details: fields['customerDetail'].value,
      delivery_address: fields['customerDeliveryAddress'].value,
      location: fields['customerLocation'].value,
      name: fields['customerName'].value,
      warehouse_location: fields['customerWarehouse'].value,
    },
    delivery_start_date: deliveryStartDate ? deliveryStartDate : fields['deliveryStartDate'].value,
    delivery_end_date: deliveryEndDate ? deliveryEndDate : fields['deliveryEndDate'].value,
    destination: fields['deliveryRouteDest'].value,
    starting_point: fields['deliveryRouteStart'].value,
    number: fields['orderNumber'].value,
    project_start_date: fields['projectTimingStart'].value,
    project_end_date: fields['projectTimingEnd'].value,
    remarks: fields['remarks'].value,
    reservation_ids: extractIds(fields['reservations'].value),
    sale_person: {
      email: fields['salespersonEmail'].value,
      name: fields['salespersonName'].value,
      phone_number: fields['salespersonPhone'].value,
    },
    tank_ids: extractIds(fields['tanks'].value),
    type: fields['orderType'].value,
    status: fields['status'].value,
    id: fields['id'].value,
  }
}

export const toClientFormat = (fields) => {
  const { customer, sale_person, tank_ids, reservation_ids, driver } = fields.relationships;
  const delivery_start_date = new Date(fields['delivery_start_date']);
  const delivery_end_date = new Date(fields['delivery_end_date']);
  return {
    orderType: { value: fields['type'] || '', errors: [] },
    orderNumber: { value: fields['number'] || '', errors: [] },
    
    salespersonName: { value: sale_person['name'] || '', errors: [] },
    salespersonPhone: { value: sale_person['phone_number'] || '', errors: [] },
    salespersonEmail: { value: sale_person['email'] || '', errors: [] },
    
    customerName: { value: customer['name'] || '', errors: [] },
    customerLocation: { value: customer['location'] || '', errors: [] },
    customerDeliveryAddress: { value: customer['delivery_address'] || '', errors: [] },
    customerDetail: { value: customer['additional_details'] || '', errors: [] },
    customerWarehouse: { value: customer['warehouse_location'] || '', errors: [] },
    
    deliveryRouteStart: { value: fields['starting_point'] || '', errors: [] },
    deliveryRouteDest: { value: fields['destination'] || '', errors: [] },
    deliveryStartDate: { value: delivery_start_date || '', errors: [] },
    deliveryStartHour: { value: `${delivery_start_date.getHours()}` || '', errors: [] },
    deliveryStartMinute: { value: `${delivery_start_date.getMinutes()}` || '', errors: [] },
    deliveryEndDate: { value: delivery_end_date || '', errors: [] },
    deliveryEndHour: { value: `${delivery_end_date.getHours()}` || '', errors: [] },
    deliveryEndMinute: { value: `${delivery_end_date.getMinutes()}` || '', errors: [] },
    projectTimingStart: { value: fields['project_start_date'] || moment(), errors: [] },
    projectTimingEnd: { value: fields['project_end_date'] || moment(), errors: [] },
    
    remarks: { value: fields['remarks'] || '', errors: [] },

    tanks: { value: tank_ids || '', errors: [] },
    reservations: { value: reservation_ids || '', errors: [] },

    // Only for logistic order
    driverName: { value: (driver && driver['name']) || '', errors: [] },
    driverPhone: { value: (driver && driver['phone_number']) || '', errors: [] },
    driverEmail: { value: (driver && driver['email']) || '', errors: [] },
    driverCompany: { value: (driver && driver['additional_details']) || '', errors: [] },
    
    status: { value: fields['status'], errors: [] },
    id: { value: fields['id'], errors: [] },
  }
}


export const toTankClientFormat = (fields) => toCamel(fields)
