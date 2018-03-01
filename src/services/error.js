import React from 'react';

import ErrorsDisplay from 'app/components/ErrorsDisplay/ErrorsDisplay';

const unknownError = [{ type: 'unknown' }];

export const getErrors = (errorObject) => {
  return (errorObject.response) ? ((errorObject.response.data) ? errorObject.response.data.errors : unknownError) : unknownError;
}

export const getFieldError = (fields, key) => {
  if (fields && fields[key] && fields[key].errors.length) {
    return (
      <ErrorsDisplay fieldError errors={fields[key].errors} />
    )
  }
  return null;
}

export const cleanFieldErrors = (fields) => {
  const result = {};
  for (let key in fields) {
    const field = {...fields[key]}
    field.errors = [];
    result[key] = field;
  }
  return result;
}
