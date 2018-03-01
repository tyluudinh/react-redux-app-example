import { validateField } from 'app/services/validation'; 

const rules = {
  type: {
    notEmpty: true,
  },
  reservationNumber: {
    notEmpty: true,
  },
  remarks: {},
  expiredDate: {
    notEmpty: true,
  },
  salespersonName: {
    notEmpty: true,
  },
  salespersonPhone: {
  },
  salespersonEmail: {
    notEmpty: true,
  },
  customerName: {
    notEmpty: true,
  },
  customerLocation: {
    notEmpty: true,
  },
  deliveryAddress: {
    notEmpty: true,
  },
  additionalDetails: {},
  warehouseLocation: {
    notEmpty: true,
  },
  tanks: {},
  status: {},
  id: {},
}

export default (data) => {
  const fields = {};
  let failed = false;
  for (let key in data) {
    if (rules[key]) {
      const validatedField = validateField(data[key], rules[key]);
      if (validatedField.errors.length) failed = true;
      fields[key] = validatedField;
    }
  }
  return { fields, failed };
}