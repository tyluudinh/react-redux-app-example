import { toCamel } from "app/services/transform";

export const toClientFormat = (fields) => {
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

export const toTankClientFormat = (fields) => toCamel(fields)