import { toCamel } from "app/services/transform";

export const toClientFormat = (fields) => {
  console.log('client transform', JSON.stringify(fields));
  const { relationships } = fields;
  const { tank_ids, sale_person, reservation_ids, invoices, customer, driver } = relationships;
  const deliveryStartTime = new Date(fields['delivery_start_date']);
  const deliveryEndTime = new Date(fields['delivery_end_date']);
  return {
    orderType: fields['type'],
    orderNumber: fields['number'],
    
    salespersonName: sale_person['name'],
    salespersonPhone: sale_person['phone_number'],
    salespersonEmail: sale_person['email'],
    
    customerName: customer['name'],
    customerLocation: customer['location'],
    customerDeliveryAddress: customer['delivery_address'],
    customerDetail: customer['additional_details'],
    customerWarehouse: customer['warehouse_location'],
    
    deliveryRouteStart: fields['starting_point'],
    deliveryRouteDest: fields['destination'],
    deliveryStartDate: deliveryStartTime,
    deliveryStartHour: deliveryStartTime.getHours(),
    deliveryStartMinute: deliveryStartTime.getMinutes(),
    deliveryEndDate: deliveryEndTime,
    deliveryEndHour: deliveryEndTime.getHours(),
    deliveryEndMinute: deliveryEndTime.getMinutes(),
    projectTimingStart: new Date(fields['project_start_date']),
    projectTimingEnd: new Date(fields['project_end_date']),
    
    remarks: fields['remarks'],

    tanks: tank_ids,
    reservations: reservation_ids,
    invoices: invoices,

    selectedRoute: fields['routing_options'],

    driverName: driver && driver['name'],
    driverPhone: driver && driver['phone_number'],
    driverEmail: driver && driver['email'],
    driverCompany: driver && driver['additional_details'],
    status: fields['status'],
    id: fields['id'],
    termOfOrder: fields['terms_of_order'],
    costing: fields['costing'],
  }
}

export const toTankClientFormat = (fields) => toCamel(fields)

export const toReservationClientFormat = (fields) => {
  const { customer, sale_person, tank_ids } = fields.relationships;
  return {
    id: fields['id'],
    type: fields['type'],
    reservationNumber: fields['number'],
    remarks: fields['remarks'],
    expiredDate: fields['expiry_date'],
    
    salespersonName: sale_person['name'],
    salespersonPhone: sale_person['phone_number'],
    salespersonEmail: sale_person['email'],
    
    customerName: customer['name'],
    customerLocation: customer['location'],
    deliveryAddress: customer['delivery_address'],
    additionalDetails: customer['additional_details'],
    warehouseLocation: customer['warehouse_location'],
    
    status: fields['status'],
    tanks: tank_ids,

  }
}