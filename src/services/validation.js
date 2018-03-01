export const validateField = (value, rules) => {
  const field = { value, errors: [] };
  if (rules.notEmpty && !value) field['errors'].push({ message: 'Cannot be blank!' })
  return field;
}