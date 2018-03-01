import { validateField } from 'app/services/validation'; 

import detailLogisticRules from './rules/detailLogisticRules';
import detailOtherRules from './rules/detailOtherRules';
import logisticRules from './rules/logisticRules';

export const validateDetail = (data) => {
  const fields = {};
  let failed = false;
  const rules = data['orderType'] === 'LOGISTICS' ? detailLogisticRules : detailOtherRules;
  for (let key in data) {
    if (rules[key]) {
      const validatedField = validateField(data[key], rules[key]);
      if (validatedField.errors.length) failed = true;
      fields[key] = validatedField;
    }
  }
  return { fields, failed };
}

export const validateLogistic = (data) => {
  const fields = {};
  let failed = false;
  for (let key in data) {
    if (logisticRules[key]) {
      const validatedField = validateField(data[key], logisticRules[key]);
      if (validatedField.errors.length) failed = true;
      fields[key] = validatedField;
    }
  }
  return { fields, failed };
}