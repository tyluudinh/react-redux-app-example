import { validateField } from 'app/services/validation'; 

const rules = {
  serialNumber: {
    notEmpty: true,
  },
  type: {
    notEmpty: true,
  },
  appliedRegulations: {
    notEmpty: true,
  },
  manufacturedDate: {
    notEmpty: true,
  },
  manufacturer: {
    notEmpty: true,
  },
  capacity: {
    notEmpty: true,
  },
  workingPressure: {
    notEmpty: true,
  },
  tareWeight: {
    notEmpty: true,
  },
  lastCarriedGas: {
    notEmpty: true,
  },
  airPressure: {
    notEmpty: true,
  },
  vacuumReading: {
    notEmpty: true,
  },
  location: {
    notEmpty: true,
  },
  warehouseLocation: {
    notEmpty: true,
  },
  loadMedium: {
    notEmpty: true,
  },
  nextMaintenanceDate: {
    notEmpty: true,
  },
  nextInspectionDate: {
    notEmpty: true,
  },
  status: {
    notEmpty: true,
  },
  taggedOrder: {},
  comment: {},
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