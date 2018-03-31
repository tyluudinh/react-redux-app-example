export const getErrors = (error) => {
  let err = error.message;
  if (error.response) {
    err = (error.response.data.error.message);
  }
  return err;
};


export const getFieldError = (fields, key) => {
  return null;
};

export const cleanFieldErrors = (fields) => {
  const result = {};
  for (let key in fields) {
    const field = {...fields[key]}
    field.errors = [];
    result[key] = field;
  }
  return result;
};
export function handleErrorResponse(error) {
  let err = error.message;
  if (error.response) {
    err = (error.response.data.message);
  }
  return err;
}

