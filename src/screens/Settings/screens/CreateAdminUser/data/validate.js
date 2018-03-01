import { validateField } from 'app/services/validation';
const rules = {
  staffName: {
    notEmpty: true
  },
  roleDesignation: {
    notEmpty: true
  },
  phone: {
    notEmpty: true
  },
  email: {
    notEmpty: true
  },
  message: {
    notEmpty: true
  }, 
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
  return {
    fields, failed
  }
}
